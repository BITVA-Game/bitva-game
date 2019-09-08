import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './css/App.css';
import './css/GameScreen.css';

function cardOrigin(dragging, card) {
    return dragging !== null && card === dragging.card ? 0 : 1.0;
}

const Hand = props => (
    <div className="hand">
        {Object.keys(props.hand).map(cardId => (
            <div
                key={cardId}
                className="card-place card-like"
                style={{ opacity: cardOrigin(props.dragging, props.hand[cardId]) }}
            >
                <Card
                    cardKey={cardId}
                    card={props.hand[cardId]}
                    draggable={props.active}
                    cardDragStarted={props.cardDragStarted}
                    cardDragEnded={props.cardDragEnded}
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
    cardDragEnded: PropTypes.func.isRequired,
    cardDragStarted: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

Hand.defaultProps = {
    dragging: null,
};

export default Hand;
