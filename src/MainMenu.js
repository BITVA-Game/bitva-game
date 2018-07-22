import React, { Component } from 'react';
import './App.css';

const MainMenu = (props) => (
	<div>
		<textarea value={JSON.stringify(props.app.profile)} />
		<button onClick={() => props.sendMessage({type: 'PLAY'})}>Select imaginary PvP</button>
	</div>
)

export default MainMenu;