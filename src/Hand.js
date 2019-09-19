import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './css/App.css';
import './css/GameScreen.css';

function cardOrigin(dragging, card) {
    return dragging !== null && card === dragging.card ? 0 : 1.0;
}

const AnimationPotion = props => (
    <div className="card-hand">
        <div className="card-like card-like" />
        {/* <div className={`deck card-like deck-${props.background} one`} /> */}
        <Card
            cardKey={props.cardKey}
            card={props.card}
            player={props.player}            
        />
    </div>
);

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
                <AnimationPotion
                    cardKey={cardId}
                    card={props.hand[cardId]}
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
