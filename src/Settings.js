import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Settings.css';

const { message } = require('./constants');

const VolumeSlider = ({ changeVolume, initVolume }) => {
    const inputRef = useRef();
    const [volume, setVolume] = useState(initVolume);

    const handleVolume = () => {
        const inputCurrent = inputRef.current.value;
        setVolume(inputCurrent);
        changeVolume(inputCurrent);
    };

    useEffect(() => {
        const gradient = `${volume * 100}%`;
        inputRef.current.style.setProperty('--inputSliderLine', gradient);
    }, [volume]);

    return (
        <div className="slider-container">
            <label htmlFor="volume">
                Volume
                {volume}
            </label>
            <input type="range" ref={inputRef} id="volume" name="volume" min="0" max="1" step="0.1" value={volume} onChange={handleVolume} />
        </div>
    );
};

const Settings = ({ sendMessage, app }) => {
    const { soundOn, volume } = app.settings;

    const toggleSound = () => {
        sendMessage({ type: message.TOGGLESOUND, soundOn: !soundOn });
    };

    const changeVolume = (soundVolume) => {
        sendMessage({ type: message.CHANGEVOLUME, volume: soundVolume });
    };

    return (
        <div>
            <div className="main-container">
                <header className="main-header">SETTINGS</header>
                <section className="main-content">
                    <div className="login-profiles-container main-content">
                        <button type="button" className="login-button" onClick={toggleSound}>{soundOn ? 'Sound Off' : 'Sound On'}</button>
                        <VolumeSlider changeVolume={changeVolume} initVolume={volume} />
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

VolumeSlider.propTypes = {
    changeVolume: PropTypes.func.isRequired,
    initVolume: PropTypes.number.isRequired,
};

export default Settings;
