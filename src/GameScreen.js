/* eslint-disable import/no-duplicates */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import './css/App.css';
import './css/GameScreen.css';

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { dragging: null };
        this.cardDragStarted = this.cardDragStarted.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.cardDragEnded = this.cardDragEnded.bind(this);
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

                {((this.props.app.game.players[0].moveCounter === 0) && (this.props.app.game.players[0].active === true))
                    || ((this.props.app.game.players[1].moveCounter === 0) && (this.props.app.game.players[1].active === true))
                    ? (
                        <ChangeTurn
                            players={this.props.app.game.players}
                        />
                    )
                    : null}

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
            {/* for pvp mode: if player is active and alive, the message is 'you win' */}
            {/* <p className="gameover-message">{activePlayer && activePlayer.health.current > 0 ? 'you win' : 'you lose'}</p> */}
            <p className="gameover-message">
                {activePlayer && activePlayer.health.current > 0 ? `${activePlayer.hero} wins` : `${activePlayer.hero} loses`}
            </p>
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
            <p className="changeturn-message">
                {activePlayer.hero}'s turn
            </p>
        </div>
    );
};

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
