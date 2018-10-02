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
    return app.profile.characters.find((char) => {
        console.log(char, hero.id);
        return char === hero.id;
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
        <button className="btn-hero" type="button" onClick={() => (isAvailable(props.app, props.hero) ? props.onShow(props.hero) : props.showDetails(props.hero))}>
            <img className="hero-image" src={images[props.hero.id]} alt={props.hero.id} />
            <div className="hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div>
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
            />
        ))}
        <div className="btn btn-hero-details header-menu" role="button" onClick={() => { console.log('click hero-details'); }} onKeyPress={() => { console.log('key hero-details'); }} tabIndex="3">
            character details
        </div>
    </div>
);

// Info about one hero. The click on the image should show a popup with char details
const OneHero = props => (
    <div className="details">
        <div className="details-hero">
            <div className="details-hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div>
            <div className="details-hero-avatar">
                <img src={images[props.hero.id]} alt={props.hero.id} />
            </div>
            <div className="details-hero-btn-block">
                <div className="btn btn-back footer-menu" role="button" onClick={() => props.onBack()} onKeyPress={() => props.onBack()} tabIndex="9">
                    Back
                </div>
                <button className="btn btn-select" type="button" onClick={() => props.onSelect(props.hero)}>
                    Select
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
        this.state = { hero: null, details: null };
        this.showHero = this.showHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
    }

    showHero(hero) {
        this.setState({ hero });
    }

    selectHero(hero) {
        this.props.sendMessage({ type: 'HEROSELECTED', hero: hero.id });
    }

    showDetails(hero) {
        this.setState({ details: hero });
    }

    closeDetails() {
        this.setState({ details: null });
    }

    render() {
        return (
            <div className="container-root">
                <section className="section-header">
                    <div className="header-menu hero-select-title">
                            Select character
                    </div>
                    <div className="header-menu hero-nav-menu">
                        <div className="btn hero-nav-menu-btn hero-btn-arrow hero-btn-arrow-left" role="button" onClick={() => { console.log('click nav-left'); }} onKeyPress={() => { console.log('key nav-left'); }} tabIndex="1">
                            ◀
                        </div>
                        <div className="btn hero-nav-menu-btn hero-btn-arrow hero-btn-arrow-right" role="button" onClick={() => { console.log('click nav-right'); }} onKeyPress={() => { console.log('key nav-right'); }} tabIndex="3">
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
                                onShow={this.showHero}
                                showDetails={this.showDetails}
                            />
                        )}
                    {this.state.details
                        ? <HeroInfo hero={this.state.details} closeDetails={this.closeDetails} />
                        : null}
                </section>
                <section className="section-footer">
                    <div className="btn btn-play footer-menu" role="button" onClick={() => { console.log('click play'); }} onKeyPress={() => { console.log('key play'); }} tabIndex="-1">
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
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};


export default HeroSelection;
