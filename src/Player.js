/* eslint-disable import/no-duplicates */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import rules from './rules';
import './css/App.css';
import './css/GameScreen.css';
import './css/Cards.css';

import apple from './images/cards/apple.jpg';
import bajun from './images/cards/catbajun.jpg';
import bat from './images/cards/bat.jpg';
import bereginya from './images/cards/bitva-cardbase.jpg';
import bogatyr from './images/cards/bitva-cardbase.jpg';
import bulat from './images/cards/sword.jpg';
import chemise from './images/cards/bitva-cardbase.jpg';
import chickenLegsHut from './images/cards/bitva-cardbase.jpg';
import crown from './images/cards/bitva-cardbase.jpg';
import dolly from './images/cards/bitva-cardbase.jpg';
import earthquake from './images/cards/bitva-cardbase.jpg';
import gusiLebedi from './images/cards/bitva-cardbase.jpg';
import horsemanBlack from './images/cards/bitva-cardbase.jpg';
import horsemanRed from './images/cards/bitva-cardbase.jpg';
import horsemanWhite from './images/cards/bitva-cardbase.jpg';
import kikkmora from './images/cards/bitva-cardbase.jpg';
import lizard from './images/cards/lizard.jpg';
import malachiteBox from './images/cards/malachitebox.jpg';
import mortar from './images/cards/bitva-cardbase.jpg';
import mushrooms from './images/cards/mushrooms.jpg';
import russianOven from './images/cards/bitva-cardbase.jpg';
import shieldLarge from './images/cards/largeshield.jpg';
import shieldSmall from './images/cards/smallshield.jpg';
import sivka from './images/cards/warhorse.jpg';
import skullLantern from './images/cards/bitva-cardbase.jpg';
import turningPotion from './images/cards/potion.jpg';
import warhorse from './images/cards/warhorse.jpg';
import waterDead from './images/cards/deadwater.jpg';
import waterLiving from './images/cards/livingwater.jpg';
import wolf from './images/cards/bitva-cardbase.jpg';

const imagesCards = {
    apple,
    bajun,
    bat,
    bereginya,
    bogatyr,
    bulat,
    chemise,
    chickenLegsHut,
    crown,
    dolly,
    earthquake,
    gusiLebedi,
    horsemanBlack,
    horsemanRed,
    horsemanWhite,
    kikkmora,
    lizard,
    malachiteBox,
    mortar,
    mushrooms,
    russianOven,
    shieldLarge,
    shieldSmall,
    sivka,
    skullLantern,
    turningPotion,
    warhorse,
    waterDead,
    waterLiving,
    wolf,
};

const Animation = props => (
    <div className="stack">
        <div className={`deck card-like deck-${props.background} one`} />
        <div className={`deck card-like deck-${props.background} two`} />
        <div className={`deck card-like deck-${props.background} three`} />
    </div>
);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null,
        };
        this.cardOver = this.cardOver.bind(this);
        this.isTarget = this.isTarget.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
    }

    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
        if (this.props.player.deal !== prevProps.player.deal) {
            this.playAnimation();
        }
    }

    playAnimation() {
        this.setState({ animation: 'cards' });
        setTimeout(
            () => this.setState({ animation: null }),
            2000,
        );
    }

    isTarget(target) {
        return rules(
            target,
            this.props.dragging,
            this.props.player.active,
            this.props.player,
        );
    }

    cardOver(event, target) {
        if (!this.isTarget(target)) {
            return;
        }
        event.preventDefault();
    }

    cardDropped(target) {
        if (!this.isTarget(target)) {
            return;
        }
        this.props.cardDropped(target);
    }


    render() {
        const playerClass = this.props.player.active ? 'player-active' : 'player-inactive';
        const playerPosition = this.props.player.position === 'bottom' ? 'player player-bottom' : 'player player-top';
        return (
            <div className={`${playerPosition} ${playerClass}`}>
                <Hero
                    player={this.props.player}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                    isTarget={this.isTarget}
                />
                <Item
                    item={Object.values(this.props.player.item)[0]}
                    isTarget={this.isTarget}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                    player={this.props.player}
                    cardDragStarted={this.props.cardDragStarted}
                    cardDragEnded={this.props.cardDragEnded}
                />
                <Deck
                    active={this.props.player.active}
                    cards={this.props.player.cards}
                    background={this.props.player.background}
                />
                <Hand
                    active={this.props.player.active}
                    hand={this.props.player.hand}
                    cardDragStarted={this.props.cardDragStarted}
                    cardDragEnded={this.props.cardDragEnded}
                    isTarget={this.isTarget}
                    player={this.props.player}
                />
                <Grave
                    player={this.props.player}
                    active={this.props.player.active}
                    grave={this.props.player.grave}
                    isTarget={this.isTarget}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                    background={this.props.player.background}
                    animation={this.state.animation}
                />
            </div>

        );
    }
}

const Deck = props => (
    <div className={`deck card-like deck-${props.background}`}>
        <div className="count">
            {props.active ? Object.keys(props.cards).length : Object.keys(props.cards).length}
        </div>
    </div>
);

const Hand = props => (
    <div className="hand">
        {Object.keys(props.hand).map(cardId => (
            <div key={cardId} className="card-place card-like">
                <Card
                    cardKey={cardId}
                    card={props.hand[cardId]}
                    draggable={props.active}
                    cardDragStarted={props.cardDragStarted}
                    cardDragEnded={props.cardDragEnded}
                    player={props.player}
                />
            </div>
        ))}
    </div>
);

const Grave = props => (
    <div
        className={`grave card-like grave-${props.background} ${props.isTarget('graveyard') ? 'target' : null}`}
        id={props.active ? 'grave' : null}
        onDrop={() => props.cardDropped('graveyard')}
        onDragOver={e => props.cardOver(e, 'graveyard')}
    >
        <div className="grave-name">
          grave
        </div>
        <div className="count">
            {props.active ? Object.keys(props.grave).length : Object.keys(props.grave).length}
        </div>
        {props.animation === 'cards' ? <Animation background={props.background} /> : null}
    </div>
);

const Item = props => (
    <div
        className={`item card-place card-like
            ${props.player.background}
            ${props.isTarget('item') ? 'target' : null}
            ${props.isTarget('itemOpponent') && props.item ? 'target' : null}
        `}
        id={props.player.active ? 'item' : null}

        onDrop={
            // eslint-disable-next-line no-nested-ternary
            props.player.active
                ? () => props.cardDropped('item', Object.keys(props.player.item))
                : props.item ? () => props.cardDropped('itemOpponent') : null
        }
        onDragOver={
            // eslint-disable-next-line no-nested-ternary
            props.player.active
                ? e => props.cardOver(e, 'item')
                : props.item ? e => props.cardOver(e, 'itemOpponent') : null
        }
    >
        {props.item
            ? (
                <Card
                    card={props.item}
                    player={props.player}
                    cardKey={Object.keys(props.player.item)[0]}
                    draggable={props.player.active}
                    cardDragStarted={props.cardDragStarted}
                    cardDragEnded={props.cardDragEnded}
                />
            ) : null}
    </div>
);

const Card = props => (
    <div
        className={`card game-card card-like ${props.card.type === 'item' ? `${props.player.background}-item` : `${props.player.background}-action`}`}
        data-key={props.cardKey}
        draggable={props.draggable}
        onDragStart={() => props.cardDragStarted(props.cardKey, props.card)}
        onDragEnd={props.cardDragEnded}
    >
        <div className="card-header">
            <div className={`card-icon-container game-card-icon-container ${props.card.type === 'item' ? `${props.player.background}-item` : `${props.player.background}-action`}`}>
                <div className={`card-icon game-card-icon
                    ${props.card.category === 'attack' ? 'icon-attack' : null}
                    ${props.card.category === 'attackItems' ? 'icon-damage' : null}
                    ${props.card.category === 'damage' ? 'icon-damage' : null}
                    ${props.card.category === 'generator' ? 'icon-move' : null}               
                    ${props.card.category === 'heal' && props.card.type === 'action' ? 'icon-heal' : null}
                    ${props.card.category === 'heal' && props.card.type === 'item' ? 'icon-heart' : null}
                    ${props.card.category === 'holdCard' ? 'icon-hold' : null}
                    ${props.card.category === 'holdTurn' ? 'icon-hold' : null}
                    ${props.card.category === 'panic' ? 'icon-arrows' : null}
                    ${props.card.category === 'reflect' ? 'icon-reflect' : null}
                    ${props.card.category === 'shield' ? 'icon-shield' : null}
                    ${props.card.category === 'showCards' ? 'icon-show' : null}
                    ${props.card.category === 'shuffling' ? 'icon-move' : null}
                    ${props.card.category === 'supress' ? 'icon-damage' : null}
                    ${props.card.category === 'turning' ? 'icon-arrows' : null}`}
                />
            </div>
            <p className="card-category game-card-category">{props.card.categoryName}</p>
            {props.card.initialpoints
                ? (
                    <div className={`card-points game-card-points
                        ${props.card.type === 'item' ? `${props.player.background}-item` : `${props.player.background}-action`}`}
                    >
                        {props.card.points}
                    </div>
                ) : null
            }
            {props.card.health
                ? (
                    <div className={`card-health game-card-health
                        ${props.card.type === 'item' ? `${props.player.background}-item` : `${props.player.background}-action`}`}
                    >
                        {props.card.healthCurrent}
                    </div>
                ) : null
            }
        </div>
        <div className="game-card-image" style={{ backgroundImage: `url(${imagesCards[props.card.id]})`, backgroundSize: '100% 100%' }} />
        <div className="card-footer game-card-footer">
            <p>{props.card.name}</p>
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
    cardDragStarted: PropTypes.func.isRequired,
    cardDragEnded: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
    dragging: PropTypes.object,
};

Player.defaultProps = {
    dragging: null,
};

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
    cardDragEnded: PropTypes.func.isRequired,
    cardDragStarted: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool,
    cardKey: PropTypes.string,
    cardDragStarted: PropTypes.func,
    cardDragEnded: PropTypes.func,
    player: PropTypes.object.isRequired,
};

Card.defaultProps = {
    draggable: null,
    cardKey: null,
    cardDragStarted: null,
    cardDragEnded: null,
};

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    isTarget: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
    cardOver: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
    animation: PropTypes.string,
};

Grave.defaultProps = {
    animation: null,
};

Item.propTypes = {
    player: PropTypes.object.isRequired,
    item: PropTypes.object,
    isTarget: PropTypes.func.isRequired,
    cardDragStarted: PropTypes.func,
    cardDragEnded: PropTypes.func,
    cardOver: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
};

Item.defaultProps = {
    item: null,
    cardDragStarted: null,
    cardDragEnded: null,
};

Animation.propTypes = {
    background: PropTypes.string.isRequired,
};


export default Player;
