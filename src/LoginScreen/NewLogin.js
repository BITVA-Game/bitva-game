import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

const { message } = require('../constants');

class NewLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: faker.name.findName(),
        };
        this.inputChange = this.inputChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }


    createAccount(event) {
        event.preventDefault();
        this.props.sendMessage({
            type: message.CREATEACC,
            account: this.state.value,
        });
        this.props.toggleForm();
    }

    inputChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="login-new-form">
                <h3>Enter Account Name</h3>
                <form onSubmit={this.createAccount}>
                    <div className="account-name-input">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.value} onChange={this.inputChange} />
                    </div>
                    <div className="login-buttons">
                        <input className="login-button" type="button" value="Cancel" onClick={() => this.props.toggleForm()} />
                        <input className="login-button" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        );
    }
}

NewLogin.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
};

export default NewLogin;
