import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/App.css';
import './css/MainMenu.css';
import './css/StartScreen.css';
// import spider from './images/animation/spider.png';


const StartScreen = (props) => (
    <div>
        {/* <div data-testid="hollow-animation" className="hollow" />
        <div data-testid="window-animation" className="window" />
        <div data-testid="spider-animation" className="spider">
            <img src={spider} alt="spider icon" />
        </div>
        <div data-testid="mushroom-animation" className="mushroom" /> */}
        <MainMenu sendMessage={props.sendMessage} opened />
        {/* <textarea value={JSON.stringify(props.app.profile)} /> */}
    </div>
);

StartScreen.propTypes = {
    // app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default StartScreen;
