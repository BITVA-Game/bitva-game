import React, { Component } from 'react';
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

const OneHero = props => (
    <div className="versus-one-hero">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

class VersusScreen extends Component {
    constructor(props) {
        super(props);

        this.sendDealAllMessage = this.sendDealAllMessage.bind(this);
    }

    sendDealAllMessage() {
        this.props.sendMessage({ type: 'DEALALL' });
    }

    render() {
        return (
            <div className="versus-screen-container">
                <div className="versus-heroes-container">
                    <OneHero hero={this.props.app.game.players[0].hero} />
                    <div className="vs">
                        <p>
                  VS
                        </p>
                    </div>
                    <OneHero hero={this.props.app.game.players[1].hero} />
                </div>
                <div className="play-button-container">
                    <button className="play-button" type="button" onClick={this.sendDealAllMessage}>
              PLAY
                    </button>
                </div>
                <MainMenu sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}

VersusScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.string.isRequired,
};

export default VersusScreen;
