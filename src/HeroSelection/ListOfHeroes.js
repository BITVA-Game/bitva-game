import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';
import { sortedHeroesList } from './rules';

import yaga from './images/heroes/yaga_full.jpg';
import morevna from './images/heroes/morevna_full.jpg';
import hozyaika from './images/heroes/hozyaika_full.jpg';
import premudraya from './images/heroes/premudraya_full.jpg';
import heart from './images/icons/heart_red.png';

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

// footer section
const Footer = props => (
    <section className="heroselection-footer">
        {props.hero
            ? <BackButton onBack={props.onBack} />
            : null
        }
        <Play selectHero={props.selectHero} tabIndex="5" />

    </section>
);

const Play = props => (
    <div className="btn btn-play footer-menu" role="button" onClick={props.selectHero} onKeyPress={props.selectHero} tabIndex={props.tabIndex}>
        PLAY
    </div>
);

const BackButton = props => (
    <div className="btn btn-back footer-menu" role="button" onClick={props.onBack} onKeyPress={props.onBack} tabIndex="10">
        &#767;
    </div>
);

// Individual hero block, repeates to display every character
class HeroBlock extends React.Component {
    highlighted() {
        const highlight = this.props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive';
        return highlight;
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
// opponent={props.opponent && hero.id === props.app.game.players[0].hero}
const ListOfHeroes = (props) => {
    const heroes = sortedHeroesList(props.app);
    const characterIDs = props.app.heroSelect.heroes;

    return (
        <div>
            <div className="heroes-list">
                {heroes.map(hero => (
                    <HeroBlock
                        key={hero.id}
                        onShow={props.onShow}
                        hero={hero}
                        app={props.app}
                        isAvailable={characterIDs.includes(hero.id)}
                        selected={hero.id === props.selected}
                        changeSelected={props.changeSelected}
                    />
                ))}
            </div>
            {/*
            <Footer
                hero={this.state.hero}
                selectHero={this.selectHero}
                onBack={this.showHeroList}
            />
            */}
        </div>
    );
};

HeroBlock.propTypes = {
    changeSelected: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    isAvailable: PropTypes.bool.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

Footer.propTypes = {
    hero: PropTypes.object,
    selectHero: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

Footer.defaultProps = {
    hero: null,
};

export default ListOfHeroes;
