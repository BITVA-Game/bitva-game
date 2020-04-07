/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/GameScreen.css';
import BoardContext from './BoardContext';
import playSound from '../soundController';

import graveyard from '../images/cards/graveyard.png';

const { target, sound: soundConst, animation: animationConst } = require('../constants');

const Animation = (props) => {
    playSound(soundConst.CARDSFROMGRAVE);
    return (
        <div className="stack">
            <div className={`deck card-like deck-${props.background} one`} />
            <div className={`deck card-like deck-${props.background} two`} />
            <div className={`deck card-like deck-${props.background} three`} />
        </div>
    );
};

const Grave = (props) => {
    const { isTarget, cardDropped, cardOver } = useContext(BoardContext);
    return (
        <div
            className={`grave card-like  grave-${props.background} ${
                isTarget(target.GRAVEYARD, props.player) ? 'target' : null
            }`}
            style={{
                backgroundImage: `url(${graveyard})`,
                backgroundSize: '100% 100%',
            }}
            id={props.active ? target.GRAVEYARD : null}
            onDrop={() => cardDropped(target.GRAVEYARD, props.player)}
            onClick={() => cardDropped(target.GRAVEYARD, props.player)}
            onDragOver={(e) => cardOver(e, target.GRAVEYARD, props.player)}
        >
            <div className="count">
                {props.active
                    ? Object.keys(props.grave).length
                    : Object.keys(props.grave).length}
            </div>
            {props.animation === animationConst.CARDS ? (
                <Animation background={props.background} />
            ) : null}
        </div>
    );
};

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    animation: PropTypes.string,
};

Grave.defaultProps = {
    animation: null,
};

Animation.propTypes = {
    background: PropTypes.string.isRequired,
};

export default Grave;
