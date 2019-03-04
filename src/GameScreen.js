/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import './css/App.css';
import './css/GameScreen.css';

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { dragging: null, changeTurn: true };
        this.cardDragStarted = this.cardDragStarted.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.cardDragEnded = this.cardDragEnded.bind(this);
        this.toggleTurn = this.toggleTurn.bind(this);
        this.toggleTurnState = this.toggleTurnState.bind(this);
    }

    cardDragEnded() {
        this.setState({
            dragging: null,
        });
    }

    cardDragStarted(key, card) {
        this.setState({
            dragging: { key, card },
        });
    }

    cardDropped(target) {
        console.log('Sending message');
        this.props.sendMessage({ type: 'ACTION', activeCard: this.state.dragging.key, target });

        this.setState({
            dragging: null,
        });
    }

    toggleTurn() {
        console.log('Toggling "state.changeTurn" in 3 sec');
        setTimeout(this.toggleTurnState, 3000);
    }

    toggleTurnState() {
        console.log('3 sec passed, state changed to false');
        // we could use it to change state to true when the turn changes
        this.setState(state => ({
            changeTurn: !state.changeTurn
        }));
    }

    render() {
        console.log('I AM RENDERING!');
        return (
            <div className="game-table app-background">
                {this.props.app.game.players.map(player => (
                    <Player
                        item={player.item}
                        key={player.hero}
                        position={player.position}
                        player={player}
                        sendMessage={this.props.sendMessage}
                        dragging={this.state.dragging}
                        cardDropped={this.cardDropped}
                        cardDragStarted={this.cardDragStarted}
                        cardDragEnded={this.cardDragEnded}
                    />
                ))}

                {/* this works only once since toggleTurn changes state to false and nothing changes it to true */}

                {this.state.changeTurn === true
                    ? (
                        <ChangeTurn
                            players={this.props.app.game.players}
                            toggleTurn={this.toggleTurn.call(this)}
                            toggleTurnState={this.toggleTurnState}
                        />
                    )
                    : null}

                {/* the block below works but looks ugly, to see it in action uncomment it and comment lines 73-81 */}

                {/* {(this.props.app.game.players[0].active === true) */}
                {/*     ? ( */}
                {/*         <ChangeTurn */}
                {/*             players={this.props.app.game.players} */}
                {/*             // turnMessage={this.turnMessage} */}
                {/*         /> */}
                {/*     ) */}
                {/*     : null} */}
                {/* {(this.props.app.game.players[1].active === true) */}
                {/*     ? ( */}
                {/*         <ChangeTurn */}
                {/*             players={this.props.app.game.players} */}
                {/*             // turnMessage={this.turnMessage} */}
                {/*         /> */}
                {/*     ) */}
                {/*     : null} */}
                {this.props.app.game.phase === 'OVER'
                    ? (
                        <GameOver
                            players={this.props.app.game.players}
                        />
                    )
                    : null}
            </div>
        );
    }
}

const GameOver = (props) => {
    let activePlayer = props.players[0];
    if (props.players[0].active === false) {
        activePlayer = props.players[1];
    }
    return (
        <div className="gameover">
            {/* if player is active and alive, the message is 'you win' */}
            <p className="gameover-message">{activePlayer && activePlayer.health.current > 0 ? 'you win' : 'you lose'}</p>
        </div>
    );
};

const ChangeTurn = (props) => {
    let activePlayer = props.players[0];
    if (props.players[0].active === false) {
        activePlayer = props.players[1];
    }
    return (
        <div className="changeturn">
            <p className="changeturn-message">{activePlayer.hero}'s turn</p>
        </div>
    );
}

GameScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

GameOver.propTypes = {
    players: PropTypes.array.isRequired,
};

ChangeTurn.propTypes = {
    players: PropTypes.array.isRequired,
};

export default GameScreen;
