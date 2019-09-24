import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';

import yaga from '../images/heroes/yaga_full.jpg';
import morevna from '../images/heroes/morevna_full.jpg';
import hozyaika from '../images/heroes/hozyaika_full.jpg';
import premudraya from '../images/heroes/premudraya_full.jpg';
import heart from '../images/icons/heart_red.png';

import ornament from '../images/patterns/sideOrnament.png';

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

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
class ListOfHeroes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 0,
        };
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    prev() {
        this.setState((state) => {
            const first = state.first === 0 ? 0 : state.first - 1;
            return { first };
        });
    }

    next() {
        const maxIndex = this.props.allHeroes.length - 3;
        this.setState((state) => {
            const first = state.first === maxIndex ? maxIndex : state.first + 1;
            return { first };
        });
    }

    render() {
        const heroes = this.props.allHeroes.slice(this.state.first, this.state.first + 3);
        console.log(heroes);
        return (
            <div>
                <div className="heroes-list">
                    <button type="button" className="hero-block left-arrow" onClick={this.prev} />
                    {heroes.map((hero) => (
                        <HeroBlock
                            key={hero.id}
                            select={() => this.props.select(hero.id)}
                            hero={hero}
                            isAvailable={this.props.heroesID.includes(hero.id)}
                        />
                    ))}
                    <button type="button" className="hero-block right-arrow" onClick={this.next} />
                </div>
                <div className="heroes-name">
                    <img src={ornament} />
                    <div><h3>HERO NAME GOES HERE</h3></div>
                    <img src={ornament} />
                </div>
            </div>

        );
    }
}

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
