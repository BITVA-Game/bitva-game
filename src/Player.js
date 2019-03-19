/* eslint-disable import/no-duplicates */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import rules from './rules';
import './css/App.css';
import './css/GameScreen.css';

import apple from './images/cards/apple.jpg';
import bajun from './images/cards/catbajun.jpg';
import sivka from './images/cards/warhorse.jpg';
import bereginya from './images/cards/bitva-cardbase.jpg';
import bogatyr from './images/cards/bitva-cardbase.jpg';
import shieldLarge from './images/cards/largeshield.jpg';
import shieldSmall from './images/cards/smallshield.jpg';
import wolf from './images/cards/bitva-cardbase.jpg';
import waterDead from './images/cards/deadwater.jpg';
import waterLiving from './images/cards/livingwater.jpg';

const imagesCards = {
    apple,
    bajun,
    sivka,
    bereginya,
    bogatyr,
    shieldLarge,
    shieldSmall,
    wolf,
    waterDead,
    waterLiving,
};

class Player extends Component {
    constructor(props) {
        super(props);
        this.cardOver = this.cardOver.bind(this);
        this.isTarget = this.isTarget.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
    }

    isTarget(target) {
        return rules(
            target,
            this.props.dragging,
            this.props.player.active,
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
    </div>
);

const Item = props => (
    <div
        className={`item card-place card-like ${props.player.background} ${props.isTarget('item') ? 'target' : null}`}
        id={props.player.active ? 'item' : null}
        onDrop={() => props.cardDropped('item', Object.keys(props.player.item))}
        onDragOver={e => props.cardOver(e, 'item')}
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
        className={`card card-like ${props.card.type === 'item' ? `${props.player.background}-item` : `${props.player.background}-action`}`}
        data-key={props.cardKey}
        draggable={props.draggable}
        onDragStart={() => props.cardDragStarted(props.cardKey, props.card)}
        onDragEnd={props.cardDragEnded}
    >
        <div className="card-header">
            <p className="card-category">{props.card.category}</p>
            <div className={`game-icon game-icon-text
                ${props.card.category === 'attack' ? 'icon-attack' : null}
                ${props.card.category === 'damage' ? 'icon-damage' : null}
                ${props.card.category === 'heal' ? 'icon-heal' : null}
                ${props.card.category === 'shield' ? 'icon-shield' : null}`}
            >
                {props.card.points}
            </div>
        </div>
        <div className="card-image" style={{ backgroundImage: `url(${imagesCards[props.card.id]})`, backgroundSize: '100% 100%' }} />
        <div className="card-name">
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


export default Player;
