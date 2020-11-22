import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Settings.css';

const { message } = require('./constants');

const Settings = ({ sendMessage, app }) => {
    const { soundOn } = app.settings;
    const toggleSound = () => {
        sendMessage({ type: message.TOGGLESOUND, soundOn: !soundOn });
    };

    return (
        <div>
            <div className="main-container">
                <header className="main-header">SETTINGS</header>
                <section className="main-content">
                    <div className="login-profiles-container main-content">
                        <button type="button" className="login-button" onClick={toggleSound}>{soundOn ? 'Sound Off' : 'Sound On'}</button>
                        <div className="slider-container">
                        <label htmlFor="volume">Volume</label>
                            <input type="range" id="volume" name="volume" min="0" max="10" step="1" />
                            
                        </div>
                    </div>
                </section>
                <footer className="main-footer" />
            </div>
            <MainMenu sendMessage={sendMessage} />
        </div>
    );
};

Settings.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default Settings;
