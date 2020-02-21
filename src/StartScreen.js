import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/App.css';
import './css/MainMenu.css';
import './css/StartScreen.css';

const StartScreen = (props) => console.log('We are in START SCREEN!!!') || (
    <div>
        <MainMenu sendMessage={props.sendMessage} opened />
        {/* <textarea value={JSON.stringify(props.app.profile)} /> */}
    </div>
);

StartScreen.propTypes = {
    // app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default StartScreen;
