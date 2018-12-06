import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';
import MainMenu from './MainMenu';
import './css/MainMenu.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

/* const renderHeroes = function (players) {
    players.forEach((p) => {
        <OneHero hero={p.hero} />;
    });
}; */

/**
* OneHero component: contains character's portrait
*
* @param {string} props.hero Character's name
* @returns {object} OneHero component
*/
const OneHero = props => (
    <div className="versus-one-hero">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

/**
* VersusScreen component: contains character's portraits, 'play' button and MainMenu
*
* @param {object} props.app All info for the game
* @param {function} props.sendMessage When the button is clicked this function sends message to pass type of screen to be loaded after clicking the button
* @returns {object} VersusScreen component
*/
const VersusScreen = props => (
    <div className="versus-screen-container">
        <div className="versus-heroes-container">
            <OneHero hero={props.app.game.players[0].hero} />
            <div className="vs">
                <p>
                VS
                </p>
            </div>
            <OneHero hero={props.app.game.players[1].hero} />
        </div>
        <div className="play-button-container">
            <button className="play-button" type="button" onClick={() => props.sendMessage({ type: 'DEALALL' })}>
            PLAY
            </button>
        </div>
        <MainMenu sendMessage={props.sendMessage} />
    </div>
);

VersusScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.string.isRequired,
};

export default VersusScreen;
