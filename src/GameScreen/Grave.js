/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../css/GameScreen.css';

import graveyard from '../images/cards/graveyard.png';

const Animation = (props) => (
    <div className="stack">
        <div className={`deck card-like deck-${props.background} one`} />
        <div className={`deck card-like deck-${props.background} two`} />
        <div className={`deck card-like deck-${props.background} three`} />
    </div>
);

const Grave = (props) => (
    <div
        className={`grave card-like  grave-${props.background} ${
            props.isTarget('graveyard', props.player) ? 'target' : null
        }`}
        style={{
            backgroundImage: `url(${graveyard})`,
            backgroundSize: '100% 100%',
        }}
        id={props.active ? 'grave' : null}
        onDrop={() => props.cardDropped('graveyard', props.player)}
        onClick={() => props.cardDropped('graveyard', props.player)}
        onDragOver={(e) => props.cardOver(e, 'graveyard', props.player)}
    >
        <div className="count">
            {props.active
                ? Object.keys(props.grave).length
                : Object.keys(props.grave).length}
        </div>
        {props.animation === 'cards' ? (
            <Animation background={props.background} />
        ) : null}
    </div>
);

Grave.propTypes = {
    grave: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    isTarget: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
    cardOver: PropTypes.func.isRequired,
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
