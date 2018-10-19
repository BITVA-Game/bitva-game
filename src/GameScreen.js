import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/GameScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

// game table
const GameTable = props => (
    <div className="game-table app-background">
        {props.app.game.players.map(player => (
            <Player player={player} />
        ))}
    </div>
);

class Player extends Component {
    constructor(props) {
        super(props);

        this.width = 200;
        this.height = 200;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        this.sw = 6;
        this.r = this.cx - this.sw / 2;
        const cl = 2 * Math.PI * this.r;

        this.player = props.player;
        console.log(this.player);
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
            height: `${this.height}px`,
            width: `${this.width}px`,
        };
    }


    render() {
        return (
            <div className={this.player.active ? 'player player-active' : 'player player-inactive'}>
                <div className="hero" style={this.style}>
                    <img className="hero-image" src={images[this.player.hero]} alt={this.player.hero} />
                    <svg className="hero-health" width={(this.cx) * 2} height={(this.cy) * 2}>
                        <circle cx={this.cx} cy={this.cy} r={this.r} stroke="black" strokeWidth={this.sw + 1} fill="transparent" />
                        {/* <circle cx={this.cx} cy={this.cy} r={this.r} stroke="red" strokeWidth={this.sw} strokeDasharray={this.sda} strokeDashoffset={this.sdo} fill="transparent" /> */}
                        <path className="hero-health-points" d={this.d} strokeWidth={this.sw} strokeDasharray={this.sda} strokeLinecap="butt" fill="transparent" />
                    </svg>
                    <div className="heart">
                        <div className="heart-health">
                            {this.current}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired,
};

GameTable.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

export default GameTable;
