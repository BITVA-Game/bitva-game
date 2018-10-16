import React from 'react';
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
        ¡hola, mundo!
    </div>
);

GameTable.propTypes = {
    // sendMessage: PropTypes.func.isRequired,
    // app: PropTypes.object.isRequired,
};

export default GameTable;
