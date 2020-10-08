/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import React, { Component } from 'react';
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

const { phase: phaseConst } = require('../constants');

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: '',
        };
        this.playableHand = this.playableHand.bind(this);
        this.startSound = this.startSound.bind(this);
    }

    componentDidUpdate(prevProps) {
        const actionType = this.props.app.game.lastAction.type;
        if (this.state.sound === '' && getActivePlayer(this.props.app).moveCounter !== getActivePlayer(prevProps.app).moveCounter) {
            this.startSound(actionType);
        } if (this.state.sound !== '') {
            playSound(actionType, this.props.app.settings.soundOn);
            setTimeout(() => {
                this.setState({ sound: '' });
            }, 1000);
        }
    }

    startSound(actionType) {
        this.setState({ sound: actionType });
    }

    playableHand(player) {
        const activePlayer = getActivePlayer(this.props.app);
        const inactivePlayer = getInActivePlayer(this.props.app);
        if (player === activePlayer && activePlayer.turningHand === true) {
            return inactivePlayer.hand;
        }
        if (player === activePlayer && activePlayer.turningHand === false) {
            return activePlayer.hand;
        }
        return inactivePlayer.hand;
    }

    render() {
        const activePlayer = getActivePlayer(this.props.app);
        const inactivePlayer = getInActivePlayer(this.props.app);
        return (
            <>
                <div className="game-table app-background">
                    {this.props.app.game.players.map((player) => (
                        <Player
                            active={player.id === activePlayer.id}
                            key={player.keyHero}
                            player={player}
                            activePlayer={activePlayer}
                            inactivePlayer={inactivePlayer}
                            hand={this.playableHand(player)}
                            sendMessage={this.props.sendMessage}
                            gamePhase={this.props.app.game.phase}
                        />
                    ))}
                    {activePlayer.moveCounter === 0
                    && activePlayer.health.current > 0
                        ? (<ChangeTurn app={this.props.app} />
                        ) : null}

                    {this.props.app.game.phase === phaseConst.OVER ? (
                        <GameOver app={this.props.app} />
                    ) : <BirdsAnimation />}
                    <SnowAnimation />
                </div>
                <MainMenu sendMessage={this.props.sendMessage} game />
            </>
        );
    }
}

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
