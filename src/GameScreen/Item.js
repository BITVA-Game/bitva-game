/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../css/GameScreen.css';

import Card from './Card';

const Item = (props) => (
    <div
        className={`item card-place card-like
            ${props.player.background}
            ${props.isTarget('item', props.player) ? 'target' : null}
            ${
    props.isTarget('itemOpponent', props.player)
              && props.item
              && props.item.category !== 'shield'
        ? 'target'
        : null
    }
        `}
        id={props.active ? 'item' : null}
        onDrop={
            // eslint-disable-next-line no-nested-ternary
            props.active
                ? () => props.cardDropped('item', props.player)
                : props.item
                    ? () => props.cardDropped('itemOpponent', props.player)
                    : null
        }
        onClick={
            // eslint-disable-next-line no-nested-ternary
            props.active
                ? () => props.cardDropped('item', props.player)
                : props.item
                    ? () => props.cardDropped('itemOpponent', props.player)
                    : null
        }
        onDragOver={
            // eslint-disable-next-line no-nested-ternary
            props.active
                ? (e) => props.cardOver(e, 'item', props.player)
                : props.item
                    ? (e) => props.cardOver(e, 'itemOpponent', props.player)
                    : null
        }
    >
        {props.item ? (
            <Card
                card={props.item}
                player={props.player}
                cardKey={Object.keys(props.player.item)[0]}
                draggable={props.active}
                cardSelect={props.cardSelect}
                cardAim={props.cardAim}
            />
        ) : null}
    </div>
);

Item.propTypes = {
    player: PropTypes.object.isRequired,
    item: PropTypes.object,
    isTarget: PropTypes.func.isRequired,
    cardSelect: PropTypes.func,
    cardAim: PropTypes.func,
    cardOver: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
};

Item.defaultProps = {
    item: null,
    cardSelect: null,
    cardAim: null,
};

export default Item;
