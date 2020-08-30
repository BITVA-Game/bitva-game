/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../css/GameScreen.css';
import BoardContext from './BoardContext';
import Card from './Card';
import playSound from '../soundController';

const { card: cardConst, target } = require('../constants');

const Item = (props) => {
    const {
        isTarget, cardDropped, cardOver,
    } = useContext(BoardContext);

    const cardDropToItem = (
        // eslint-disable-next-line no-nested-ternary
        props.active
            ? () => cardDropped(target.ITEMCARD, props.player)
            : props.item
                ? () => cardDropped(target.ITEMOPPONENT, props.player)
                : null
    );

    const firstSound = useRef(true);

    useEffect(() => {
        if (props.item
            && (props.item.id === cardConst.MAGICMIRRORCARD
                || props.item.id === cardConst.WATERDEADCARD)) {
            if (firstSound.current) {
                playSound(props.item.id);
                firstSound.current = false;
            }
        }
        if (!props.item) {
            firstSound.current = true;
        }
    }, [props.item, firstSound]);


    return (
        <div
            className={`item card-place card-like
                ${props.player.background}
                ${isTarget(target.ITEMCARD, props.player) ? 'target' : null}
                ${isTarget(target.ITEMOPPONENT, props.player)
                && props.item
                && props.item.category !== cardConst.SHIELDCATEGORY
            ? 'target'
            : null
        }
            `}
            id={props.active ? cardConst.ITEMCATEGORY : null}

            onDrop={cardDropToItem}
            onClick={cardDropToItem}
            onDragOver={
                // eslint-disable-next-line no-nested-ternary
                props.active
                    ? (e) => cardOver(e, target.ITEMCARD, props.player)
                    : props.item
                        ? (e) => cardOver(e, target.ITEMOPPONENT, props.player)
                        : null
            }
        >
            {props.item ? (

                <Card
                    card={props.item}
                    player={props.player}
                    cardKey={Object.keys(props.player.item)[0]}
                    draggable={props.active}
                    active={props.active}
                />

            ) : null}
        </div>
    );
};

Item.propTypes = {
    player: PropTypes.object.isRequired,
    item: PropTypes.object,
    active: PropTypes.bool.isRequired,
};

Item.defaultProps = {
    item: null,
};

export default Item;
