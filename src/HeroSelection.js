import React, { Component } from 'react';
import './App.css';


const HeroSelection = (props) => (
	<div>
		<button onClick={() => props.sendMessage({type: 'HEROSELECTED', hero: 'yaga'})}>Select imaginary hero</button>
	</div>
)

export default HeroSelection;