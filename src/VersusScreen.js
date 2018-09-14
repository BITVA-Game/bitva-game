import React from 'react';
// import PropTypes from 'prop-types';
import './css/App.css';
import './css/Versus.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

const renderHeroes = function (players){
	players.forEach(function(p){
		<OneHero hero={p.hero}/>
	})
}

const OneHero = props => (
    <div className="OneHero">
        <img src={images[props.hero]} alt={props.hero} />
        </div>
);

const VersusScreen = props => (
    <div>
        <h3>
            Versus Screen
         </h3>
            <OneHero hero={props.app.game.players[0].hero}/>
            <OneHero hero={props.app.game.players[1].hero}/>
            
        
    </div> 
);


export default VersusScreen;
