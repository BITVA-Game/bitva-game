/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-duplicates */

import React from 'react';
import PropTypes from 'prop-types';

import '../css/Cards.css';

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
import forestMushroom from '../images/cards/mushrooms.jpg';
import horsemanBlack from '../images/cards/blackrider.jpg';
import horsemanRed from '../images/cards/redrider.jpg';
import horsemanWhite from '../images/cards/whiterider.jpg';
import kikimora from '../images/cards/bitva-cardbase.jpg';
import lizard from '../images/cards/lizard.jpg';
import magicTree from '../images/cards/tree.jpg';
import magicMirror from '../images/cards/bitva-cardbase.jpg';
import malachiteBox from '../images/cards/malachitebox.jpg';
import mortar from '../images/cards/bitva-cardbase.jpg';
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

function cardClass(type, background, dragging) {
    if (!dragging && type === 'item') {
        return `card game-card card-like ${background}-item`;
    }
    if (!dragging && type !== 'item') {
        return `card game-card card-like ${background}-action`;
    }
    return `card game-card card-like ${background}-item`;
}

const Card = (props) => {
    const {
        id, name, type, disabled, panic, category,
        categoryName, healthCurrent, health, points, initialpoints,
    } = props.card;
    const { background, turningHand } = props.player;
    return (
        <div
            className={`${cardClass(type, background, false)} ${
                props.active !== true && turningHand === true
                    ? 'card-dark'
                    : null
            }`}
            data-key={props.cardKey}
            draggable={
                disabled === true || panic === true
                    ? null
                    : props.draggable
            }
            onDragStart={() => props.cardSelect(props.cardKey, props.card, 'drag')}
            onClick={() => props.active && props.cardSelect(props.cardKey, props.card, 'click')}
            onDragEnd={props.cardDragEnded}
        >
            {disabled === true || panic === true ? (
                <div className="card-chained" />
            ) : null}
            <div className="card-header">
                <div
                    className={`card-icon-container game-card-icon-container ${
                        type === 'item'
                            ? `${background}-item`
                            : `${background}-action`
                    }`}
                >
                    <div
                        className={`card-icon game-card-icon
                        ${category === 'attack' ? 'icon-attack' : null}
                        ${category === 'attackItems' ? 'icon-damage' : null}
                        ${category === 'damage' ? 'icon-damage' : null}
                        ${category === 'generator' ? 'icon-move' : null}
                        ${category === 'heal'
                        && type === 'action' ? 'icon-heal' : null}
                        ${category === 'heal'
                        && type === 'item' ? 'icon-heart' : null}
                        ${category === 'holdCard' ? 'icon-hold' : null}
                        ${category === 'holdTurn' ? 'icon-hold' : null}
                        ${category === 'panic' ? 'icon-arrows' : null}
                        ${category === 'reflect' ? 'icon-reflect' : null}
                        ${category === 'shield' ? 'icon-shield' : null}
                        ${category === 'showCards' ? 'icon-show' : null}
                        ${category === 'shuffling' ? 'icon-move' : null}
                        ${category === 'suppress' ? 'icon-damage' : null}
                        ${category === 'turning' ? 'icon-arrows' : null}`}
                    />
                </div>
                <p
                    className={`card-category game-card-category ${
                        categoryName === 'suppress' ? 'suppress' : null
                    }`}
                >
                    {categoryName}
                </p>
                {initialpoints ? (
                    <div
                        className={`card-points game-card-points
                            ${
                    type === 'item'
                        ? `${background}-item`
                        : `${background}-action`
                    }`}
                    >
                        {points}
                    </div>
                ) : null}
                {health ? (
                    <div
                        className={`card-health game-card-health
                            ${
                    type === 'item'
                        ? `${background}-item`
                        : `${background}-action`
                    }`}
                    >
                        {healthCurrent}
                    </div>
                ) : null}
            </div>
            <div
                className="game-card-image"
                style={{
                    backgroundImage: `url(${imagesCards[id]})`,
                    backgroundSize: '100% 100%',
                }}
            />
            <div className="card-footer game-card-footer">
                <p>{name}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    active: PropTypes.bool.isRequired,
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool,
    cardKey: PropTypes.string,
    cardSelect: PropTypes.func,
    cardDragEnded: PropTypes.func,
    player: PropTypes.object.isRequired,
};

Card.defaultProps = {
    draggable: null,
    cardKey: null,
    cardSelect: null,
    cardDragEnded: null,
};


export default Card;
