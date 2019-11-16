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
            ${props.isTarget('item') ? 'target' : null}
            ${
    props.isTarget('itemOpponent')
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
                ? () => props.cardDropped('item', Object.keys(props.player.item))
                : props.item
                    ? () => props.cardDropped('itemOpponent')
                    : null
        }
        onClick={
            // eslint-disable-next-line no-nested-ternary
            props.active
                ? () => props.cardDropped('item', Object.keys(props.player.item))
                : props.item
                    ? () => props.cardDropped('itemOpponent')
                    : null
        }
        onDragOver={
            // eslint-disable-next-line no-nested-ternary
            props.active
                ? (e) => props.cardOver(e, 'item')
                : props.item
                    ? (e) => props.cardOver(e, 'itemOpponent')
                    : null
        }
    >
        {props.item ? (
            <Card
                card={props.item}
                player={props.player}
                cardKey={Object.keys(props.player.item)[0]}
                draggable={props.active}
                cardDragStarted={props.cardDragStarted}
                cardDragEnded={props.cardDragEnded}
            />
        ) : null}
    </div>
);

Item.propTypes = {
    player: PropTypes.object.isRequired,
    item: PropTypes.object,
    isTarget: PropTypes.func.isRequired,
    cardDragStarted: PropTypes.func,
    cardDragEnded: PropTypes.func,
    cardOver: PropTypes.func.isRequired,
    cardDropped: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
};

Item.defaultProps = {
    item: null,
    cardDragStarted: null,
    cardDragEnded: null,
};

export default Item;
