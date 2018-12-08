import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/GameScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

import './dragging';

// we create images containing obejct = yaga + morevna heroes jpeg pictures
const images = {
    yaga,
    morevna,
};

// game table with active player in the bottom and inactive on the top
const GameTable = (props) => {
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

// container for the card, that showscard received by active player
const Card = props => (
    <div className="card card-like" draggable={props.draggable}>
        <div className="card-name">
            {props.card.name}
        </div>
    </div>
);

// common cards deck
const Deck = props => (
    <div className="deck card-like">
        <div className="deck-name">
            deck
        </div>
    </div>
);

// graveyard for each player's cards
const Grave = props => (
    <div className="grave card-like">
        <div className="grave-name">
            grave
        </div>
    </div>
);

/**
 * @class Player
 * @property constructor
 * @param {object} props with parameters of all components
 * @return {object} that shows heroes avatars with health
 * */
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null };

        this.width = 200;
        this.height = 200;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        this.sw = 6;
        this.r = this.cx - (this.sw / 2);
        const cl = 2 * Math.PI * this.r;

        this.player = props.player;
        this.current = this.player.health.current;
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

    componentDidMount() {
        if (this.player.active) {
            // const script = document.createElement('script');
            // script.async = true;
            // script.src = dragging;
            // script.type = 'text/javascript';
            // document.body.appendChild(script);
        }
    }

    /**
 * component that renders to DOM game table
 *@returns {object} that shows game tablewithc heroes avatars, deck, cards and gravyeard
 * */
    render() {
        return (
            <div className={this.player.active ? 'player player-active' : 'player player-inactive'}>
                <div className="hero" style={this.style.hero} id={this.player.active ? 'hero' : 'enemy'}>
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
                    {Object.values(this.player.hand).map((card, index) => (
                        <div key={index} className="card-place card-like">
                            <Card card={card} draggable={this.player.active} />
                        </div>
                    ))}
                </div>
                <div className="grave card-like" id={this.player.active ? 'grave' : null}>
                    <div className="grave-name">
                        grave
                    </div>
                    <div className="count">
                        {this.player.active ? Object.keys(this.player.grave).length : null}
                    </div>
                </div>
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
