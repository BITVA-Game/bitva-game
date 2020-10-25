import React, { useState } from 'react';
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

const RenderPopup = ({ screen, gameConnect, clearSelection }) => (
    <div className="role-selection" style={{ opacity: 0.8, width: 400 }}>
        <h1>I AM POPUP</h1>
        {screen === screenConst.WAITINGSTATE ? (
            <h1>Waiting</h1>
        ) : (
            <WaitingForHost gameConnect={gameConnect} />
        )}
        <button type="button" style={{ backgroundColor: 'black' }} onClick={clearSelection}>
            Back
        </button>
    </div>
);

const NetworkPlay = (props) => {
    const [role, setRole] = useState(roleConst.HOST);
    const [screen, setScreen] = useState(null);
    const assignRole = (event) => setRole(event.target.value);
    const gameConnect = (event) => {
        event.preventDefault();
        const ip = event.target.elements.address.value;
        props.sendMessage({
            type: message.NETWORKPLAY,
            role,
            network: true,
            ip,
        });
    };
    const estConnection = (event) => {
        event.preventDefault();
        setScreen((prevRole) => (prevRole === roleConst.HOST
            ? screenConst.WAITINGSTATE : screenConst.SELECTIONSTATE));
    };
    const clearSelection = () => {
        setRole(roleConst.HOST);
        setScreen(null);
    };

    return (
        <div className="profile-container app-background">
            {screen == null ? (
                <SelectRole
                    estConnection={estConnection}
                    assignRole={assignRole}
                    role={role}
                />
            ) : (
                <RenderPopup
                    screen={screen}
                    gameConnect={gameConnect}
                    clearSelection={clearSelection}
                />
            )}
            <MainMenu sendMessage={props.sendMessage} />
        </div>
    );
};

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

RenderPopup.propTypes = {
    screen: PropTypes.string,
    gameConnect: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
};

RenderPopup.defaultProps = {
    screen: null,
};

export default NetworkPlay;
