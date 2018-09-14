import React from 'react';
//import PropTypes from 'prop-types';
import './css/App.css';
import './css/Versus.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

const renderHeroes = function (players) {
    players.forEach((p) => {
        <OneHero hero={p.hero} />;
    });
};

const OneHero = props => (
    <div className="OneHeroVersus">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

const VersusScreen = props => (
    <body>    
        <h3>
            Versus Screen
        </h3>
      <div class="containerVersus">
        <div>
            {' '}
            <OneHero hero={props.app.game.players[0].hero} />
            {' '}
        </div>
        <p> VS </p>
        <div>
            {' '}
            <OneHero hero={props.app.game.players[1].hero} />
            {' '}
        </div>

     </div>
        <div className="PlayButtonLayer">
            <button className="PlayButton" type="button" onClick={() => props.sendMessage({ type: 'DEALALL' })}>
                PLAY
            </button>
         </div>
    </body>
);

export default VersusScreen;
