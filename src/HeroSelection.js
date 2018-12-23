/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/MainMenu.css';
import './css/App.css';
import './css/HeroSelection.css';
import styles from './css/HeroSelection.module.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import heart from './images/icons/heart.png';

const images = {
    yaga,
    morevna,
};

function isAvailable(app, hero) {
    return app.profile.characters.find(character => character === hero.id);
}

const HeaderHeroButton = props => (
  <div className={"btn hero-nav-menu-btn hero-btn-arrow "+props.direction} role="button" onClick={props.funct} onKeyPress={props.funct} tabIndex={props.tabIndex}>
      {props.img}
  </div>
)

// common elements
// header section
const Header = props => (
    <section className="heroselection-header">
        <div className="header-menu heroselection-title">
            <span>
                SELECT CHARACTER
            </span>
        </div>
        <div className="header-menu header-nav-menu">
           <HeaderHeroButton direction={"hero-btn-arrow-left"} funct={props.prev} tabIndex={"1"} img={"◀"}/>
            <div className="hero-nav-menu-name header-menu">
                {props.selected}
            </div>
            <HeaderHeroButton direction={"hero-btn-arrow-right"} funct={props.next} tabIndex={"2"} img={"▶"}/>
        </div>
        { props.details
          ? <div className="btn btn-hero-details header-menu" role="button" onClick={() => { props.onShow(props.selected); }} onKeyPress={() => { console.log('key hero-details'); }} tabIndex="4">
              <span>
                  CHARACTER DETAILS
              </span>
            </div>
          : null
        }
    </section>
);

// footer section
const Footer = props => (
    <section className="heroselection-footer">
        <div className="heroselection-footer-menu heroselection-play">
            <div className="btn btn-play footer-menu" role="button" onClick={() => props.selectHero(props.selected)} onKeyPress={() => { console.log('key play'); }} tabIndex="5">
                PLAY
            </div>
        </div>
    </section>
);

// Individual hero block, repeates to display every character
const HeroBlock = props => (
    <div className={isAvailable(props.app, props.hero) ? 'hero-block' : 'hero-block hero-inaccessable'}>
        <div className={props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive'} role="button" onClick={() => (props.onShow(props.hero.id))} onKeyPress={() => props.onShow(props.hero.id)} tabIndex="-1">
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
            {/* <div className="hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div> */}
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

const HeroImage = props => (
  <div className="details-hero">
      <div className="details-hero-avatar">
          <img src={images[props.heroid]} alt={props.heroid} />
      </div>
  </div>
)

// Info about one hero. The click on the image should show a popup with char details
const OneHero = props => (
    <div className={styles.details}>
        <HeroImage heroid={props.hero.id}/>
        {/* button to move in footer */}
        <div className="details-hero-btn-block">
            <div className="btn btn-back footer-menu" role="button" onClick={() => props.onBack()} onKeyPress={() => props.onBack()} tabIndex="10">
                &#767;
            </div>
        </div>
        <div className="details-info-block">
            <article className="details-description">
                <span>
                    {props.hero.description}
                </span>
            </article>
            <section className="details-cards">
                <div className="btn cards-btn cards-btn-left" role="button" onClick={() => { console.log('click cards-left'); }} onKeyPress={() => { console.log('key cards-left'); }} tabIndex="5">
                    ◀
                </div>
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="6" />
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="7" />
                <img className="details-card" src={images[props.hero.id]} alt={props.hero.id} tabIndex="8" />
                <div className="btn cards-btn cards-btn-right" role="button" onClick={() => { console.log('click cards-right'); }} onKeyPress={() => { console.log('key cards-right'); }} tabIndex="9">
                    ▶
                </div>
            </section>
        </div>
    </div>
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.state = {
          hero: null,
          selected: this.app.heroSelect[Object.keys(this.app.heroSelect)[0]].id,
          details: true,
        };
        this.showHero = this.showHero.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.selectLeftHero = this.selectLeftHero.bind(this);
        this.selectRightHero = this.selectRightHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
    }


    showHero(heroID) {
        const hero = this.app.heroSelect[heroID];
        if(hero){
            this.setState({ hero, details: false });
        } else {
            this.setState({ hero, details: true });
        }
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

    render() {
        console.log("DETAILS: ", this.state.details);
        return (
            <div className="heroselection-container">
                <Header prev={this.selectLeftHero} next={this.selectRightHero} selected={this.state.selected} onShow={this.showHero} details={this.state.details}/>
                <div className={styles.main}>
                    {this.state.hero
                        ? (
                            <OneHero
                                hero={this.state.hero}
                                onBack={this.showHero}
                            />
                        ) : (
                            <ListOfHeroes
                                app={this.props.app}
                                onShow={this.showHero}
                                changeSelected={this.changeSelected}
                                selected={this.state.selected}
                            />
                        )
                    }
                </div>
                <MainMenu sendMessage={this.props.sendMessage} />
                <Footer selected={this.state.selected} selectHero={this.selectHero} />
            </div>
        );
    }
}

Header.propTypes = {
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
};

Footer.propTypes = {
    // something: PropTypes.string.isRequired,
    selectHero: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

HeroBlock.propTypes = {
    app: PropTypes.object.isRequired,
    // changeSelected: PropTypes.func.isRequired,
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

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
    // something: PropTypes.string.isRequired,
};

export default HeroSelection;
