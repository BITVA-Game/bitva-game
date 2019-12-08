import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';

import NewLogin from './NewLogin';

const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, { volume: 1.0 });

const Account = ({
    accId, accName, selected, toggle,
}) => (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
        className={`login-profile ${selected ? 'login-selected' : null}`}
        data-id={accId}
        onClick={(e) => toggle(e)}
        role="button"
        onKeyPress={(e) => toggle(e)}
        tabIndex="1"
    >
        {accName}
    </div>
);

const Accounts = ({ accounts, selected, toggle }) => (
    <div>
        {accounts.map(
            (a) => <Account accId={a.id} accName={a.name} key={a.id} selected={a.id === selected} toggle={toggle} />,
        )}
    </div>
);

const Footer = ({ toStartScreen }) => (
    <footer className="login-footer">
        <div
            className="login-play-btn"
            role="button"
            onClick={toStartScreen}
            onKeyPress={toStartScreen}
            tabIndex="1"
        >
            Play
        </div>
    </footer>
);


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: (props.accounts.accounts[0] || {}).id,
            form: false,
        };
        this.toggleAccount = this.toggleAccount.bind(this);
        this.toStartScreen = this.toStartScreen.bind(this);
        this.showForm = this.showForm.bind(this);
    }

    toggleAccount(event) {
        console.log(event.target.dataset.id);
        this.setState({ accountId: event.target.dataset.id });
    }

    toStartScreen() {
        clickSound2.play();
        this.props.sendMessage({
            type: 'STARTSCREEN',
            account: this.state.accountId,
        });
    }

    showForm() {
        this.setState({ form: true });
    }

    showAccounts() {
        return (
            <>
                <div className="login-profiles">
                    <Accounts
                        accounts={this.props.accounts.accounts}
                        selected={this.state.accountId}
                        toggle={this.toggleAccount}
                    />
                </div>
                <div className="login-buttons">
                    <div className="login-button" role="button">Delete profile</div>
                    <div className="login-button" role="button" onClick={this.showForm}>Create new profile</div>
                </div>
            </>
        );
    }

    render() {
        return (
            <>
                <section className="login-content">
                    <div className="login-profiles-container">
                        {console.log(this.state.form)}
                        {this.state.form ? <NewLogin sendMessage={this.props.sendMessage} /> : this.showAccounts() }
                    </div>
                </section>
                {this.state.accountId ? <Footer toStartScreen={this.toStartScreen} /> : null}
            </>
        );
    }
}

Footer.propTypes = {
    toStartScreen: PropTypes.func.isRequired,
};

Login.propTypes = {
    accounts: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

Accounts.propTypes = {
    accounts: PropTypes.array.isRequired,
    selected: PropTypes.string,
    toggle: PropTypes.func.isRequired,
};

Accounts.defaultProps = {
    selected: undefined,
};

Account.propTypes = {
    accName: PropTypes.string.isRequired,
    accId: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
};

Account.defaultProps = {
    selected: false,
};

export default Login;
