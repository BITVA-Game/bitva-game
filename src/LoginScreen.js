import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';
import './css/App.css';
import './css/LoginScreen.css';

const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, { volume: 1.0 });

const Header = () => (
    <header className="login-header">
        Select Your Profile
    </header>
);

const Footer = ({ toStartScreen }) => (
    <footer className="login-footer">
        <div className="login-play-btn" role="button" onClick={toStartScreen} onKeyPress={toStartScreen} tabIndex="1">
            Play
        </div>
    </footer>
);

const Profile = ({ accId }) => (
    <div className="login-profile login-selected">
        {accId}
    </div>
);

const Profiles = props => (
    <section className="login-content">
        <div className="login-profiles-container">
            <div className="login-profiles">
                <Profile accId={props.app.account.id} />
            </div>
            <div className="login-buttons">
                <div className="login-button" role="button">Delete profile</div>
                <div className="login-button" role="button">Create new profile</div>
            </div>
        </div>
    </section>
);

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.toStartScreen = this.toStartScreen.bind(this);
    }

    toStartScreen() {
        console.log('sound');
        clickSound2.play();
        this.props.sendMessage({
            type: 'STARTSCREEN',
        });
    }

    render() {
        return (
            <div className="login-container">
                <Header />
                <Profiles app={this.props.app} />
                <Footer toStartScreen={this.toStartScreen} />
            </div>
        );
    }
}

LoginScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

Profiles.propTypes = {
    app: PropTypes.object.isRequired,
};

Profile.propTypes = {
    accId: PropTypes.string.isRequired,
};

Footer.propTypes = {
    toStartScreen: PropTypes.func.isRequired,
};

export default LoginScreen;
