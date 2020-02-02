/* eslint-disable no-plusplus */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';
import Card, { cardOrigin } from './Card';
import '../css/App.css';
import '../css/GameScreen.css';

function handClass(active, player) {
    let potion;
    // eslint-disable-next-line no-unused-expressions
    player.turningHand === true ? potion = true : null;
    if (potion && active === false) {
        return 'hand no-hand';
    }
    if (potion && active) {
        return 'hand hand-await';
    }
    return 'hand';
}

const CardContainer = ({
    index, player, inactivePlayer, cardId, active, card, background,
}) => {
    const { dragging } = useContext(BoardContext);
    return (
        <div className="card-container card-like card-place">
            <div key={index} className={`card-like card-holder deck-${background}`} />
            { cardId && card && (
                <div
                    className={`animated-card-${index}`}
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
                    />
                </div>
            )}
        </div>
    );
};

const Hand = ({
    active, background, hand, inactivePlayer, player,
}) => {
    const handKeys = Object.keys(hand);
    const [cardContainers, setCardContainers] = useState({
        0: handKeys[0],
        1: handKeys[1],
        2: handKeys[2],
        3: handKeys[3],
        4: handKeys[4],
    });

    useEffect(() => {
        // new object for state
        const updatedCardContainers = { ...cardContainers };

        // compare props and state to find new cards in hand
        // eslint-disable-next-line max-len
        const newCardsInHand = handKeys.filter((el) => (!Object.values(cardContainers).includes(el)));

        if (newCardsInHand.length > 0) {
            // put new cards in new object
            let index = 0;
            Object.keys(cardContainers).forEach((el) => {
                if (!handKeys.includes(cardContainers[el])) {
                    updatedCardContainers[el] = newCardsInHand[index];
                    index++;
                }
            });
            setCardContainers(updatedCardContainers);
        }
    }, [handKeys]);

    return (
        <div className={`${handClass(active, player)}`}>
            {Object.keys(cardContainers).map((key) => (
                <CardContainer
                    key={key}
                    index={key}
                    player={player}
                    inactivePlayer={inactivePlayer}
                    cardId={cardContainers[key]}
                    active={active}
                    card={hand[cardContainers[key]]}
                    background={background}
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
};

CardContainer.propTypes = {
    index: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
    cardId: PropTypes.string,
    active: PropTypes.bool.isRequired,
    card: PropTypes.object,
    background: PropTypes.string.isRequired,
};

CardContainer.defaultProps = {
    card: undefined,
    cardId: undefined,
};

export default Hand;
