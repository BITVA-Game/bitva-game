/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import './css/App.css';
import './css/GameScreen.css';

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null, dragging: null, type: null };
        this.cardDragStarted = this.cardDragStarted.bind(this);
        this.cardDropped = this.cardDropped.bind(this);
        this.cardDragEnded = this.cardDragEnded.bind(this);
    }

    cardDragEnded(event) {
        this.setState({
            dragging: null,
        });
    }

    cardDragStarted(keyCard, type) {
        this.setState({
            dragging: keyCard,
            item: null,
            type: type,
        });
    }

    cardDropped(target, card) {
        console.log('Sending message');
        if (target === 'item') {
            this.setState({
                item: card,
            });
        }
        this.props.sendMessage({ type: 'ACTION', activeCard: this.state.dragging, target });

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
