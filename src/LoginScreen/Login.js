import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';

import NewLogin from './NewLogin';
import DeleteLogin from './DeleteLogin';

const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, {
    volume: 1.0,
});

const Account = ({
    accId, accName, selected, toggle, disabled,
}) => (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
        className={`login-profile ${selected ? 'login-selected' : null} ${disabled ? 'profile-inaccessable' : null}`}
        data-id={accId}
        onClick={(e) => { if (!disabled) toggle(e); }}
        role="button"
        onKeyPress={(e) => { if (!disabled) toggle(e); }}
        tabIndex="1"
    >
        {accName}
    </div>
);

const Accounts = ({
    accounts, selected, toggle, participants,
}) => (
    <div>
        {accounts
        && accounts.map((a) => {
            const disabled = participants && participants.player === a.id;
            return (
                <Account
                    accId={a.id}
                    accName={a.name}
                    key={a.id}
                    selected={a.id === selected}
                    toggle={toggle}
                    disabled={disabled}
                />
            );
        })}
    </div>
);

const PlayButton = ({ toStartScreen }) => (
    <div
        className="btn btn-play"
        role="button"
        onClick={toStartScreen}
        onKeyPress={toStartScreen}
        tabIndex="1"
    >
        Play
    </div>
);

const Footer = ({
    accountId, form, deleting, toStartScreen,
}) => (
    <footer className="main-footer">
        {accountId && (form === false && deleting === false)
            ? <PlayButton toStartScreen={toStartScreen} />
            : null}
    </footer>
);

const Login = (props) => {
    const [accountId, setAccountId] = useState(null);
    const [form, setForm] = useState(false);
    const [deleteAcc, setDeleteAcc] = useState(false);

    useEffect(() => {
        setAccountId((props.accounts.records[0] || {}).id);
    }, [props.accounts.records]);

    const toggleAccount = (event) => setAccountId(event.target.dataset.id);
    const toStartScreen = () => {
        clickSound2.play();
        props.sendMessage({
            type: props.message,
            account: accountId,
        });
    };
    const toggleForm = () => {
        setForm(!form);
        setDeleteAcc(false);
    };
    const toggleDelete = () => {
        setDeleteAcc(!deleteAcc);
        setForm(false);
    };
    const showAccounts = () => (
        <>
            <div className="login-profiles">
                <Accounts
                    accounts={props.accounts.records}
                    selected={accountId}
                    toggle={toggleAccount}
                    participants={props.participants}
                />
            </div>
            <div className="login-buttons">
                <div
                    className="login-button"
                    role="button"
                    onClick={toggleForm}
                    onKeyPress={toggleForm}
                    tabIndex="2"
                >
                    Create new profile
                </div>
                {accountId ? (
                    <div
                        className="login-button"
                        role="button"
                        onClick={toggleDelete}
                        onKeyPress={toggleDelete}
                        tabIndex="2"
                    >
                        Delete profile
                    </div>
                ) : null}
            </div>
        </>
    );
    const account = props.accounts.records
        ? props.accounts.records.find((a) => a.id === accountId)
        : null;

    return (
        <>
            <section className="main-content">
                <div className="login-profiles-container">
                    {!form && !deleteAcc
                        ? showAccounts()
                        : null}
                    {form ? (
                        <NewLogin
                            sendMessage={props.sendMessage}
                            toggleForm={toggleForm}
                        />
                    ) : null}
                    {deleteAcc && accountId ? (
                        <DeleteLogin
                            sendMessage={props.sendMessage}
                            accId={account.id}
                            accName={account.name}
                            toggleDelete={toggleDelete}
                        />
                    ) : null}
                </div>
            </section>
            <Footer
                accountId={accountId}
                form={form}
                deleting={deleteAcc}
                toStartScreen={toStartScreen}
            />
        </>
    );
};

PlayButton.propTypes = {
    toStartScreen: PropTypes.func.isRequired,
};

Footer.propTypes = {
    accountId: PropTypes.string,
    form: PropTypes.bool.isRequired,
    deleting: PropTypes.bool.isRequired,
    toStartScreen: PropTypes.func.isRequired,
};

Footer.defaultProps = {
    accountId: null,
};

Login.propTypes = {
    accounts: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    participants: PropTypes.object,
};

Login.defaultProps = {
    participants: undefined,
};

Accounts.propTypes = {
    accounts: PropTypes.array.isRequired,
    selected: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    participants: PropTypes.object,
};

Accounts.defaultProps = {
    selected: undefined,
    participants: undefined,
};

Account.propTypes = {
    accName: PropTypes.string.isRequired,
    accId: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

Account.defaultProps = {
    selected: false,
    disabled: false,
};

export default Login;
