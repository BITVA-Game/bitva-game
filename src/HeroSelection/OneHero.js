/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';
import '../css/Cards.css';
import imagesCards from '../cardImages';

import { backgroundImg, iconImg } from '../GameScreen/Card';

import heart from '../images/icons/heart_red.png';

import yaga from '../images/heroes/yaga_full.jpg';
import morevna from '../images/heroes/morevna_full.jpg';
import hozyaika from '../images/heroes/hozyaika_full.jpg';
import premudraya from '../images/heroes/premudraya_full.jpg';

const { card: cardConst } = require('../constants');

const images = {
    yaga,
    morevna,
    hozyaika,
    premudraya,
};

const HeroImage = (props) => (
    <div className="details-hero">
        <div className="details-hero-avatar">
            <img src={`${images[props.heroid]}`} style={{ height: '100%', width: '100%' }} alt={props.heroid} />
        </div>
    </div>
);

const CardPreview = (props) => {
    const cardTypeBackground = props.card.type === cardConst.ITEMCARD ? `${props.hero.background}-item` : `${props.hero.background}-action`;

    return (
        <div className={`card details-card ${cardTypeBackground}`}>
            <div className="card-header">
                <div className={`card-icon-container details-card-icon-container ${cardTypeBackground}`}>
                    <div className={`card-icon details-card-icon ${iconImg(props.card.category, props.card.type)}`} />
                </div>
                <p className="card-category details-card-category">{props.card.categoryName}</p>
                {props.card.initialpoints
                    ? (
                        <div className={`card-points details-card-points ${cardTypeBackground}`}>
                            {props.card.initialpoints}
                        </div>
                    ) : null}
                {props.card.health
                    ? (
                        <div className={`card-health details-card-health ${cardTypeBackground}`}>
                            {props.card.health}
                        </div>
                    ) : null}
            </div>
            <div
                className="details-card-image"
                style={{
                    backgroundImage: `url(${backgroundImg(props.card.category)})`,
                    backgroundSize: '100% 100%',
                }}
            >
                <div
                    className="details-card-image"
                    style={{
                        backgroundImage: `url(${imagesCards[props.card.id]})`,
                        backgroundSize: '100% 100%',
                    }}
                />
            </div>
            <div className="card-footer details-card-footer">
                <p>{props.card.name}</p>
            </div>
        </div>
    );
};

const CardsRow = (props) => (
    <>
        <CardPreview card={props.cards[props.currentCard]} hero={props.hero} />
        <div className="card-description">
            <div>{props.cards[props.currentCard].description}</div>
            <div className="card-description-amount">
                <div>X</div>
                <div className={`icon-deck icon-text icon-deck-${props.hero.background}`}>{props.cards[props.currentCard].count}</div>
            </div>
        </div>
    </>
);

const Play = (props) => (
    <div className="btn btn-play" role="button" onClick={props.play} onKeyPress={props.play} tabIndex={props.tabIndex}>
        PLAY
    </div>
);

const BackButton = ({ unselect }) => (
    <div className="btn btn-back" role="button" onClick={unselect} onKeyPress={unselect} tabIndex="10">
        <svg className="btn-back-arrow" viewBox="0 0 24 24">
            <path fill="none" stroke="#000" strokeWidth="2" d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z" />
        </svg>
    </div>
);

const CardsBlock = (props) => {
    const [cardIndex, setCardIndex] = useState(0);
    // get the array of all cards of current character
    const deck = Object.keys(props.cards);
    const changeRowNext = () => {
        const maxRotation = deck.length - 1;
        const currentRow = cardIndex;
        if (currentRow === maxRotation) {
            setCardIndex(0);
        } else {
            setCardIndex(currentRow + 1);
        }
    };
    const changeRowPrev = () => {
        const minRotation = 0;
        const currentRow = cardIndex;
        if (currentRow === minRotation) {
            setCardIndex(deck.length - 1);
        } else {
            setCardIndex(currentRow - 1);
        }
    };

    return (
        <div className="details-cards-container">
            <div className="details-cards">
                <CardsRow heroId={props.heroId} currentCard={deck[cardIndex]} cards={props.cards} hero={props.hero} />
            </div>
            <div className="details-cards-buttons">
                <div className="btn cards-btn" role="button" onClick={changeRowPrev} onKeyPress={changeRowPrev} tabIndex="5">
                    ◀
                </div>
                <div className="btn cards-btn" role="button" onClick={changeRowNext} onKeyPress={changeRowPrev} tabIndex="6">
                    ▶
                </div>
            </div>
        </div>
    );
};

// Info about one hero.
const OneHero = (props) => (
    <div className="content-container">
        <div className="main-content heroselection-details">
            <HeroImage heroid={props.hero.id} hero={props.hero} />
            <div className="details-info-block">
                <div className="details-description-container">
                    <div className="details-info">
                        <div className="details-health-container">
                            <img className="details-health" src={heart} alt="" />
                            <div className="details-health-text">{props.hero.health}</div>
                        </div>
                        <div className={`icon-deck icon-text icon-deck-${props.hero.background}`}>
                            {props.hero.cardsNumber}
                        </div>
                    </div>
                    <div className="details-description">
                        {props.hero.description}
                    </div>
                </div>
                <CardsBlock heroId={props.hero.id} cards={props.hero.cards} hero={props.hero} />
            </div>
        </div>
        <footer className="main-footer main-footer-hs heroselection-footer">
            <BackButton unselect={props.unselect} />
            {props.isAvailable ? <Play play={props.play} tabIndex="5" /> : null}
        </footer>
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
    isAvailable: PropTypes.bool.isRequired,
};

BackButton.propTypes = {
    unselect: PropTypes.func.isRequired,
};

Play.propTypes = {
    play: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
};

export default OneHero;
