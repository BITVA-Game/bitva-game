import React, { useState, useEffect } from 'react';
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

function cardAnimClass(index, player, cardId) {
    const [dealAnim, setDealAnim] = useState(cardId);
    
    useEffect(() => {
        if ((this.props.activePlayer.id !== prevProps.activePlayer.id && !this.props.active)
            || Object.keys(player.cards).length === 10 && player.deal === 0) {
            console.log('we call cardsDeal anim for ', this.props.inactivePlayer.hero);
            setDealAnim(true);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < Object.keys(this.props.inactivePlayer.hand).length; i++) {
                console.log(Object.keys(this.props.inactivePlayer.hand));
                if (Object.keys(this.props.inactivePlayer.hand)[i] !== Object.keys(prevProps.activePlayer.hand)[i]) {
                    const index = Object.keys(this.props.inactivePlayer.hand).indexOf(Object.keys(this.props.inactivePlayer.hand)[i]);
                    console.log(Object.keys(this.props.inactivePlayer.hand)[i], 'we animate cards deal for card index ', index);
                    
                    return index;
                }
            }
        }
        return `animated-card-${index}`;

    }, [cardId]);
        
    
}

const Hand = (props) => (
    <div className={`${handClass(props.active, props.player)}`}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {/* {Array(5).fill().map((c, index) => <div key={index} className={`card-like card-back deck-${props.background}`} />)} */}
        {Object.keys(props.hand).map((cardId, index) => (
            <div className={`${cardAnimClass(index, props.player, cardId)}`}>
                {(props.dealAnim
                || (!props.dealAnim && Object.keys(props.player.cards).length === 10))
                && (<div className={`card-like card-back deck-${props.background}`} />)}
                <Card
                    key={cardId}
                    active={props.active}
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
};


export default Hand;
