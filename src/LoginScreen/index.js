import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/LoginScreen.css';
import Login from './Login';

const Header = () => (
    <header className="login-header">Select Your Profile</header>
);

const LoginScreen = ({ accounts, sendMessage, message, participants }) => (
    <div className="login-container">
        <Header />
        {accounts.loading ? (
            <h1>SO LOADING</h1>
        ) : (
            <Login accounts={accounts} sendMessage={sendMessage} message={message} participants={participants}/>
        )}
    </div>
);

LoginScreen.propTypes = {
    accounts: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    participants: PropTypes.object,
};

LoginScreen.defaultProps = {
    participants: undefined,
};

export default LoginScreen;
