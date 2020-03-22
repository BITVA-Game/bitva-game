/* eslint-disable no-plusplus */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';
import Card, { cardOrigin } from './Card';
import playSound from '../soundController';
import '../css/App.css';
import '../css/GameScreen.css';

function handClass(active, player) {
    let potion;
    // eslint-disable-next-line no-unused-expressions
    player.turningHand === true ? (potion = true) : null;
    if (potion && active === false) {
        return 'hand no-hand';
    }
    if (potion && active) {
        return 'hand hand-await';
    }
    return 'hand';
}

const CardContainer = ({
    index,
    player,
    inactivePlayer,
    cardId,
    active,
    card,
    background,
    animationDelay,
}) => {
    const { dragging, cardDropped } = useContext(BoardContext);


    return (
        <div className="card-container card-container-size card-place">
            <div key={index} className={`card-like card-holder deck-${background}`} />
            {cardId && card && (
                <div
                    className={`animated-card animated-card-${index} card-container-size card-animation-delay-${animationDelay}`}
                    style={cardOrigin(dragging, card)}
                >
                    <div className={`card-like card-back deck-${background}`} />
                    <Card
                        key={cardId}
                        active={active}
                        inactivePlayer={inactivePlayer}
                        cardKey={cardId}
                        card={card}
                        draggable={active}
                        player={player}
                        style={cardDropped ? cardOrigin(dragging, card) : null}
                    />
                </div>
            )}
        </div>
    );
};

const Hand = ({
    active, background, hand, inactivePlayer, player, gamePhase,
}) => {
    const handKeys = Object.keys(hand);

    // need key to hold the space for card container; animationDelay will change after card's shift
    const [cardContainers, setCardContainers] = useState({
        0: { cardId: handKeys[0], animationDelay: 4 },
        1: { cardId: handKeys[1], animationDelay: 3 },
        2: { cardId: handKeys[2], animationDelay: 2 },
        3: { cardId: handKeys[3], animationDelay: 1 },
        4: { cardId: handKeys[4], animationDelay: 0 },
    });

    useEffect(() => {
    // new object for state
        const updatedCardContainers = { ...cardContainers };

        // put cardIds from state to object to make it easier to compare with props
        const cardIdObjFromState = {};
        Object.keys(cardContainers).forEach((objKey) => {
            const cardId = cardContainers[objKey].cardId;
            cardIdObjFromState[cardId] = true;
        });

        // compare cardIds in props and cardIds in obj from state to find new cards in hand
        const newCardsInHand = handKeys.filter((el) => !cardIdObjFromState[el]);

        if (gamePhase === 'ACTIVE' && newCardsInHand.length > 0) {
            // eslint-disable-next-line no-unused-expressions
            playSound('card', newCardsInHand.length);
            // put new cards in new object
            let index = 0;
            Object.keys(cardContainers).forEach((el) => {
                if (!handKeys.includes(cardContainers[el].cardId)) {
                    updatedCardContainers[el].cardId = newCardsInHand[index];
                    updatedCardContainers[el].animationDelay = index;
                    index++;
                }
            });
            setCardContainers(updatedCardContainers);
        }
    }, [handKeys, cardContainers]);

    // we call useState hook in order to call sound only once for 1st cards deal
    const [firstSound, setFirstSound] = useState(true);
    // we call playSound in one hand only to avoid cards sound to be called twice
    useEffect(() => {
        if (firstSound === true && !active) {
            playSound('card', Object.keys(inactivePlayer.hand).length);
        }
        setFirstSound(false);
    }, [firstSound, active, inactivePlayer.hand]);

    return (
        <div className={`${handClass(active, player)}`}>
            {Object.keys(cardContainers).map((key) => (
                <CardContainer
                    key={key}
                    index={key}
                    player={player}
                    inactivePlayer={inactivePlayer}
                    cardId={cardContainers[key].cardId}
                    active={active}
                    card={hand[cardContainers[key].cardId]}
                    background={background}
                    animationDelay={cardContainers[key].animationDelay}
                />
            ))}
        </div>
    );
};

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    hand: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
    gamePhase: PropTypes.string.isRequired,
};

CardContainer.propTypes = {
    index: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
    cardId: PropTypes.string,
    active: PropTypes.bool.isRequired,
    card: PropTypes.object,
    background: PropTypes.string.isRequired,
    animationDelay: PropTypes.number.isRequired,
};

CardContainer.defaultProps = {
    card: undefined,
    cardId: undefined,
};

export default Hand;
