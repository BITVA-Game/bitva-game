import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../css/App.css';
import '../css/GameScreen.css';

function cardOrigin(dragging, card) {
    if (dragging !== null && card === dragging.card && dragging.mode === 'drag') {
        return { opacity: 0, transform: 'scale(1.0)' };
    }
    if (dragging !== null && card === dragging.card && dragging.mode === 'click') {
        return { opacity: 1.0, transform: 'scale(1.2)' };
    }
    return { opacity: 1.0, transform: 'scale(1.0)' };
}

const Hand = (props) => (
    <div className={`hand ${props.player.turningHand === true && props.active === false ? 'no-hand' : null}`}>
        {Object.keys(props.hand).map((cardId) => (
            <div
                key={cardId}
                className="card-place card-like"
                style={cardOrigin(props.dragging, props.hand[cardId])}
            >
                <Card
                    active={props.active}
                    cardKey={cardId}
                    card={props.hand[cardId]}
                    draggable={props.active}
                    cardSelect={props.cardSelect}
                    cardAim={props.cardAim}
                    player={props.player}
                />
            </div>
        ))}
    </div>
);

Hand.propTypes = {
    dragging: PropTypes.object,
    active: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
    cardAim: PropTypes.func.isRequired,
    cardSelect: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

Hand.defaultProps = {
    dragging: null,
};

export default Hand;
