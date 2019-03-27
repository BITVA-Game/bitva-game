import React, { Component } from 'react';
import PropTypes from 'prop-types';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import hozyaika from './images/heroes/hozyaika.jpg';
import premudraya from './images/heroes/premudraya.jpg';

const width = 200;
const height = 200;
const style = { height: `${height}px`, width: `${width}px` };

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

const Hero = props => (
    <div
        className={`hero ${props.isTarget(props.player.active ? 'hero' : 'opponent') ? 'target' : null}`}
        style={style}
        id={props.player.active ? 'hero' : 'enemy'}
        onDrop={() => props.cardDropped(props.player.active ? 'hero' : 'opponent')}
        onDragOver={e => props.cardOver(e, props.player.active ? 'hero' : 'opponent')}
    >
        <img
            className="hero-image"
            src={images[props.player.hero]}
            alt={props.player.hero}
            style={style}
        />
        <HealthMeter
            key={props.player.health.current}
            health={props.player.health}
            width={width}
            height={height}
        />
    </div>
);

class HealthMeter extends Component {
    constructor(props) {
        super(props);
        this.cx = props.width / 2;
        this.cy = props.height / 2;
        this.sw = 6;
        this.r = this.cx - (this.sw / 2);
        const cl = 2 * Math.PI * this.r;

        const maximum = props.health.maximum;
        const angle = ((360 / maximum) * props.health.current) - 90;
        const long = angle + 90 > 180 ? 1 : 0;
        const x = this.cx + (this.r * Math.cos(((angle * Math.PI) - 1) / 180));
        const y = this.cy + (this.r * Math.sin(((angle * Math.PI) - 1) / 180));

        this.d = `M ${this.cx} ${this.sw / 2} A ${this.r} ${this.r} 0 ${long} 1 ${x} ${y}`;
        this.sda = `${(cl / maximum) - 1},1`;
        this.sdo = (cl / 360) * 90;
    }

    render() {
        return (
            <>
                <svg className="hero-health" width={(this.cx) * 2} height={(this.cy) * 2}>
                    <circle cx={this.cx} cy={this.cy} r={this.r} stroke="black" strokeWidth={this.sw + 1} fill="transparent" />
                    <path className="hero-health-points" d={this.d} strokeWidth={this.sw} strokeDasharray={this.sda} strokeLinecap="butt" fill="transparent" />
                </svg>
                <div className="hero-icon game-icon-text icon-heal">
                    {this.props.health.current}
                </div>
            </>
        );
    }
}

Hero.propTypes = {
    player: PropTypes.object.isRequired,
    cardDropped: PropTypes.func.isRequired,
    cardOver: PropTypes.func.isRequired,
    isTarget: PropTypes.func.isRequired,
};

HealthMeter.propTypes = {
    health: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};


export default Hero;
