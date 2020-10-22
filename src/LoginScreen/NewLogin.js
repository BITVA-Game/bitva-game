import React, { useState } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

const { message } = require('../constants');

const NewLogin = (props) => {
    const [value, setValue] = useState(faker.name.findName());
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: faker.name.findName(),
    //     };
    //     this.inputChange = this.inputChange.bind(this);
    //     this.createAccount = this.createAccount.bind(this);
    // }

    const createAccount = (event) => {
        event.preventDefault();
        props.sendMessage({
            type: message.CREATEACC,
            account: value,
        });
        props.toggleForm();
    };
    const inputChange = (event) => setValue(event.target.value);

    return (
        <div className="login-new-form">
            <h3>Enter Account Name</h3>
            <form onSubmit={createAccount}>
                <div className="account-name-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={value} onChange={inputChange} />
                </div>
                <div className="login-buttons">
                    <input className="login-button" type="button" value="Cancel" onClick={() => props.toggleForm()} />
                    <input className="login-button" type="submit" value="Create" />
                </div>
            </form>
        </div>
    );
};

NewLogin.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
};

export default NewLogin;
