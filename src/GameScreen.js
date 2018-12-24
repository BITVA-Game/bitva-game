import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/GameScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

import './dragging';

const images = {
    yaga,
    morevna,
};

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
    <div className="card card-like" draggable={props.draggable}>
        <div className="card-name">
            {props.card.name}
        </div>
    </div>
);

const Deck = props => (
    <div className="deck card-like">
        <div className="deck-name">
            deck
        </div>
    </div>
);

const Hand = props => (
  <div className="hand">
      {Object.values(props.hand).map((card, index) => (
          <div key={index} className="card-place card-like">
              <Card card={card} draggable={props.active} />
          </div>
      ))}
  </div>
)

const Grave = props => (
  <div className="grave card-like" id={props.active ? 'grave' : null}>
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
)

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null };
        this.player = props.player;
        this.current = this.player.health.current;

        this.width = 200;
        this.height = 200;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        this.sw = 6;
        this.r = this.cx - (this.sw / 2);
        const cl = 2 * Math.PI * this.r;

        const maximum = this.player.health.maximum;
        const angle = ((360 / maximum) * this.current) - 90;
        const long = angle + 90 > 180 ? 1 : 0;
        const x = this.cx + (this.r * Math.cos(((angle * Math.PI) - 1) / 180));
        const y = this.cy + (this.r * Math.sin(((angle * Math.PI) - 1) / 180));

        this.d = `M ${this.cx} ${this.sw / 2} A ${this.r} ${this.r} 0 ${long} 1 ${x} ${y}`;
        this.sda = `${(cl / maximum) - 1},1`;
        this.sdo = (cl / 360) * 90;
        this.style = {
            hero: {
                height: `${this.height}px`,
                width: `${this.width}px`,
            },
        };
    }

    render() {
        return (
            <div className={this.player.active ? 'player player-active' : 'player player-inactive'}>
                <div className="hero" style={this.style.hero} id={this.player.active ? 'hero' : 'enemy'}>
                    <img className="hero-image" src={images[this.player.hero]} alt={this.player.hero} style={this.style.hero} />
                    <svg className="hero-health" width={(this.cx) * 2} height={(this.cy) * 2}>
                        <circle cx={this.cx} cy={this.cy} r={this.r} stroke="black" strokeWidth={this.sw + 1} fill="transparent" />
                        <path className="hero-health-points" d={this.d} strokeWidth={this.sw} strokeDasharray={this.sda} strokeLinecap="butt" fill="transparent" />
                    </svg>
                    <div className="heart app-heart">
                        <div className="heart-text app-heart-text">
                            {this.current}
                        </div>
                    </div>
                </div>
                <Item active={this.player.active} item={this.state.item}/>
                <Deck deck={this.player.deck} />
                <Hand active={this.player.active} hand={this.player.hand}/>
                <Grave active={this.player.active} grave={this.player.grave}/>
            </div>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired,
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool.isRequired,
};

Deck.propTypes = {
    deck: PropTypes.object.isRequired,
};

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
};

GameScreen.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

export default GameScreen;
