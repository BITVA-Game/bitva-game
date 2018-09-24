import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

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

const OneHero = props => (
    <div className="OneHeroVersus">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

const VersusScreen = props => (
    <div className="VersusScreenDiv">
        <div className="TitleDiv">
            <h3 className="Title">
            Versus Screen
            </h3>
        </div>
        <div className="containerVersus">
            <div>

                <OneHero hero={props.app.game.players[0].hero} />

            </div>
            <div className="vs">
                <p>
                VS
                </p>
            </div>
            <div>

                <OneHero hero={props.app.game.players[1].hero} />

            </div>

        </div>
        <div className="PlayButtonLayer">
            <div className="ButtonDiv">
                <button className="PlayButton" type="button" onClick={() => props.sendMessage({ type: 'DEALALL' })}>
                PLAY
                </button>
            </div>
        </div>
    </div>
);

VersusScreen.propTypes = {
    hero: PropTypes.string.isRequired,
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.string.isRequired,
};

export default VersusScreen;
