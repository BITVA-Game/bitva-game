/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import BoardContext from './BoardContext';
import '../css/Cards.css';
import imagesCards from '../cardImages';

const { card: cardConst, dragging: draggingConst } = require('../constants');

export function backgroundImg(category) {
    if (category === cardConst.ATTACKITEMSCATEGORY || category === cardConst.ATTACKCATEGORY) {
        return imagesCards.backgroundAttack;
    } return imagesCards.backgroundCommon;
}

// eslint-disable-next-line consistent-return
export function iconImg(category, type) {
    switch (category) {
    case cardConst.ATTACKCATEGORY:
        return 'icon-attack';
    case cardConst.ATTACKITEMSCATEGORY:
    case cardConst.DAMAGECATEGORY:
    case cardConst.SUPRESSCATEGORY:
        return 'icon-damage';
    case cardConst.GENERATORCATEGORY:
    case cardConst.SHUFFLINGCATEGORY:
        return 'icon-move';
    case cardConst.HOLDCARDCATEGORY:
    case cardConst.HOLDTURNCATEGORY:
        return 'icon-hold';
    case cardConst.PANICCATEGORY:
    case cardConst.TURNINGCATEGORY:
        return 'icon-arrows';
    case cardConst.REFLECTCATEGORY:
        return 'icon-reflect';
    case cardConst.SHIELDCATEGORY:
        return 'icon-shield';
    case cardConst.SHOWCARDSCATEGORY:
        return 'icon-show';
    case cardConst.HEALCATEGORY:
        if (type === cardConst.ACTIONCARD) {
            return 'icon-heal';
        }
        if (type === cardConst.ITEMCARD) {
            return 'icon-heart';
        }
        break;
    default:
        return '';
    }
}

export function cardOrigin(dragging, card, from) {
    if (dragging !== null && card === dragging.card
        && (dragging.mode === draggingConst.DRAGMODE
            || from === draggingConst.FROMITEMFRAME)) {
        return { opacity: 0, transform: 'scale(1.0)' };
    }
    if (dragging !== null && card === dragging.card
        && dragging.mode === draggingConst.CLICKMODE) {
        return { transform: 'scale(1.1)' };
    }
    return { transform: 'scale(1.0)' };
}

const CardFront = (props) => {
    const {
        backgroundColor, type, category, categoryName,
        healthCurrent, health, points, initialpoints, id, name,
    } = props;
    const categoryTitle = categoryName === cardConst.SUPRESSCATEGORY ? 'suppress' : '';
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

const Card = ({
    active, card, cardKey, draggable, player, index,
}) => {
    const {
        id, name, info, type, disabled, panic, category,
        categoryName, healthCurrent, health, points, initialpoints,
    } = card;
    const { background } = player;
    const backgroundColor = type === cardConst.ITEMCARD ? `${background}-item` : `${background}-action`;
    const { cardSelect, cardAim, dragging } = useContext(BoardContext);
    const isDraggable = disabled === true || panic === true;
    const [flipped, setFlipped] = useState(false);

    function handleClick(event) {
        event.stopPropagation();
        // eslint-disable-next-line no-unused-expressions
        active && cardSelect(cardKey, card, draggingConst.CLICKMODE);
    }

    return (
        <>
            <div className="card-frame-wrapper">
                <div
                    className={`${active && !isDraggable ? 'card-frame' : ''} `}
                    style={cardOrigin(dragging, card, draggingConst.FROMITEMFRAME)}
                />
            </div>
            <div
                className="game-card-container card-place card-like"
                style={cardOrigin(dragging, card)}
            >
                <div
                    className={`card game-card card-like card${flipped ? '-flipped' : ''}`}
                    data-key={cardKey}
                    draggable={isDraggable ? null : draggable}
                    onDragStart={() => cardSelect(cardKey, card, draggingConst.DRAGMODE)}
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

                {index == 1 && draggable &&
                <div className="card-arrow-shield">               
                    <div className="indicator-shield"></div>
                    <div className="indicator-shield"></div>
                    <div className="indicator-shield"></div>
                    <div className="indicator-shield"></div>
                    <div className="indicator-shield"></div>
                </div>
                 }

                {index == 2 && draggable &&
                <div className="card-arrow">               
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                    <div className="indicator-attack-opp"></div>
                </div>
                 }


                {index == 0 && draggable &&
                <div className="card-arrow-heal">               
                    {/* <div className="indicator-heal"></div> */}
                    {/* <div className="indicator-heal"></div> */}
                    {/* <div className="indicator-heal"></div> */}
                    <div className="indicator-heal"></div>
                    <div className="indicator-heal"></div>
                    <div className="indicator-heal"></div>
                    <div className="indicator-heal"></div>
                    <div className="indicator-heal"></div>
                </div>
                 }
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
