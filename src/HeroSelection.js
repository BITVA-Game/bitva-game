import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

function isAvailable(app, hero) {
    return app.profile.characters.find((character) => {
        console.log(character, hero.id);
        return character === hero.id;
    });
}


// Pop-up with character details
const HeroInfo = props => (
    <div className="hero-info">
        <button className="btn-close" type="button" onClick={() => props.closeDetails()}>
            X
        </button>
        {/* <img src={images[props.hero.id]} alt={props.hero.id}/> */}
        <h3>
            {props.hero.name}
        </h3>
        <p>
            {props.hero.description}
        </p>
    </div>
);

// Individual hero block, repeates to display every character
const HeroBlock = props => (
    <div className={isAvailable(props.app, props.hero) ? 'hero-block' : 'hero-block hero-inaccessable'}>
        <button className={props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero'} type="button" onClick={() => (props.changeSelected(props.hero.id))}>
            <img className="hero-image" src={images[props.hero.id]} alt={props.hero.id} />
            {/* <div className="hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div> */}
        </button>
        <button className="btn-hero-info" type="button" hero={props.hero} onClick={() => props.showDetails(props.hero)}>
            Info
        </button>
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
                showDetails={props.showDetails}
                hero={hero}
                app={props.app}
                selected={hero.id === props.selected}
                changeSelected={props.changeSelected}
            />
        ))}
        <div className="btn btn-hero-details header-menu" role="button" onClick={() => { props.onShow(props.app.heroSelect[props.selected]); }} onKeyPress={() => { console.log('key hero-details'); }} tabIndex="3">
            CHARACTER DETAILS
        </div>
        <div type="button" className="btn footer-menu btn-start-screen" role="button" onClick={() => props.onPrevious} onKeyPress={() => { console.log('key hero-details'); }} tabIndex="10">
                TO START SCREEN
        </div>
        
    </div>
);

// Info about one hero. The click on the image should show a popup with char details
const OneHero = props => (
    <div className="details">
        <div className="details-hero">
            {/* <div className="details-hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div> */}
            <div className="details-hero-avatar">
                <img src={images[props.hero.id]} alt={props.hero.id} />
            </div>
            <div className="details-hero-btn-block">
                <div className="btn btn-back footer-menu" role="button" onClick={() => props.onBack()} onKeyPress={() => props.onBack()} tabIndex="9">
                    BACK
                </div>
                <button className="btn btn-select" type="button" onClick={() => props.onSelect(props.hero)}>
                    SELECT
                </button>
            </div>
        </div>
        <section className="details-info-block">
            <article className="details-description">
                <span>
                    {props.hero.description}
                </span>
            </article>
            <section className="details-cards">
                <div className="btn cards-btn cards-btn-left" role="button" onClick={() => { console.log('click cards-left'); }} onKeyPress={() => { console.log('key cards-left'); }} tabIndex="4">
                    ◀
                </div>
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="5" />
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="6" />
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="7" />
                <div className="btn cards-btn cards-btn-right" role="button" onClick={() => { console.log('click cards-right'); }} onKeyPress={() => { console.log('key cards-right'); }} tabIndex="8">
                    ▶
                </div>
            </section>
        </section>
    </div>
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.state = { hero: null, selected: this.app.heroSelect[Object.keys(this.app.heroSelect)[0]].id, details: null };
        this.showHero = this.showHero.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.selectLeftHero = this.selectLeftHero.bind(this);
        this.selectRightHero = this.selectRightHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
	    this.goStartScreen = this.goStartScreen.bind(this);
    }

    showHero(hero) {
        this.setState({ hero });
    }

    changeSelected(selected) {
        this.setState({ selected });
        this.showHero(this.app.heroSelect[selected]);
    }

    selectRightHero() {
        const heroes = Object.keys(this.app.heroSelect);
        let index = heroes.indexOf(this.state.selected);
        index = index === heroes.length - 1 ? 0 : index + 1;
        this.setState({ selected: heroes[index] });
    }

    selectLeftHero() {
        const heroes = Object.keys(this.app.heroSelect);
        let index = heroes.indexOf(this.state.selected);
        index = index === 0 ? heroes.length - 1 : index - 1;
        this.setState({ selected: heroes[index] });
    }

    selectHero(selected) {
        this.props.sendMessage({ type: 'HEROSELECTED', hero: selected });
    }

    showDetails(hero) {
        this.setState({ details: hero });
    }

    closeDetails() {
        this.setState({ details: null });
    }

    goStartScreen() {
        this.props.sendMessage({ type: 'STARTSCREEN' });
    }

    render() {
        return (
            <div className="container-root">
                <section className="section-header">
                    <div className="header-menu hero-select-title">
                            SELECT CHARACTER
                    </div>
                    <div className="header-menu hero-nav-menu">
                        <div className="btn hero-nav-menu-btn hero-btn-arrow hero-btn-arrow-left" role="button" onClick={() => { this.selectLeftHero(); }} onKeyPress={() => { console.log('key nav-left'); }} tabIndex="1">
                            ◀
                        </div>
                        <div className="hero-nav-menu-name header-menu">
                            {this.state.selected}
                        </div>
                        <div className="btn hero-nav-menu-btn hero-btn-arrow hero-btn-arrow-right" role="button" onClick={() => { this.selectRightHero(); }} onKeyPress={() => { console.log('key nav-right'); }} tabIndex="3">
                            ▶
                        </div>
                    </div>
                </section>
                <section className="section-main">
                    {this.state.hero
                        ? (
                            <OneHero
                                hero={this.state.hero}
                                onBack={this.showHero}
                                onSelect={this.selectHero}
                            />
                        )
                        : (
                            <ListOfHeroes
                                app={this.props.app}
                                changeSelected={this.changeSelected}
                                onShow={this.showHero}
                                selected={this.state.selected}
                                showDetails={this.showDetails}
                                onPrevious={this.goStartScreen}
                            />
                        )}
                    {this.state.details
                        ? <HeroInfo hero={this.state.details} closeDetails={this.closeDetails} />
                        : null}
                </section>
                <section className="section-footer">
                    <div className="btn btn-play footer-menu" role="button" onClick={() => this.selectHero(this.state.selected)} onKeyPress={() => { console.log('key play'); }} tabIndex="-1">
                            PLAY
                    </div>
                </section>
            </div>
        );
    }
}


HeroInfo.propTypes = {
    hero: PropTypes.object.isRequired,
    closeDetails: PropTypes.func.isRequired,
};

HeroBlock.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    showDetails: PropTypes.func.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    showDetails: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
    something: PropTypes.string.isRequired,
};

export default HeroSelection;
