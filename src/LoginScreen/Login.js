import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';

import NewLogin from './NewLogin';
import DeleteLogin from './DeleteLogin';

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
        {accounts && accounts.map(
            (a) => (
                <Account
                    accId={a.id}
                    accName={a.name}
                    key={a.id}
                    selected={a.id === selected}
                    toggle={toggle}
                />
            ),
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
            accountId: null,
            form: false,
            delete: false,
        };
        this.toggleAccount = this.toggleAccount.bind(this);
        this.toStartScreen = this.toStartScreen.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.accounts.accounts && (this.props.accounts.accounts.length !== prevProps.accounts.accounts.length)) {
            this.setState({
                accountId: (this.props.accounts.accounts[0] || {}).id,
            });
        }
    }

    toggleAccount(event) {
        this.setState({ accountId: event.target.dataset.id });
    }

    toStartScreen() {
        clickSound2.play();
        this.props.sendMessage({
            type: 'STARTSCREEN',
            account: this.state.accountId,
        });
    }

    toggleForm() {
        this.setState((oldState) => ({
            form: !oldState.form,
            delete: false,
        }));
    }

    toggleDelete() {
        console.log('TOGGLE DELETE', this.props.accounts.accounts);
        this.setState((oldState) => ({
            delete: !oldState.delete,
            form: false,
        }));
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
                    <div
                        className="login-button"
                        role="button"
                        onClick={this.toggleDelete}
                        onKeyPress={this.toggleDelete}
                        tabIndex="2"
                    >
                        Delete profile
                    </div>
                    <div
                        className="login-button"
                        role="button"
                        onClick={this.toggleForm}
                        onKeyPress={this.toggleForm}
                        tabIndex="2"
                    >
                        Create new profile
                    </div>
                </div>
            </>
        );
    }

    render() {
        const account = this.props.accounts.accounts ? this.props.accounts.accounts.find((a) => a.id === this.state.accountId) : null;
        return (
            <>
                <section className="login-content">
                    <div className="login-profiles-container">
                        {!this.state.form && !this.state.delete ? this.showAccounts() : null }
                        {this.state.form
                            ? (
                                <NewLogin
                                    sendMessage={this.props.sendMessage}
                                    toggleForm={this.toggleForm}
                                />
                            )
                            : null }
                        {this.state.delete && this.state.accountId
                            ? (
                                <DeleteLogin
                                    sendMessage={this.props.sendMessage}
                                    accId={account.id}
                                    accName={account.name}
                                    toggleDelete={this.toggleDelete}
                                />
                            )
                            : null }
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
