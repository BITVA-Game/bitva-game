/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
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

export function cardOrigin(dragging, card, from) {
    if ((dragging !== null && card === dragging.card && dragging.mode === 'drag')
        || (dragging !== null && card === dragging.card && from === 'itemFrame')) {
        return { opacity: 0, transform: 'scale(1.0)' };
    }
    if (dragging !== null && card === dragging.card && dragging.mode === 'click') {
        return { opacity: 1.0, transform: 'scale(1.1)' };
    }
    return { opacity: 1.0, transform: 'scale(1.0)' };
}

const CardFront = (props) => {
    const {
        backgroundColor, type, category, categoryName,
        healthCurrent, health, points, initialpoints, id, name,
    } = props;
    const categoryTitle = categoryName === 'suppress' ? 'suppress' : '';
    return (
        <div className={`game-card-front ${backgroundColor}`}>
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
    );
};

const CardBack = ({ backgroundColor, info, name }) => (
    <div className={`game-card-back ${backgroundColor}`}>
        <div className="card-info">
            {info}
        </div>
        <div className="card-footer game-card-footer">
            <p>{name}</p>
        </div>
    </div>
);

const Card = (props) => {
    const {
        id, name, info, type, disabled, panic, category,
        categoryName, healthCurrent, health, points, initialpoints,
    } = props.card;
    const { background } = props.player;
    const backgroundColor = type === 'item' ? `${background}-item` : `${background}-action`;
    const { cardSelect, cardAim, dragging } = useContext(BoardContext);
    const isDraggable = disabled === true || panic === true;
    const [flipped, setFlipped] = useState(false);

    function handleClick(event) {
        event.stopPropagation();
        // eslint-disable-next-line no-unused-expressions
        props.active && cardSelect(props.cardKey, props.card, 'click');
    }

    return (
        <>
            <div className="card-frame-wrapper">
                <div
                    className={`${props.active && !isDraggable ? 'card-frame' : ''} `}
                    style={cardOrigin(dragging, props.card, 'itemFrame')}
                />
            </div>
            <div
                className="game-card-container card-place card-like"
                style={cardOrigin(dragging, props.card)}
            >
                <div
                    className={`card game-card card-like card${flipped ? '-flipped' : ''}`}
                    data-key={props.cardKey}
                    draggable={isDraggable ? null : props.draggable}
                    onDragStart={() => cardSelect(props.cardKey, props.card, 'drag')}
                    onClick={handleClick}
                    onDragEnd={cardAim}
                    onContextMenu={() => setFlipped(!flipped)}
                >
                    {isDraggable ? <div className="card-chained" /> : null}
                    {flipped ? (
                        <CardBack
                            backgroundColor={backgroundColor}
                            info={info}
                            name={name}
                        />
                    ) : (
                        <CardFront
                            backgroundColor={backgroundColor}
                            type={type}
                            category={category}
                            categoryName={categoryName}
                            healthCurrent={healthCurrent}
                            health={health}
                            points={points}
                            initialpoints={initialpoints}
                            id={id}
                            name={name}
                        />
                    )}
                </div>
            </div>
        </>
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

CardFront.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    healthCurrent: PropTypes.number,
    health: PropTypes.number,
    points: PropTypes.number,
    initialpoints: PropTypes.number,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

CardFront.defaultProps = {
    healthCurrent: undefined,
    health: undefined,
    points: undefined,
    initialpoints: undefined,
};

CardBack.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Card;
