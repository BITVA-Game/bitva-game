import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/LoginScreen.css';
import Login from './Login';

const Header = () => (
    <header className="login-header">
        Select Your Profile
    </header>
);


const LoginScreen = ({ accounts, sendMessage }) => (
    <div className="login-container">
        {console.log(accounts)}
        <Header />
        <Login accounts={accounts} sendMessage={sendMessage} />
    </div>
);

LoginScreen.propTypes = {
    accounts: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

Login.propTypes = {
    accounts: PropTypes.object.isRequired,
};

export default LoginScreen;
