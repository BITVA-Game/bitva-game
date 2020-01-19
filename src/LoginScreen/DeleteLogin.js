import React from 'react';
import PropTypes from 'prop-types';

function deleteAccount(sendMessage, toggleDelete, accId) {
    sendMessage({ type: 'DELETEACC', account: accId });
    toggleDelete();
}

const DeleteLogin = ({
    sendMessage, accId, accName, toggleDelete,
}) => (
    <div className="login-new-form">
        <h3>Account deletion</h3>
        <form onSubmit={() => deleteAccount(sendMessage, toggleDelete, accId)}>
            <p>{`Delete account ${accName}?`}</p>
            <p>
                All the statistics for this account will be deleted,
                including available heroes, cards and silver
            </p>
            <input type="submit" value="Delete" />
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
