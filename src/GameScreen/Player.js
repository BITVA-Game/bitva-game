/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-duplicates */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Hero from './Hero';
import Card from './Card';
import Item from './Item';
import Hand from './Hand';
import Grave from './Grave';
import '../css/App.css';
import '../css/GameScreen.css';
import bat from '../images/cards/batCard.png';
import usePrevious from './usePrevious';

const { animation: animationConst } = require('../constants');

const AnimatedHand = ({ inactivePlayer, hand }) => (
    <div className="hand card-hand">
        {Object.keys(hand).map((cardId) => (
            <div key={cardId} className="card-place card-like">
                <Card cardKey={cardId} card={hand[cardId]} player={inactivePlayer} />
            </div>
        ))}
    </div>
);

// Clairvoyance showed 3 1st cards from deck -from backend
// this function create them to appear with 3 different
// classNames for each to create different animation
function Clairvoyance({ player }) {
    const findPosition = (index, length) => {
        if (index === 2) {
            return 'upper';
        }
        if (index === 1) {
            return 'middle';
        }
        if (index === 0 && length > 1) {
            return 'bottom';
        }
        if (index === 0 && length === 1) {
            return 'bottom-static';
        }
    };

    return (
        <div>
            {Object.keys(player.cardsShown).map((cardId, index) => (
                <div
                    key={cardId}
                    className={`card-place card-like clairvoyance ${findPosition(index, Object.keys(player.cardsShown).length)}`}
                >
                    <Card
                        cardKey={cardId}
                        card={player.cardsShown[cardId]}
                        player={player}
                    />
                </div>
            ))}
        </div>
    );
}

// bat card image for malachite box card
// once in item holder, malachite box generates bat card
// that attacks opponent with any other player action
const BatCard = () => (
    <div className="item-attacks">
        <img className="bat-img" src={bat} alt="bat card" />
    </div>
);

const Player = (props) => {
    const [animation, setAnimation] = useState(null);
    const prevDeal = usePrevious(props.player.deal);
    const prevTurningHand = usePrevious(props.player.turningHand);
    const playerClass = props.active ? 'player-active' : 'player-inactive';
    const playerPosition = props.active ? 'player player-bottom' : 'player player-top';
    const playAnimation = (animName) => {
        setAnimation(animName);
        setTimeout(() => setAnimation(null), 2000);
    };

    // animation for cards deal from gravyeard to deck
    useEffect(() => {
        if (prevDeal !== undefined && props.player.deal !== prevDeal) {
            playAnimation(animationConst.CARDS);
        }
    }, [props.player.deal, playAnimation, prevDeal]);

    // animation for Turning Potion - active player gets cards from inactive player hand
    useEffect(() => {
        if (props.player.turningHand !== prevTurningHand && props.player.turningHand === true) {
            playAnimation(animationConst.POTION);
        }
    }, [props.player.turningHand, playAnimation, prevTurningHand]);

    return (
        <div className={`${playerPosition} ${playerClass}`}>
            <Hero
                player={props.player}
                active={props.active}
                gamePhase={props.gamePhase}
            />
            <Item
                item={Object.values(props.player.item)[0]}
                player={props.player}
                active={props.active}
            />
            {animation === animationConst.BAT ? <BatCard /> : null}
            <Deck
                active={props.active}
                cards={props.player.cards}
                background={props.player.background}
            />
            {props.player.cardsShown ? (
                <Clairvoyance player={props.player} active={props.active} />
            ) : null}
            <Hand
                active={props.active}
                inactivePlayer={props.inactivePlayer}
                background={props.player.background}
                hand={props.hand}
                player={props.player}
            />
            {animation === animationConst.POTION && props.active ? (
                <AnimatedHand
                    inactivePlayer={props.inactivePlayer}
                    hand={props.inactivePlayer.hand}
                />
            ) : null}
            <Grave
                player={props.player}
                active={props.active}
                grave={props.player.grave}
                background={props.player.background}
                animation={animation}
            />
        </div>
    );
};

const Deck = (props) => (
    <div className={`deck card-like deck-${props.background}`}>
        <div className="count">
            {props.active
                ? Object.keys(props.cards).length
                : Object.keys(props.cards).length}
        </div>
    </div>
);

Deck.propTypes = {
    cards: PropTypes.object.isRequired,
    background: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
};

Player.propTypes = {
    player: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
    hand: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    gamePhase: PropTypes.string.isRequired,
};

Hand.propTypes = {
    hand: PropTypes.object.isRequired,
    gamePhase: PropTypes.string,
};

Hand.defaultProps = {
    gamePhase: undefined,
};

AnimatedHand.propTypes = {
    hand: PropTypes.object.isRequired,
    inactivePlayer: PropTypes.object.isRequired,
};

Clairvoyance.propTypes = {
    player: PropTypes.object.isRequired,
};

export default Player;
