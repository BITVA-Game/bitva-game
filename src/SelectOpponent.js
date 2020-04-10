import React from 'react';
import PropTypes from 'prop-types';
import './css/Profile.css';

const { message, role } = require('./constants');

const SelectOpponent = (props) => (
    <div className="profile-container app-background">
        <button
            type="button"
            onClick={() => props.sendMessage({ type: message.OPPONENT, account: role.GUEST })}
        >
          MAIN BUTTON
        </button>
    </div>
);


SelectOpponent.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default SelectOpponent;
