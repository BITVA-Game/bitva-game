import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Profile.css';
import './css/NetworkPlay.css';

const NetworkRole = ({ sendMessage }) => {
    const [role, setRole] = useState(null);
    switch (role) {
    case 'host':
        return <Host sendMessage={sendMessage} setRole={setRole} />;
    case 'client':
        return <Client sendMessage={sendMessage} setRole={setRole} />;
    default:
        return <SelectRole setRole={setRole} />;
    }
};

const Host = ({ sendMessage, setRole }) => {
    useEffect(() => {
        sendMessage({
            type: 'NETWORKPLAY',
            role: 'host',
        });
    }, []);
    return (
        <div>
            <h1>Waiting for connection</h1>
            <button type="button" onClick={() => setRole(null)}>Back</button>
        </div>
    );
};

const Client = ({ sendMessage, setRole }) => {
    const [ip, setIp] = useState(null);
    const onSubmit = (event) => {
        event.preventDefault();
        sendMessage({
            type: 'NETWORKPLAY',
            role: 'client',
            ip,
        });
    };
    return (
        <div className="role-selection">
            <form onSubmit={onSubmit}>
                <label htmlFor="text">ENETER IP</label>
                <input
                    type="text"
                    name="address"
                    onChange={(event) => setIp(event.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
            <button type="button" onClick={() => setRole(null)}>Back</button>
        </div>
    );
};

const SelectRole = ({ setRole }) => (
    <div className="role-selection">
        <h3>Select your role</h3>
        <div>
            <input type="button" value="Host" onClick={() => setRole('host')} />
        </div>
        <div>
            <input type="button" value="Client" onClick={() => setRole('client')} />
        </div>
    </div>
);

const NetworkPlay = ({ sendMessage }) => (
    <div className="profile-container app-background">
        <NetworkRole sendMessage={sendMessage} />
        <MainMenu sendMessage={sendMessage} />
    </div>
);

NetworkPlay.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};


NetworkRole.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

SelectRole.propTypes = {
    setRole: PropTypes.func.isRequired,
};

Client.propTypes = {
    setRole: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

Host.propTypes = {
    setRole: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default NetworkPlay;
