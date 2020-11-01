import React, { useState } from 'react';
import PropTypes from 'prop-types';
import rules, { getActivePlayer } from '../rules';
import playSound from '../soundController';

const {
    card: cardConst,
    dragging: draggingConst,
    sound: soundConst,
    message,
} = require('../constants');

export function withBoardContext(GameScreen) {
    const Board = (props) => {
        const [dragging, setDragging] = useState(null);
        const cardAim = () => setDragging(null);
        const cardSelect = (key, card, mode) => {
            setDragging((prevDragging) => {
                if (prevDragging && mode === draggingConst.CLICKMODE) {
                    return null;
                }
                return { key, card, mode };
            });
        };
        const malachiteBox = () => {
            const activePlayer = getActivePlayer(props.app);
            // we define item of active player if any
            let itemActive;
            if (Object.keys(activePlayer.item) !== undefined) {
                itemActive = Object.values(activePlayer.item)[0];
            }

            // we define active player if she / he has Malachite box in item
            let playerWithMalachiteBox;
            if (itemActive && itemActive.category === cardConst.GENERATORCATEGORY) {
                playerWithMalachiteBox = activePlayer.hero;
            }
            // if active player has malachite box card
            // every other card drop calls animation of bat card
            if (itemActive && itemActive.category === cardConst.GENERATORCATEGORY
                && activePlayer.hero === playerWithMalachiteBox) {
                // this.playAnimation('bat');
                playSound(soundConst.ATTACKOPPONENT);
            }
        };
        const cardAct = (target) => {
            malachiteBox();
            props.sendMessage({
                type: message.ACTION,
                activeCard: dragging.key,
                target,
            });
            setDragging(null);
        };
        const isTarget = (target, player) => {
            const activePlayer = getActivePlayer(props.app);
            return rules(
                target,
                dragging,
                player.id === activePlayer.id,
                player,
            );
        };
        const cardDropped = (target, player) => {
            // we run malachite box function to check
            // this card and execute it if any
            malachiteBox();

            if (!isTarget(target, player)) {
                return;
            }
            cardAct(target);
        };
        const cardOver = (event, target, player) => {
            if (!isTarget(target, player)) {
                return;
            }
            event.preventDefault();
        };
        const value = {
            dragging,
            cardSelect,
            cardAct,
            isTarget,
            cardDropped,
            cardOver,
            cardAim,
        };
        return (
            <BoardContext.Provider value={value}>
                <GameScreen sendMessage={props.sendMessage} app={props.app} />
            </BoardContext.Provider>
        );
    };

    Board.propTypes = {
        app: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
    };

    return Board;
}

const BoardContext = React.createContext({});

export default BoardContext;
