import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/LoginScreen.css';
import Login from './Login';
import spider from '../images/animation/spider.png';

const Header = () => (
    <header className="login-header">Select Your Profile</header>
);

const LoginScreen = ({
    accounts, sendMessage, message, participants,
}) => (
    <div className="login-container">
        <div>
            <div data-testid="hollow-animation" className="hollow" />
            {/* <div data-testid="window-animation" className="window" /> */}
            <div data-testid="spider-animation" className="spider">
                <img src={spider} alt="spider icon" />
            </div>
            <div data-testid="mushroom-animation" className="mushroom" />
            <div className="lemon">
                <div className="eye" />
            </div>
            <div className="eyePupil" />
            <div className="eyePupilBackground" />
        </div>
        <Header />
        {accounts.loading ? (
            <h1>SO LOADING</h1>
        ) : (
            <Login
                accounts={accounts}
                sendMessage={sendMessage}
                message={message}
                participants={participants}
            />
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
