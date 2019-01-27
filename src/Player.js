/* eslint-disable import/no-duplicates */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import './css/App.css';
import './css/GameScreen.css';

import apple from './images/cards/apple.png';
import bajun from './images/cards/bajun.png';
import sivka from './images/cards/sivka.png';
import bereginya from './images/cards/bitva-cardbase.jpg';
import bogatyr from './images/cards/bitva-cardbase.jpg';
import shieldLarge from './images/cards/bitva-cardbase.jpg';
import shieldSmall from './images/cards/bitva-cardbase.jpg';
import wolf from './images/cards/bitva-cardbase.jpg';
import cardPlace from './images/cards/cardPlace.png';

const imagesCards = {
    apple,
    bajun,
    sivka,
    bereginya,
    bogatyr,
    shieldLarge,
    shieldSmall,
    wolf,
    cardPlace,
};

class Player extends Component {
    constructor(props) {
        super(props);
        this.cardOver = this.cardOver.bind(this);
        this.isTarget = this.isTarget.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
    }

    isTarget(target) {
        if (!this.props.dragging) {
          return false;
        }
        const card = this.props.dragging.card;
        if (!this.props.player.active) {
          return (
            // Add condition for items later
            (target === 'opponent' && card.category === 'attack')
          );
        }
        return (
            (target === 'hero' && card.category === 'heal') ||
            (target === 'item' && card.type === 'item') ||
            (target === 'graveyard')
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
        const card = this.props.dragging.card;
        this.props.cardDropped(target, card);
    }


    render() {
        //console.log("Player", this.props.player);
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
                    active={this.props.player.active}
                    item={Object.values(this.props.player.item)[0]}
                    type={this.props.type}
                    isTarget={this.isTarget}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                />
                <Deck deck={this.props.player.deck} />
                <Hand
                    active={this.props.player.active}
                    hand={this.props.player.hand}
                    cardDragStarted={this.props.cardDragStarted}
                    cardDragEnded={this.props.cardDragEnded}
                    isTarget={this.isTarget}
                />
                <Grave
                    player={this.props.player}
                    active={this.props.player.active}
                    grave={this.props.player.grave}
                    isTarget={this.isTarget}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                />
            </div>
        );
    }
}

const Deck = props => (
    <div className="deck card-like">
        <div className="deck-name" props={props}>
            deck
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
                />
            </div>
        ))}
    </div>
);

const Grave = props => (
    <div  className={`grave card-like ${props.isTarget('graveyard') ? 'target' : null}`}
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
      className={`item card-place card-like ${props.isTarget('item') ? 'target' : null}`}
      id={props.active ? 'item' : null}
      onDrop={() => props.cardDropped('item', props.item)}
      onDragOver={e => props.cardOver(e, 'item')}
    >
        {props.item ? <Card card={props.item} /> : null}
    </div>
);

const Card = props => (
    <div
        className="card card-like"
        style={{ backgroundImage: `url(${imagesCards[props.card.id]})`, backgroundSize: '100% 100%' }}
        data-key={props.cardKey}
        draggable={props.draggable}
        onDragStart={() => props.cardDragStarted(props.cardKey, props.card)}
        onDragEnd={props.cardDragEnded}
    >
        <div className="card-name">
            {props.card.name}
            {/* <p>{props.cardKey}</p> */}
        </div>
        <div className={`game-icon game-icon-text ${props.card.category === 'heal' ? 'icon-heal' : null} ${props.card.category === 'attack' ? 'icon-attack' : null} ${props.card.category === 'shield' ? 'icon-shield' : null}`}>
            <p>{props.card.points}</p>
        </div>
    </div>
);

Player.propTypes = {
    player: PropTypes.object.isRequired,
    cardDragStarted: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
    cardDragStarted: PropTypes.func.isRequired,
    cardDragEnded: PropTypes.func.isRequired,
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool.isRequired,
    cardKey: PropTypes.string.isRequired,
    cardDragStarted: PropTypes.func.isRequired,
    cardDragEnded: PropTypes.func.isRequired,
};

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    target: PropTypes.bool.isRequired,
    cardDropped: PropTypes.func.isRequired,
    cardOver: PropTypes.func.isRequired,
};

Item.propTypes = {
    item: PropTypes.string,
    active: PropTypes.bool.isRequired,
};

Item.defaultProps = {
    item: null,
};


export default Player;
