import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

const HeroBlock = props => (
    <div className="HeroBlock">
        <button type="button" onClick={() => props.sendMessage({ type: 'HEROSELECTED', hero: props.hero.id })}>
            <img src={images[props.hero.id]} alt={props.hero.id} />
        </button>
    </div>
);

const HeroSelection = props => (
    <div className="HeroSelection">
        <h3>
            Select one character
        </h3>
        {Object.values(props.app.heroSelect).map(hero => (
            <HeroBlock key={hero.id} sendMessage={props.sendMessage} hero={hero} />
        ))}
    </div>
);


HeroBlock.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

export default HeroSelection;
