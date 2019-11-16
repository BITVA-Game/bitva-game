/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import '../css/App.css';
import '../css/GameScreen.css';
import { getActivePlayer, getInActivePlayer } from '../rules';

// animation duration time
const animationDuration = 9000;

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: null,
            animation: null,
        };
        this.cardSelect = this.cardSelect.bind(this);
        this.cardAct = this.cardAct.bind(this);
        this.cardAim = this.cardAim.bind(this);
        this.startBirds = this.startBirds.bind(this);
        this.playableHand = this.playableHand.bind(this);
    }

    componentDidMount() {
        this.setState({ animation: 'background' });
        setTimeout(() => {
            this.setState({ animation: null });
        }, 1000);

        this.startBirds();
    }

    componentDidUpdate() {
        if (this.state.animation === 'birds') {
            setTimeout(() => {
                this.setState({ animation: null });
            }, animationDuration);
            clearInterval(this.birdsInterval);
            this.startBirds();
        }
    }

    componentWillUnmount() {
        clearInterval(this.birdsInterval);
    }

    cardAim() {
        console.log('I am in GameScreen');
        this.setState({
            dragging: null,
        });
    }

    cardSelect(key, card, mode) {
        this.setState((oldState) => {
            if (oldState.dragging && mode === 'click') {
                return { dragging: null };
            }
            return { dragging: { key, card, mode } };
        });
    }

    cardAct(target) {
        this.props.sendMessage({
            type: 'ACTION',
            activeCard: this.state.dragging.key,
            target,
        });

        this.setState({
            dragging: null,
        });
    }

    startBirds() {
    // min time delay to start animation
        const minStart = 60000;
        // max time delay to start animation
        const maxStart = 180000;
        // random time delay to start animation between mmin and max values
        const animationStart = Math.floor(Math.random() * (maxStart - minStart + 1)) + minStart;
        // console.log('birds animation starts in', animationStart / 60000);
        this.birdsInterval = setInterval(() => {
            this.setState({ animation: 'birds' });
        }, animationDuration + animationStart);
    }

    playableHand(player) {
        const activePlayer = getActivePlayer(this.props.app);
        const inactivePlayer = getInActivePlayer(this.props.app);
        // const ind = num === 0 ? 1 : 0;
        // console.log(ind);
        if (player === activePlayer && activePlayer.turningHand === true) {
            console.log('TURNING POTION! playableHand   - opponent hand!');
            return inactivePlayer.hand;
        }
        if (player === activePlayer && activePlayer.turningHand === false) {
            // console.log('playableHand   - player hand!');
            return activePlayer.hand;
        }
        return inactivePlayer.hand;
    }

    render() {
        console.log('app game: ', this.props.app.game);
        const activePlayer = getActivePlayer(this.props.app);
        return this.state.animation === 'background' ? (
            <BackgroundAnimation />
        ) : (
            <div className="game-table app-background">
                {this.props.app.game.players.map((player) => (
                    <Player
                        active={player.id === activePlayer.id}
                        key={player.keyHero}
                        player={player}
                        activePlayer={activePlayer}
                        hand={this.playableHand(player)}
                        sendMessage={this.props.sendMessage}
                        dragging={this.state.dragging}
                        cardAct={this.cardAct}
                        cardSelect={this.cardSelect}
                        cardAim={this.cardAim}
                    />
                ))}
                {activePlayer.moveCounter === 0
                && activePlayer.health.current > 0
                    ? (<ChangeTurn app={this.props.app} />
                    ) : null}

                {this.props.app.game.phase === 'OVER' ? (
                    <GameOver app={this.props.app} />
                ) : null}
                {this.state.animation === 'birds' ? <BirdsAnimation /> : null}
            </div>
        );
    }
}

const BackgroundAnimation = () => <div className="game-screen-animation" />;

const BirdsAnimation = () => (
    <div className="animation-game-screen">
        <div className="bird-container bird-container-one">
            <div className="bird bird-one" />
        </div>
        <div className="bird-container bird-container-two">
            <div className="bird bird-two" />
        </div>
        <div className="bird-container bird-container-three">
            <div className="bird bird-three" />
        </div>
    </div>
);

const GameOver = (props) => {
    const activePlayer = getActivePlayer(props.app);
    return (
        <div className="gameover">
            {/* for pvp mode: if player is active and alive, the message is 'you win' */}
            {/* <p className="gameover-message">{activePlayer && activePlayer.health.current > 0 ? 'you win' : 'you lose'}</p> */}
            <p className="gameover-message">
                {activePlayer && activePlayer.health.current > 0
                    ? `${activePlayer.hero} wins`
                    : `${activePlayer.hero} loses`}
            </p>
        </div>
    );
};

const ChangeTurn = ({ app }) => (
    <div className="changeturn">
        <p className="changeturn-message">
            {`${getActivePlayer(app).hero}'s turn`}
        </p>
    </div>
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

export default GameScreen;
