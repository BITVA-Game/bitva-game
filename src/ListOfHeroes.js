import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';
import { activeProfile, sortedHeroesList } from './rules';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import hozyaika from './images/heroes/hozyaika.jpg';
import premudraya from './images/heroes/premudraya.jpg';
import heart from './images/icons/heart_red.png';

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

// Individual hero block, repeates to display every character
class HeroBlock extends React.Component {
    highlighted() {
        const highlight = this.props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive';
        const additional = this.props.opponent ? 'btn-hero btn-hero-ooponent ' : highlight;
        return additional;
    }

    render() {
        const {
            hero, isAvailable, changeSelected, onShow,
        } = this.props;
        return (
            <div className={isAvailable ? 'hero-block' : 'hero-block hero-inaccessable'}>
                <div className={this.highlighted()} role="button" onMouseEnter={() => changeSelected(hero.id)} onClick={onShow} onKeyPress={onShow} tabIndex="-1">
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
    }
}

// List of all characters, for each the HeroBlock is displayed.
// Click will take the player into character info screen
const ListOfHeroes = (props) => {
    const heroes = sortedHeroesList(props.app);
    const characterIDs = activeProfile(props.app).characters;

    return (
        <div className="heroes-list">
            {heroes.map(hero => (
                <HeroBlock
                    key={hero.id}
                    onShow={props.onShow}
                    hero={hero}
                    app={props.app}
                    isAvailable={characterIDs.includes(hero.id)}
                    selected={hero.id === props.selected}
                    opponent={props.opponent && hero.id === props.app.game.players[0].hero}
                    changeSelected={props.changeSelected}
                />
            ))}
        </div>
    );
};

HeroBlock.propTypes = {
    changeSelected: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    opponent: PropTypes.bool.isRequired,
    isAvailable: PropTypes.bool.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    opponent: PropTypes.bool.isRequired,
};

export default ListOfHeroes;
