import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../css/App.css';
import '../css/GameScreen.css';

function handClass(active, player) {
    let potion;
    // eslint-disable-next-line no-unused-expressions
    player.turningHand === true ? potion = true : null;
    if (potion && active === false) {
        return 'hand no-hand';
    }
    if (potion && active) {
        return 'hand hand-await';
    }
    return 'hand';
}

const Hand = (props) => (
    <div className={`${handClass(props.active, props.player)}`}>
        {Object.keys(props.hand).map((cardId, index) => (
            <div className={`animated-card-${index}`}>
                <Card
                    key={cardId}
                    active={props.active}
                    cardKey={cardId}
                    card={props.hand[cardId]}
                    draggable={props.active}
                    player={props.player}
                />
            </div>
        ))}
    </div>
);

Hand.propTypes = {
    active: PropTypes.bool.isRequired,
    hand: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
};


export default Hand;
