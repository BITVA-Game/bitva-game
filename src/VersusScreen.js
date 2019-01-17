import React, { Component } from 'react';
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
    <div className="versus-one-hero">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

class VersusScreen extends Component {
    constructor(props) {
        super(props);

        this.sendDealAllMessage = this.sendDealAllMessage.bind(this);
        this.waitForIt = this.waitForIt.bind(this);
    }

    sendDealAllMessage() {
        this.props.sendMessage({ type: 'DEALALL' });
    }

    waitForIt() {
        console.log('waiting');
        setTimeout(this.sendDealAllMessage, 5000);
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
                <div className="versus-loading-container">
                    <div className="versus-loading" onLoad={this.waitForIt.call(this)}>
                        <div className="loading"></div>
                    </div>
                </div>
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
