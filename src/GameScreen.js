/* eslint-disable import/no-duplicates */
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
            </div>
        );
    }
}

GameScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default GameScreen;
