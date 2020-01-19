import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

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
            type: 'CREATEACC',
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
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.value} onChange={this.inputChange} />
                    </div>
                    <input type="submit" value="Create" />
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
