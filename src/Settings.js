import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';

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
