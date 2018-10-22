import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/GameScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

import dragging from './dragging';

const images = {
    yaga,
    morevna,
};

// game table
const GameTable = (props) => {
    props.app.game.players.sort((a, b) => {
        const x = a.active;
        const y = b.active;
        return x < y ? -1 : 1;
    });
    return (
        <div className="game-table app-background">
            {props.app.game.players.map(player => (
                <Player player={player} />
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

const Grave = props => (
    <div className="grave card-like">
        <div className="grave-name">
            grave
        </div>
    </div>
);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null };

        this.width = 200;
        this.height = 200;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        this.sw = 6;
        this.r = this.cx - this.sw / 2;
        const cl = 2 * Math.PI * this.r;

        this.player = props.player;
        this.current = 7; // this.player.health.current;
        const maximum = this.player.health; // this.player.health.maximum
        const angle = (360 / maximum * this.current) - 90;
        const long = angle + 90 > 180 ? 1 : 0;
        const x = this.cx + (this.r * Math.cos(angle * Math.PI / 180));
        const y = this.cy + (this.r * Math.sin(angle * Math.PI / 180));

        this.d = `M ${this.cx} ${this.sw / 2} A ${this.r} ${this.r} 0 ${long} 1 ${x} ${y}`;
        this.sda = `${cl / maximum - 1},1`;
        this.sdo = cl / 360 * 90;
        this.style = {
            hero: {
                height: `${this.height}px`,
                width: `${this.width}px`,
            },
        };
    }

    componentDidMount() {
        if (this.player.active) {
            const script = document.createElement('script');
            script.async = true;
            script.src = dragging;
            script.type = 'text/javascript';
            document.body.appendChild(script);
        }
    }

    render() {
        return (
            <div className={this.player.active ? 'player player-active' : 'player player-inactive'}>
                <div className="hero" style={this.style.hero}>
                    <img className="hero-image" src={images[this.player.hero]} alt={this.player.hero} style={this.style.hero} />
                    <svg className="hero-health" width={(this.cx) * 2} height={(this.cy) * 2}>
                        <circle cx={this.cx} cy={this.cy} r={this.r} stroke="black" strokeWidth={this.sw + 1} fill="transparent" />
                        {/* <circle cx={this.cx} cy={this.cy} r={this.r} stroke="red" strokeWidth={this.sw} strokeDasharray={this.sda} strokeDashoffset={this.sdo} fill="transparent" /> */}
                        <path className="hero-health-points" d={this.d} strokeWidth={this.sw} strokeDasharray={this.sda} strokeLinecap="butt" fill="transparent" />
                    </svg>
                    <div className="heart app-heart">
                        <div className="heart-text app-heart-text">
                            {this.current}
                        </div>
                    </div>
                </div>
                <div className="item card-place card-like" id={this.player.active ? 'item' : null}>
                    {this.state.item ? <Card card={this.state.item} /> : null}
                </div>
                <Deck deck={this.player.deck} />
                <div className="hand">
                    {Object.values(this.player.hand).map(card => (
                        <div className="card-place card-like">
                            <Card card={card} draggable={this.player.active} />
                        </div>
                    ))}
                </div>
                <Grave grave={this.player.grave} />
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

GameTable.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

export default GameTable;
