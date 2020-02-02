/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';
import '../css/Cards.css';
import imagesCards from '../cardImages';

function cardClass(type, background, dragging) {
    if (!dragging && type === 'item') {
        return `card game-card card-like ${background}-item`;
    }
    if (!dragging && type !== 'item') {
        return `card game-card card-like ${background}-action`;
    }
    return `card game-card card-like ${background}-item`;
}
export function backgroundImg(category) {
    if (category === 'attackItems' || category === 'attack') {
        return imagesCards.backgroundAttack;
    } return imagesCards.backgroundCommon;
}

export function cardOrigin(dragging, card) {
    if (dragging !== null && card === dragging.card && dragging.mode === 'drag') {
        return { opacity: 0, transform: 'scale(1.0)' };
    }
    if (dragging !== null && card === dragging.card && dragging.mode === 'click') {
        return { opacity: 1.0, transform: 'scale(1.2)' };
    }
    return { opacity: 1.0, transform: 'scale(1.0)' };
}

const Card = (props) => {
    const {
        id, name, type, disabled, panic, category,
        categoryName, healthCurrent, health, points, initialpoints,
    } = props.card;
    const { background } = props.player;
    const { cardSelect, cardAim, dragging } = useContext(BoardContext);

    function handleClick(event) {
        event.stopPropagation();
        props.active && cardSelect(props.cardKey, props.card, 'click');    
    }

    return (
        <div
            className="card-place card-like"
            style={cardOrigin(dragging, props.card)}
        >
            <div
                className={`${cardClass(type, background, false)}`}
                data-key={props.cardKey}
                draggable={
                    disabled === true || panic === true
                        ? null
                        : props.draggable
                }
                onDragStart={() => cardSelect(props.cardKey, props.card, 'drag')}
                onClick={handleClick}
                onDragEnd={cardAim}
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
                        backgroundImage: `url(${backgroundImg(category)})`,
                        backgroundSize: '100% 100%',
                    }}
                >
                    <div
                        className="game-card-image"
                        style={{
                            backgroundImage: `url(${imagesCards[id]})`,
                            backgroundSize: '100% 100%',
                        }}
                    />
                </div>
                <div className="card-footer game-card-footer">
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    active: PropTypes.bool.isRequired,
    card: PropTypes.object.isRequired,
    draggable: PropTypes.bool,
    cardKey: PropTypes.string,
    player: PropTypes.object.isRequired,
};

Card.defaultProps = {
    draggable: null,
    cardKey: null,
};


export default Card;
