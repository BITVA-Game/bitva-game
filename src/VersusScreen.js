import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import hozyaika from './images/heroes/hozyaika.jpg';
import premudraya from './images/heroes/premudraya.jpg';

const { message } = require('./constants');

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

/* const renderHeroes = function (players) {
    players.forEach((p) => {
        <OneHero hero={p.hero} />;
    });
}; */

const OneHero = (props) => (
    <div className="versus-one-hero">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

const VersusScreen = (props) => {
    useEffect(() => {
        const dealAllmessage = setTimeout(() => {
            props.sendMessage({ type: message.DEALALL });
        }, 5000);

        return () => clearTimeout(dealAllmessage);
    }, []);

    return (
        <div className="main-container">
            <div className="versus-container">
                <div className="versus-heroes-container">
                    <OneHero hero={props.app.game.players[0].hero} />
                    <div className="vs">
                        <p>
                            VS
                        </p>
                    </div>
                    <OneHero hero={props.app.game.players[1].hero} />
                </div>
                <div className="versus-loading-container">
                    <div className="versus-loading">
                        <div className="loading" />
                    </div>
                </div>
            </div>
        </div>
    );
};

VersusScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.string.isRequired,
};

export default VersusScreen;
