import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import './css/App.css';
import './css/GameScreen.css';

//import './dragging';


// game table
const GameScreen = (props) => {
    props.app.game.players.sort((a, b) => {
        const x = a.active;
        const y = b.active;
        return x < y ? -1 : 1;
    });
    return (
        <div className="game-table app-background">
            {props.app.game.players.map(player => (
                <Player key={player.hero} player={player} />
            ))}
        </div>
    );
};

const Card = props => (
    <div className="card card-like" draggable={props.draggable} onDragStart={props.cardDragStarted}>
        <div className="card-name">
            {props.card.name}
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
                <Card card={props.hand[cardId]} draggable={props.active} cardDragStarted={props.cardDragStarted}/>
            </div>
        ))}
    </div>
);

const Grave = props => (
    <div className="grave card-like" id={props.active ? 'grave' : null} onDrop={props.cardDropped} onDragOver={props.cardOver}>
        <div className="grave-name">
          grave
        </div>
        <div className="count">
            {props.active ? Object.keys(props.grave).length : null}
        </div>
    </div>
);

const Item = props => (
    <div className="item card-place card-like" id={props.active ? 'item' : null}>
        {props.item ? <Card card={props.item} /> : null}
    </div>
);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null, dragging: null};
        this.player = props.player;

        this.cardDragStarted = this.cardDragStarted.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.cardOver = this.cardOver.bind(this);
    }

    cardDragStarted(event) {
      console.log("cardDragStarted");
      console.log(event.target);
      this.state.dragging = event.target;
   }

   cardOver(event){
     event.preventDefault();
     console.log("CardOver");
   }

   cardDropped(event) {
     console.log("CardDropped");
     console.log(event.target);
   }


    render() {
        return (
            <div className={this.player.active ? 'player player-active' : 'player player-inactive'}>
                <Hero player={this.player} />
                <Item active={this.player.active} item={this.state.item} />
                <Deck deck={this.player.deck} />
                <Hand active={this.player.active} hand={this.player.hand} cardDragStarted={this.cardDragStarted}/>
                <Grave active={this.player.active} grave={this.player.grave} cardDropped={this.cardDropped} cardOver={this.cardOver}/>
            </div>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired,
};

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool.isRequired,
};

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
};

Item.propTypes = {
    item: PropTypes.object,
    active: PropTypes.bool.isRequired,
};

Item.defaultProps = {
    item: null,
};

GameScreen.propTypes = {
    app: PropTypes.object.isRequired,
};

export default GameScreen;
