import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/App.css';
import './css/MainMenu.css';
import './css/StartScreen.css';


/**
* StartScreen component: contains background, background's animations and MainMenu
*
* @param {function} props.sendMessage When the button is clicked this function sends message to pass type of screen to be loaded after clicking the button
* @returns {object} StartScreen component
*/
const StartScreen = props => (
    <div className="start-screen">
        <div className="hollow" />
        <div className="window window-left" />
        <div className="window window-right" />
        <MainMenu sendMessage={props.sendMessage} opened />
        {/* <textarea value={JSON.stringify(props.app.profile)} /> */}
    </div>
);

StartScreen.propTypes = {
    // app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default StartScreen;
