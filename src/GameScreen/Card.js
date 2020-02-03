/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';
import '../css/Cards.css';
import imagesCards from '../cardImages';

export function backgroundImg(category) {
    if (category === 'attackItems' || category === 'attack') {
        return imagesCards.backgroundAttack;
    } return imagesCards.backgroundCommon;
}

// eslint-disable-next-line consistent-return
export function iconImg(category, type) {
    switch (category) {
    case 'attack':
        return 'icon-attack';
    case 'attackItems':
    case 'damage':
    case 'suppress':
        return 'icon-damage';
    case 'generator':
    case 'shuffling':
        return 'icon-move';
    case 'holdCard':
    case 'holdTurn':
        return 'icon-hold';
    case 'panic':
    case 'turning':
        return 'icon-arrows';
    case 'reflect':
        return 'icon-reflect';
    case 'shield':
        return 'icon-shield';
    case 'showCards':
        return 'icon-show';
    case 'heal':
        if (type === 'action') {
            return 'icon-heal';
        }
        if (type === 'item') {
            return 'icon-heart';
        }
        break;
    default:
        return '';
    }
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
    const backgroundColor = type === 'item' ? `${background}-item` : `${background}-action`;
    const { cardSelect, cardAim, dragging } = useContext(BoardContext);
    const isDraggable = disabled === true || panic === true;
    const categoryTitle = categoryName === 'suppress' ? 'suppress' : '';

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
                className={`card game-card card-like ${backgroundColor}`}
                data-key={props.cardKey}
                draggable={isDraggable ? null : props.draggable}
                onDragStart={() => cardSelect(props.cardKey, props.card, 'drag')}
                onClick={handleClick}
                onDragEnd={cardAim}
            >
                {isDraggable ? <div className="card-chained" /> : null}
                <div className="card-header">
                    <div className={`card-icon-container game-card-icon-container ${backgroundColor}`}>
                        <div className={`card-icon game-card-icon ${iconImg(category, type)}`} />
                    </div>
                    <p className={`card-category game-card-category ${categoryTitle}`}>
                        {categoryName}
                    </p>
                    {initialpoints ? (
                        <div className={`card-points game-card-points ${backgroundColor}`}>
                            {points}
                        </div>
                    ) : null}
                    {health ? (
                        <div className={`card-health game-card-health ${backgroundColor}`}>
                            {healthCurrent}
                        </div>
                    ) : null}
                </div>
                <div className="game-card-image" style={{ backgroundImage: `url(${backgroundImg(category)})` }}>
                    <div className="game-card-image" style={{ backgroundImage: `url(${imagesCards[id]})` }} />
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
