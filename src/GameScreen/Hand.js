import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
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

// function cardAnimClass(dealAnim, index, player) {
//     if (!dealAnim && Object.keys(player.cards).length === 10 && player.deal === 0) {
//         return `animated-card-${index}`;
//     } if (dealAnim) {
//         console.log(`animated-card-${index}`);
//         return `animated-card-${index}`;
//     }
//     return null;
// }

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const useCardAnimClass = (index, player, inactivePlayer, cardId) => {
    const [dealAnim, setDealAnim] = useState(cardId);
    const idInactiveP = inactivePlayer.id;
    const prevData = usePrevious({ cardId, idInactiveP });
    useEffect(() => {
        if ((inactivePlayer.id !== prevData.idInactiveP && !this.props.active)
            || (Object.keys(player.cards).length === 10 && player.deal === 0)) {
            console.log('we call cardsDeal anim for ', this.props.inactivePlayer.hero);
            setDealAnim(true);
            const inactivePHandKeys = Object.keys(inactivePlayer.hand);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < inactivePHandKeys.length; i++) {
                console.log(inactivePHandKeys);
                const newIndex = inactivePHandKeys.indexOf(inactivePHandKeys[i]);
                // if (Object.keys(inactivePlayer.hand)[i] !== Object.keys(prevProps.activePlayer.hand)[i]) {
                if (dealAnim === true && cardId !== prevData.cardId
                    && index === newIndex) {
                    console.log(inactivePHandKeys[i], 'we animate cards deal for card index ', index);
                    setDealAnim(false);
                    return index;
                }
            }
        }
        return `animated-card-${index}`;
    }, [cardId, idInactiveP]);
};

const Hand = (props) => (
    <div className={`${handClass(props.active, props.player)}`}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {/* {Array(5).fill().map((c, index) => <div key={index} className={`card-like card-back deck-${props.background}`} />)} */}
        {Object.keys(props.hand).map((cardId, index) => (
            <div className={`${useCardAnimClass(index, props.player, props.inactivePlayer, cardId)}`}>
                {(props.dealAnim
                || (!props.dealAnim && Object.keys(props.player.cards).length === 10))
                && (<div className={`card-like card-back deck-${props.background}`} />)}
                <Card
                    key={cardId}
                    active={props.active}
                    inactivePlayer={props.inactivePlayer}
                    cardKey={cardId}
                    card={props.hand[cardId]}
                    draggable={props.active}
                    player={props.player}
                />
            </div>
        ))}
    </div>
);

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    dealAnim: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
};


export default Hand;
