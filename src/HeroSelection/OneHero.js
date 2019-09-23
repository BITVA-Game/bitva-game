/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';
import styles from '../css/HeroSelection.module.css';
import '../css/Cards.css';

import yaga from '../images/heroes/yaga.jpg';
import morevna from '../images/heroes/morevna.jpg';
import hozyaika from '../images/heroes/hozyaika.jpg';
import premudraya from '../images/heroes/premudraya.jpg';

import apple from '../images/cards/apple.jpg';
import bajun from '../images/cards/catbajun.jpg';
import bat from '../images/cards/bat.jpg';
import bereginya from '../images/cards/bitva-cardbase.jpg';
import bogatyr from '../images/cards/bitva-cardbase.jpg';
import bowArrow from '../images/cards/bitva-cardbase.jpg';
import bulat from '../images/cards/sword.jpg';
import chemise from '../images/cards/bitva-cardbase.jpg';
import chickenLegsHut from '../images/cards/izba.jpg';
import clairvoyance from '../images/cards/bitva-cardbase.jpg';
import crown from '../images/cards/bitva-cardbase.jpg';
import dolly from '../images/cards/bitva-cardbase.jpg';
import earthquake from '../images/cards/bitva-cardbase.jpg';
import horsemanBlack from '../images/cards/blackrider.jpg';
import horsemanRed from '../images/cards/redrider.jpg';
import horsemanWhite from '../images/cards/whiterider.jpg';
import kikimora from '../images/cards/bitva-cardbase.jpg';
import lizard from '../images/cards/lizard.jpg';
import magicTree from '../images/cards/tree.jpg';
import magicMirror from '../images/cards/bitva-cardbase.jpg';
import malachiteBox from '../images/cards/malachitebox.jpg';
import mortar from '../images/cards/bitva-cardbase.jpg';
import forestMushroom from '../images/cards/mushrooms.jpg';
import plateMail from '../images/cards/bitva-cardbase.jpg';
import raven from '../images/cards/raven.jpg';
import russianOven from '../images/cards/bitva-cardbase.jpg';
import shieldLarge from '../images/cards/largeshield.jpg';
import shieldSmall from '../images/cards/smallshield.jpg';
import sivka from '../images/cards/warhorse.jpg';
import skullLantern from '../images/cards/bitva-cardbase.jpg';
import turningPotion from '../images/cards/potion.jpg';
import warhorse from '../images/cards/warhorse.jpg';
import waterDead from '../images/cards/deadwater.jpg';
import waterLiving from '../images/cards/livingwater.jpg';
import wolf from '../images/cards/wolf.jpg';

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

const imagesCards = {
    apple,
    bajun,
    bat,
    bereginya,
    bogatyr,
    bowArrow,
    bulat,
    chemise,
    chickenLegsHut,
    clairvoyance,
    crown,
    dolly,
    earthquake,
    forestMushroom,
    horsemanBlack,
    horsemanRed,
    horsemanWhite,
    kikimora,
    lizard,
    magicTree,
    magicMirror,
    malachiteBox,
    mortar,
    plateMail,
    raven,
    russianOven,
    shieldLarge,
    shieldSmall,
    sivka,
    skullLantern,
    turningPotion,
    warhorse,
    waterDead,
    waterLiving,
    wolf,
};

const HeroImage = (props) => (
    <div className="details-hero">
        <div className="details-hero-avatar" style={{ backgroundImage: `url(${images[props.heroid]})`, backgroundSize: 'cover' }} />
    </div>
);

const CardPreview = (props) => (
    <div className={`card details-card ${props.card.type === 'item' ? `${props.hero.background}-item` : `${props.hero.background}-action`}`}>
        <div className="card-header">
            <div className={`card-icon-container details-card-icon-container ${props.card.type === 'item' ? `${props.hero.background}-item` : `${props.hero.background}-action`}`}>
                <div className={`card-icon details-card-icon
                    ${props.card.category === 'attack' ? 'icon-attack' : null}
                    ${props.card.category === 'attackItems' ? 'icon-damage' : null}
                    ${props.card.category === 'damage' ? 'icon-damage' : null}
                    ${props.card.category === 'generator' ? 'icon-move' : null}
                    ${props.card.category === 'heal' && props.card.type === 'action' ? 'icon-heal' : null}
                    ${props.card.category === 'heal' && props.card.type === 'item' ? 'icon-heart' : null}
                    ${props.card.category === 'holdCard' ? 'icon-hold' : null}
                    ${props.card.category === 'holdTurn' ? 'icon-hold' : null}
                    ${props.card.category === 'panic' ? 'icon-arrows' : null}
                    ${props.card.category === 'reflect' ? 'icon-reflect' : null}
                    ${props.card.category === 'shield' ? 'icon-shield' : null}
                    ${props.card.category === 'showCards' ? 'icon-show' : null}
                    ${props.card.category === 'shuffling' ? 'icon-move' : null}
                    ${props.card.category === 'suppress' ? 'icon-damage' : null}
                    ${props.card.category === 'turning' ? 'icon-arrows' : null}`}
                />
            </div>
            <p className="card-category details-card-category">{props.card.categoryName}</p>
            {props.card.initialpoints
                ? (
                    <div className={`card-points details-card-points
                        ${props.card.type === 'item' ? `${props.hero.background}-item` : `${props.hero.background}-action`}`}
                    >
                        {props.card.initialpoints}
                    </div>
                ) : null}
            {props.card.health
                ? (
                    <div className={`card-health details-card-health
                        ${props.card.type === 'item' ? `${props.hero.background}-item` : `${props.hero.background}-action`}`}
                    >
                        {props.card.health}
                    </div>
                ) : null}
        </div>
        <div className="details-card-image" style={{ backgroundImage: `url(${imagesCards[props.card.id]})`, backgroundSize: '100% 100%' }} />
        <div className="card-footer details-card-footer">
            <p>{props.card.name}</p>
        </div>
    </div>
);

const CardsRow = (props) => (
    <>
        <CardPreview card={props.cards[props.currentCard]} hero={props.hero} />
        <div className="card-description">
            {props.cards[props.currentCard].description}
            <div className="icon-deck icon-text">
                {props.cards[props.currentCard].count}
            </div>
        </div>
    </>
);

const Play = (props) => (
    <div className="btn btn-play footer-menu" role="button" onClick={props.play} onKeyPress={props.play} tabIndex={props.tabIndex}>
        PLAY
    </div>
);

const BackButton = (props) => (
    <div className="btn btn-back footer-menu" role="button" onClick={props.unselect} onKeyPress={props.unselect} tabIndex="10">
        &#767;
    </div>
);


class CardsBlock extends Component {
    constructor(props) {
        super(props);
        this.state = { cardIndex: 0 };
        this.changeRowNext = this.changeRowNext.bind(this);
        this.changeRowPrev = this.changeRowPrev.bind(this);
    }

    changeRowNext() {
        // console.log('changeRow ', this.state.cardIndex);
        const maxRotation = this.deck.length - 1;
        const currentRow = this.state.cardIndex;
        if (currentRow === maxRotation) {
            this.setState({ cardIndex: 0 });
        } else {
            this.setState({ cardIndex: currentRow + 1 });
        }
    }

    changeRowPrev() {
        // console.log('changeRow ', this.state.cardIndex);
        const minRotation = 0;
        const currentRow = this.state.cardIndex;
        if (currentRow === minRotation) {
            this.setState({ cardIndex: this.deck.length - 1 });
        } else {
            this.setState({ cardIndex: currentRow - 1 });
        }
    }

    render() {
        // get the array of all cards of current character
        this.deck = Object.keys(this.props.cards);
        // console.log(this.props.cards, this.deck);
        return (
            <section className="details-cards">
                <div className="btn cards-btn cards-btn-left" role="button" onClick={this.changeRowPrev} onKeyPress={this.changeRow} tabIndex="5">
                    ◀
                </div>
                <CardsRow heroId={this.props.heroId} currentCard={this.deck[this.state.cardIndex]} cards={this.props.cards} hero={this.props.hero} />
                <div className="btn cards-btn cards-btn-right" role="button" onClick={this.changeRowNext} onKeyPress={this.changeRow} tabIndex="6">
                    ▶
                </div>
            </section>
        );
    }
}

// Info about one hero.
const OneHero = (props) => (
    <div className={styles.details}>
        <HeroImage heroid={props.hero.id} hero={props.hero} />
        <div className="details-info-block">
            <article className="details-description">
                <span>
                    {props.hero.description}
                </span>
                <div className="icons-container">
                    <div className="icon-deck icon-text">
                        {props.hero.cardsNumber}
                    </div>
                    <div className="icon-text icon-heart icon-heart-description">
                        {props.hero.health}
                    </div>
                </div>
            </article>
            <CardsBlock heroId={props.hero.id} cards={props.hero.cards} hero={props.hero} />
        </div>
        <section className="heroselection-footer">
            <BackButton unselect={props.unselect} />
            <Play play={props.play} tabIndex="5" />
        </section>
    </div>
);

HeroImage.propTypes = {
    heroid: PropTypes.string.isRequired,
};

CardsBlock.propTypes = {
    cards: PropTypes.object.isRequired,
    hero: PropTypes.object.isRequired,
    heroId: PropTypes.string.isRequired,
};

CardPreview.propTypes = {
    card: PropTypes.object,
    hero: PropTypes.object.isRequired,
};

CardPreview.defaultProps = {
    card: undefined,
};

CardsRow.propTypes = {
    cards: PropTypes.object.isRequired,
    currentCard: PropTypes.string.isRequired,
    hero: PropTypes.object.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
    unselect: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
};

BackButton.propTypes = {
    unselect: PropTypes.func.isRequired,
};

Play.propTypes = {
    play: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
};

export default OneHero;
