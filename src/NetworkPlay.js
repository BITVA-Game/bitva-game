import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Profile.css';
import './css/NetworkPlay.css';

const { message, screen: screenConst, role: roleConst } = require('./constants');

const WaitingForHost = (props) => (
    <div className="role-selection">
        <form onSubmit={props.gameConnect}>
            <label htmlFor="text">ENETER IP</label>
            <input type="text" name="address" />
            <input type="submit" value="Submit" />
        </form>
    </div>
);

const SelectRole = (props) => (
    <div className="role-selection">
        <h3>Select your role</h3>
        <form onSubmit={props.estConnection}>
            <div>
                <input
                    type="radio"
                    value={roleConst.HOST}
                    checked={props.role === roleConst.HOST}
                    onChange={props.assignRole}
                />
                <label htmlFor="host">Host</label>
            </div>
            <div>
                <input
                    type="radio"
                    value={roleConst.CLIENT}
                    checked={props.role === roleConst.CLIENT}
                    onChange={props.assignRole}
                />
                <label htmlFor="client">Client</label>
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>
);

class NetworkPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: roleConst.HOST,
            screen: null,
        };
        this.assignRole = this.assignRole.bind(this);
        this.estConnection = this.estConnection.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.gameConnect = this.gameConnect.bind(this);
    }

    assignRole(event) {
        this.setState({
            role: event.target.value,
        });
    }

    gameConnect(event) {
        event.preventDefault();
        const ip = event.target.elements.address.value;
        this.props.sendMessage({
            type: message.NETWORKPLAY,
            role: this.state.role,
            network: true,
            ip,
        });
    }

    estConnection(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            screen: prevState.role === roleConst.HOST
                ? screenConst.WAITINGSTATE : screenConst.SELECTIONSTATE,
        }));
    }

    clearSelection() {
        this.setState({
            role: roleConst.HOST,
            screen: null,
        });
    }

    renderPopup() {
        return (
            <div className="role-selection" style={{ opacity: 0.8, width: 400 }}>
                <h1>I AM POPUP</h1>
                {this.state.screen === screenConst.WAITINGSTATE ? (
                    <h1>Waiting</h1>
                ) : (
                    <WaitingForHost gameConnect={this.gameConnect} />
                )}
                <button type="button" style={{ backgroundColor: 'black' }} onClick={this.clearSelection}>
                    Back
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="profile-container app-background">
                {this.state.screen == null ? (
                    <SelectRole
                        estConnection={this.estConnection}
                        assignRole={this.assignRole}
                        role={this.state.role}
                    />
                ) : (
                    this.renderPopup()
                )}
                <MainMenu sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}

NetworkPlay.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

WaitingForHost.propTypes = {
    gameConnect: PropTypes.func.isRequired,
};

SelectRole.propTypes = {
    estConnection: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    assignRole: PropTypes.func.isRequired,
};

export default NetworkPlay;
