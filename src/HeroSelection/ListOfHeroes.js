import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';

import yaga from '../images/heroes/yaga_full.jpg';
import morevna from '../images/heroes/morevna_full.jpg';
import hozyaika from '../images/heroes/hozyaika_full.jpg';
import premudraya from '../images/heroes/premudraya_full.jpg';
import heart from '../images/icons/heart_red.png';

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

const Header = () => (
    <section className="heroselection-header">
        <div className="header-menu heroselection-title">
            Select Character
        </div>
    </section>
);

// Individual hero block, repeates to display every character
const HeroBlock = (props) => {
    const { hero, isAvailable, select } = props;
    return (
        <div className={isAvailable ? 'hero-block' : 'hero-block hero-inaccessable'}>
            <div role="button" className="btn-hero" onClick={select} onKeyPress={select} tabIndex="-1">
                <img className="heroselection-hero-image" src={images[hero.id]} alt={hero.id} />
                <div className="deck-icon">
                    <div className="deck-text">
                        {hero.cardsNumber}
                    </div>
                </div>
                <div className="health-container">
                    <img className="health" src={heart} alt="" />
                    <div className="health-text">
                        {hero.health}
                    </div>
                </div>
            </div>
        </div>
    );
};

// List of all characters, for each the HeroBlock is displayed.
// Click will take the player into character info screen
// opponent={props.opponent && hero.id === props.app.game.players[0].hero}
const ListOfHeroes = props => (
    <div className="heroes-list">
        {props.allHeroes.map(hero => (
            <HeroBlock
                key={hero.id}
                select={() => props.select(hero.id)}
                hero={hero}
                isAvailable={props.heroesID.includes(hero.id)}
            />
        ))}
    </div>
);

HeroBlock.propTypes = {
    isAvailable: PropTypes.bool.isRequired,
    select: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
};

ListOfHeroes.propTypes = {
    heroesID: PropTypes.array.isRequired,
    allHeroes: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
};

export default ListOfHeroes;
