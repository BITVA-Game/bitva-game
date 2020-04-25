import React from 'react';
import PropTypes from 'prop-types';
import './css/Profile.css';

const { message, role } = require('./constants');

const SelectOpponent = ({ sendMessage }) => (
    <div className="profile-container app-background">
        <button
            type="button"
            onClick={() => sendMessage({ type: message.OPPONENT, account: role.GUEST })}
        >
          MAIN BUTTON
        </button>
    </div>
);


SelectOpponent.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default SelectOpponent;
