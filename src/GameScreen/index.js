/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import MainMenu from '../MainMenu';
import '../css/App.css';
import '../css/GameScreen.css';
import '../css/SnowAnimation.css';
import { getActivePlayer, getInActivePlayer, getActivePlayerName } from '../rules';
import { withBoardContext } from './BoardContext';
import playSound from '../soundController';
import BirdsAnimation from './AnimationBirds';
import usePrevious from './usePrevious';

const { phase: phaseConst } = require('../constants');

const GameScreen = ({ sendMessage, app }) => {
    const [sound, setSound] = useState('');
    const activePlayer = getActivePlayer(app);
    const inactivePlayer = getInActivePlayer(app);
    const prevMoveCounter = usePrevious(activePlayer.moveCounter);
    const actionType = app.game.lastAction.type;

    useEffect(() => {
        if (sound === '' && prevMoveCounter !== activePlayer.moveCounter) {
            setSound(actionType);
        } if (sound !== '') {
            playSound(actionType);
            setTimeout(() => {
                setSound('');
            }, 1000);
        }
    }, [activePlayer.moveCounter, sound, actionType, prevMoveCounter]);

    const playableHand = (player) => {
        if (player === activePlayer && activePlayer.turningHand === true) {
            return inactivePlayer.hand;
        }
        if (player === activePlayer && activePlayer.turningHand === false) {
            return activePlayer.hand;
        }
        return inactivePlayer.hand;
    };

    return (
        <>
            <div className="game-table app-background">
                {app.game.players.map((player) => (
                    <Player
                        active={player.id === activePlayer.id}
                        key={player.keyHero}
                        player={player}
                        activePlayer={activePlayer}
                        inactivePlayer={inactivePlayer}
                        hand={playableHand(player)}
                        sendMessage={sendMessage}
                        gamePhase={app.game.phase}
                    />
                ))}
                {activePlayer.moveCounter === 0
                && activePlayer.health.current > 0
                    ? (<ChangeTurn app={app} />
                    ) : null}

                {app.game.phase === phaseConst.OVER ? (
                    <GameOver app={app} />
                ) : <BirdsAnimation />}
                <SnowAnimation />
            </div>
            <MainMenu sendMessage={sendMessage} game />
        </>
    );
};

const GameOver = ({ app }) => {
    const activePlayer = getActivePlayer(app);
    const activePlayerName = getActivePlayerName(app);
    return (
        <div className="gameover">
            {/* for pvp mode: if player is active and alive, the message is 'you win' */}
            {/* <p className="gameover-message">{activePlayer && activePlayer.health.current > 0 ? 'you win' : 'you lose'}</p> */}
            <p className="gameover-message">
                {activePlayer && activePlayer.health.current > 0
                    ? `${activePlayerName} wins`
                    : `${activePlayerName} loses`}
            </p>
        </div>
    );
};

const ChangeTurn = ({ app }) => (
    <div className="changeturn">
        <p className="changeturn-message">
            {`${getActivePlayerName(app)}'s turn`}
        </p>
    </div>
);

const SnowAnimation = () => (
    <>
        <div className="snow layer1" />
        <div className="snow layer1 a" />
        <div className="snow layer2" />
        <div className="snow layer2 a" />
        <div className="snow layer3" />
        <div className="snow layer3 a" />
    </>
);
GameScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

GameOver.propTypes = {
    app: PropTypes.object.isRequired,
};

ChangeTurn.propTypes = {
    app: PropTypes.object.isRequired,
};

export default withBoardContext(GameScreen);
