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

const GameScreen = props => (
    <div className="game-table app-background">
        {props.app.game.players.map(player => (
            <Player
                key={player.hero}
                position={player.position}
                player={player}
                sendMessage={props.sendMessage}
            />
        ))}
    </div>
);

const Card = props => (
    <div
        className="card card-like"
        style={{ backgroundImage: `url(${imagesCards[props.card.id]})`, backgroundSize: '100% 100%' }}
        data-key={props.cardKey}
        draggable={props.draggable}
        onDragStart={props.cardDragStarted}
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
    <div className={`grave card-like ${props.target ? 'target' : null}`} id={props.active ? 'grave' : null} onDrop={props.cardDropped} onDragOver={props.cardOver}>
        <div className="grave-name">
          grave
        </div>
        <div className="count">
            {props.active ? Object.keys(props.grave).length : Object.keys(props.grave).length}
        </div>
    </div>
);

const Item = props => console.log(props.item) || (
    <div className={`item card-place card-like ${props.isItem ? 'target' : null}`} id={props.active ? 'item' : null} onDrop={props.cardDropped} onDragOver={props.cardOver}>
        {props.item ? <Card card={props.item} /> : null}
    </div>
);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null, dragging: null, type: null };
        this.cardDragStarted = this.cardDragStarted.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.cardOver = this.cardOver.bind(this);
        this.isActiveCard = this.isActiveCard.bind(this);
        this.cardDragEnded = this.cardDragEnded.bind(this);
    }

    isActiveCard() {
        return !!(this.props.player.active && this.state.dragging);
    }

    isItemTarget() {
        return !!(this.isActiveCard() && this.state.type === 'item');
    }

    cardDragEnded(event) {
        this.setState({
            dragging: null,
        });
    }

    cardDragStarted(event) {
    const keyCard = event.target.dataset.key;        
        console.log(this.props.player.hand[keyCard].type);
        this.setState({
            dragging: event.target.dataset.key,
            item: null,
            type: this.props.player.hand[keyCard].type,
        });
    }

    cardOver(event) {
        if (!this.isActiveCard()) {
            return;
        }
        event.preventDefault();
    }

    cardDropped(event) {
        console.log('Sending message');
        if (this.isItemTarget()) {
            this.setState({
                item: this.props.player.hand[this.state.dragging],
            });
            console.log(this.props.player.hand[this.state.dragging]);
            this.props.sendMessage({ type: 'ACTION', activeCard: this.state.dragging, target: 'item' });
        }
        if (!this.isItemTarget()) {
            this.props.sendMessage({ type: 'ACTION', activeCard: this.state.dragging, target: 'graveyard' });
        }
        this.setState({
            dragging: null,
        });
    }


    render() {
        const playerClass = this.props.player.active ? 'player-active' : 'player-inactive';
        const playerPosition = this.props.player.position === 'bottom' ? 'player player-bottom' : 'player player-top';
        return (
            <div className={`${playerPosition} ${playerClass}`}>
                <Hero player={this.props.player} />
                <Item
                    active={this.props.player.active}
                    item={this.state.item}
                    type={this.state.type}
                    isItem={this.isItemTarget()}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                />
                <Deck deck={this.props.player.deck} />
                <Hand
                    active={this.props.player.active}
                    hand={this.props.player.hand}
                    cardDragStarted={this.cardDragStarted}
                    cardDragEnded={this.cardDragEnded}
                />
                <Grave
                    active={this.props.player.active}
                    grave={this.props.player.grave}
                    target={this.isActiveCard()}
                    cardDropped={this.cardDropped}
                    cardOver={this.cardOver}
                />
            </div>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired,
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

GameScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default GameScreen;
