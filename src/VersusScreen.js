import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import hozyaika from './images/heroes/hozyaika.jpg';
import premudraya from './images/heroes/premudraya.jpg';

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

class VersusScreen extends Component {
    constructor(props) {
        super(props);

        this.sendDealAllMessage = this.sendDealAllMessage.bind(this);
        this.waitForIt = this.waitForIt.bind(this);
    }

    sendDealAllMessage() {
        console.log('send dealall');
        this.props.sendMessage({ type: 'DEALALL' });
    }

    waitForIt() {
        console.log('waiting');
        setTimeout(this.sendDealAllMessage, 500);
    }

    render() {
        return (
            <div className="main-container">
                <div className="versus-container">
                    <div className="versus-heroes-container">
                        <OneHero hero={this.props.app.players[0].hero} />
                        <div className="vs">
                            <p>
                                VS
                            </p>
                        </div>
                        <OneHero hero={this.props.app.players[1].hero} />
                    </div>
                    <div className="versus-loading-container">
                        <div className="versus-loading" onLoad={this.waitForIt.call(this)}>
                            <div className="loading" />
                        </div>
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
