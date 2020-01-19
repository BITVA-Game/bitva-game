import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Profile.css';

class SelectOpponent extends Component {
    render() {
        return (
            <div className="profile-container app-background">
                <button
                    onClick={() => this.props.sendMessage({ type: 'OPPONENT', account: 'guest' })}
                >
          MAIN BUTTON
                </button>
            </div>
        );
    }
}

SelectOpponent.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default SelectOpponent;
