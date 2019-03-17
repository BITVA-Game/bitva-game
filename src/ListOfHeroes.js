import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import heart from './images/icons/heart_red.png';

const images = {
    yaga,
    morevna,
};

function isAvailable(app, hero) {
    return app.profile.characters.find(character => character === hero.id);
}

// Individual hero block, repeates to display every character
const HeroBlock = props => (
    <div className={isAvailable(props.app, props.hero) ? 'hero-block' : 'hero-block hero-inaccessable'}>
        <div className={props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive'} role="button" onClick={props.onShow} onKeyPress={props.onShow} tabIndex="-1">
            <img className="heroselection-hero-image" src={images[props.hero.id]} alt={props.hero.id} />
            <div className="deck-icon">
                <div className="deck-text">
                    {props.hero.cardsNumber}
                </div>
            </div>
            <div className="health-container">
                <img className="health" src={heart} alt="" />
                <div className="health-text">
                    {props.hero.health}
                </div>
            </div>
        </div>
    </div>
);

// List of all characters, for each the HeroBlock is displayed.
// Click will take the player into character info screen
const ListOfHeroes = props => (
    <div className="heroes-list">
        {Object.values(props.app.heroSelect).map(hero => (
            <HeroBlock
                key={hero.id}
                onShow={props.onShow}
                hero={hero}
                app={props.app}
                selected={hero.id === props.selected}
                changeSelected={props.changeSelected}
            />
        ))}
    </div>
);

HeroBlock.propTypes = {
    app: PropTypes.object.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

export default ListOfHeroes;
