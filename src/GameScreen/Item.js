/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/GameScreen.css';
import BoardContext from './BoardContext';
import Card from './Card';

const Item = (props) => {
    const { isTarget, cardDropped, cardOver, cardSelect } = useContext(BoardContext);
    return (
        <div
            className={`item card-place card-like
                ${props.player.background}
                ${isTarget('item', props.player) ? 'target' : null}
                ${isTarget('itemOpponent', props.player)
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
                    ? () => cardDropped('item', props.player)
                    : props.item
                        ? () => cardDropped('itemOpponent', props.player)
                        : null
            }
            onClick={
                // eslint-disable-next-line no-nested-ternary
                props.active
                    ? props.item
                        ? () => cardSelect(Object.keys(props.player.item)[0], props.item, 'click')
                        : () => cardDropped('item', props.player)
                    : props.item
                        ? () => cardDropped('itemOpponent', props.player)
                        : null
                // props.active
                //     ? () => cardDropped('item', props.player) || (props.item && cardSelect(Object.keys(props.player.item)[0], props.item, 'click'))
                //     : props.item
                //         ? () => cardDropped('itemOpponent', props.player)
                //         : null
            }
            onDragOver={
                // eslint-disable-next-line no-nested-ternary
                props.active
                    ? (e) => cardOver(e, 'item', props.player)
                    : props.item
                        ? (e) => cardOver(e, 'itemOpponent', props.player)
                        : null
            }
        >
            {props.item ? (
                <Card
                    card={props.item}
                    player={props.player}
                    cardKey={Object.keys(props.player.item)[0]}
                    draggable={props.active}
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
