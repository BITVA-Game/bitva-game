import React, { Component } from 'react';
import MainMenu from './MainMenu';
import './css/Profile.css';

const WaitingForHost = (props) => (
    <form onSubmit={props.gameConnect}>
        <label htmlFor="text">ENETER IP</label>
        <input type="text" name="address" />
        <input type="submit" value="Submit" />
    </form>
);


const SelectRole = (props) => (
    <div>
        <h3>Select your role</h3>
        <form onSubmit={props.estConnection}>
            <div>
                <input type="radio" value="host" checked={props.role === 'host'} onChange={props.assignRole} />
                <label htmlFor="host">Host</label>
            </div>
            <div>
                <input type="radio" value="client" checked={props.role === 'client'} onChange={props.assignRole} />
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
            role: 'host',
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
            type: 'PLAY', role: this.state.role, network: true, ip,
        });
    }

    estConnection(event) {
        event.preventDefault();
        this.setState({
            screen: this.state.role === 'host' ? 'waiting' : 'selection',
        });
    }

    clearSelection() {
        this.setState({
            role: 'host',
            screen: null,
        });
    }

    renderPopup() {
        return (
            <div>
                <h1>I AM POPUP</h1>
                { this.state.screen === 'waiting' ? <h1>Waiting</h1> : <WaitingForHost gameConnect={this.gameConnect} />}
                <button type="button" onClick={this.clearSelection}>Back</button>
            </div>
        );
    }

    render() {
        console.log(this.state);
        return (
            <div className="profile-container app-background">
                { this.state.screen == null
                    ? (
                        <SelectRole
                            estConnection={this.estConnection}
                            assignRole={this.assignRole}
                            role={this.state.role}
                        />
                    )
                    : this.renderPopup() }
                <MainMenu sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}

export default NetworkPlay;
