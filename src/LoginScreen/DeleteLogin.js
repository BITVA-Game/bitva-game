import React from 'react';
import PropTypes from 'prop-types';

const { message } = require('../constants');

function deleteAccount(sendMessage, toggleDelete, accId) {
    sendMessage({ type: message.DELETEACC, account: accId });
    toggleDelete();
}

const DeleteLogin = ({
    sendMessage, accId, accName, toggleDelete,
}) => (
    <div className="login-new-form">
        <h3>Account deletion</h3>
        <form onSubmit={() => deleteAccount(sendMessage, toggleDelete, accId)}>
            <p className="warning">{`Delete account ${accName}?`}</p>
            <div className="warning-container">
                <div className="warning-sign">!</div>
                <div className="warning-text">
                    All the statistics for this account will be deleted,
                    including available heroes, cards and silver
                </div>
            </div>
            <div className="login-buttons">
                <input className="login-button button-red" type="submit" value="Delete" />
                <input className="login-button" type="button" value="Cancel" onClick={() => toggleDelete()} />
            </div>
        </form>
    </div>
);

DeleteLogin.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    toggleDelete: PropTypes.func.isRequired,
    accId: PropTypes.string.isRequired,
    accName: PropTypes.string.isRequired,
};

export default DeleteLogin;
