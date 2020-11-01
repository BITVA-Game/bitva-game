/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';

import playSound from '../soundController';

import yaga from '../images/heroes/yaga.jpg';
import morevna from '../images/heroes/morevna.jpg';
import hozyaika from '../images/heroes/hozyaika.jpg';
import premudraya from '../images/heroes/premudraya.jpg';

const { phase: phaseConst, sound: soundConst, target } = require('../constants');

const width = 200;
const height = 200;
const style = { height: `${height}px`, width: `${width}px` };

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};
const HeroImage = ({ hero }) => (
    <img
        className="hero-image"
        src={images[hero]}
        alt={hero}
        style={style}
    />

);
const Hero = (props) => {
    const { isTarget, cardDropped, cardOver } = useContext(BoardContext);
    const activeHero = props.active ? target.HERO : target.OPPONENT;
    const heroClass = isTarget(activeHero, props.player) ? 'target' : '';
    const [heartSound, setHeartSound] = useState(false);

    // we call signle heart beat sound once with 2sec delay
    // after change of active player
    useEffect(() => {
        if (props.gamePhase !== phaseConst.OVER && props.active
            && props.player.moveCounter === 0 && props.player.health.current > 6) {
            setTimeout(() => playSound(soundConst.HEARTBEATSINGLE), 2000);
        }
    }, [props.active, props.gamePhase, props.player.moveCounter, props.player.health]);

    // we call repeated heart beat sound once active player has 6health pnts or less
    // after 3 health pnts of active player or less we call heartBeatFast
    useEffect(() => {
        const heartTime = setTimeout(() => setHeartSound(true), 3000);
        return () => {
            clearTimeout(heartTime);
            if (props.gamePhase !== phaseConst.OVER && props.active) {
                if (props.player.health.current <= 3) {
                    playSound(soundConst.HEARTBEATFAST);
                }
                if (props.player.health.current <= 6 && props.player.health.current > 3) {
                    playSound(soundConst.HEARTBEAT);
                }
            }

            setHeartSound(false);
        };
    }, [props.active, heartSound, props.gamePhase, props.player.health]);

    return (
        <div
            className={`hero ${heroClass}`}
            style={style}
            id={activeHero}
            onDrop={() => cardDropped(activeHero, props.player)}
            onClick={() => cardDropped(activeHero, props.player)}
            onDragOver={(e) => cardOver(e, activeHero, props.player)}
        >
            <HeroImage hero={props.player.hero} />
            <HealthMeter
                key={props.player.health.current}
                health={props.player.health}
                width={width}
                height={height}
            />
        </div>
    );
};

const HealthMeter = (props) => {
    // get the coordinates of the healthmeter center (half of the width and height)
    const cx = props.width / 2;
    const cy = props.height / 2;
    // set stroke width of the healthmeter circle
    const sw = 6;
    // get the radius of the healthmeter circle
    const r = cx - sw / 2;
    // get the circle length
    const cl = 2 * Math.PI * r;
    // set maximum level of the hero health
    const maximum = props.health.maximum;
    // get an angle of the current health level
    const angle = (360 / maximum) * props.health.current - 90;
    // check if the current health level is greater than a half
    // than an elliptic ark is long and goes along a large curve
    // it's a large-arc-flag in w3.org terminology
    // <https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands>
    // we add 90 degrees cause originally svg circle starts from the left
    // through the top to the right but we need it starts from the top
    const long = angle + 90 > 180 ? 1 : 0;
    // get the coordinates of the end of the elliptic arc
    const x = cx + r * Math.cos((angle * Math.PI - 1) / 180);
    const y = cy + r * Math.sin((angle * Math.PI - 1) / 180);

    // set the svg path: from the left-top corner M(oveto) the right on half of the healthmeter
    // width and to the down on half of the stroke width, then draw the elliptic A(rc) with
    // these parameters: radii rx and ry x-axis-rotation large-arc-flag sweep-flag
    // to the x y coordinates <https://www.w3.org/TR/SVG/images/paths/arcs02.png>
    const d = `M ${cx} ${sw / 2} A ${r} ${r} 0 ${long} 1 ${x} ${y}`;
    // get the strokeDasharray parameter for the path
    // (the length of the one health point and 1 for the gap)
    const sda = `${cl / maximum - 1},1`;
    // get the strokeDashoffset parameter to start the path with indentation (not used now)
    // const sdo = (cl / 360) * 90;

    return (
        <>
            <svg className="hero-health" width={cx * 2} height={cy * 2}>
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    stroke="black"
                    strokeWidth={sw + 1}
                    fill="transparent"
                />
                <path
                    className="hero-health-points"
                    d={d}
                    strokeWidth={sw}
                    strokeDasharray={sda}
                    strokeLinecap="butt"
                    fill="transparent"
                />
            </svg>
            <div className="hero-icon icon-heart">
                <span className="game-icon-text">{props.health.current}</span>
            </div>
        </>
    );
};

Hero.propTypes = {
    player: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    gamePhase: PropTypes.string.isRequired,
};

HeroImage.propTypes = {
    hero: PropTypes.string.isRequired,
};

HealthMeter.propTypes = {
    health: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default Hero;
