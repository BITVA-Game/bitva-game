import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/App.css';
import './css/MainMenu.css';
import './css/StartScreen.css';


const StartScreen = props => (
	<div className="StartScreen">
		<MainMenu sendMessage={props.sendMessage} />
		{/* <textarea value={JSON.stringify(props.app.profile)} /> */}
	</div>
);

StartScreen.propTypes = {
	// app: PropTypes.object.isRequired,
	sendMessage: PropTypes.func.isRequired,
};

export default StartScreen;
