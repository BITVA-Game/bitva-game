import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';

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

function isAvailable(app, hero) {
    return app.profile.characters.find(character => character === hero.id);
}

function sortedHeroes(app) {
    // Sort characters based on profile and alphabet
    return Object.values(app.heroSelect).sort((h1, h2) => {
        const id1 = app.profile.characters.indexOf(h1.id);
        const id2 = app.profile.characters.indexOf(h2.id);
        if (id1 === id2) {
            return h1 > h2 ? 1 : -1;
        }
        return id1 > id2 ? -1 : 1;
    });
}

// Individual hero block, repeates to display every character
class HeroBlock extends React.Component {
    highlighted() {
        const highlight = this.props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive';
        const additional = this.props.opponent ? 'btn-hero btn-hero-ooponent ' : highlight;
        return additional;
    }

    render() {
        const {
            app, hero, changeSelected, onShow,
        } = this.props;
        return (
            <div className={isAvailable(app, hero) ? 'hero-block' : 'hero-block hero-inaccessable'}>
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
const ListOfHeroes = props => (
    <div className="heroes-list">
        {sortedHeroes(props.app).map(hero => (
            <HeroBlock
                key={hero.id}
                onShow={props.onShow}
                hero={hero}
                app={props.app}
                selected={hero.id === props.selected}
                opponent={props.opponent && hero.id === props.app.game.players[0].hero}
                changeSelected={props.changeSelected}
            />
        ))}
    </div>
);

HeroBlock.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    opponent: PropTypes.bool.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    opponent: PropTypes.bool.isRequired,
};

export default ListOfHeroes;
