import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import { getAccountForPart } from './rules';

const VersusStatus = ({ player }) => {
    console.log('VersusStatus', player);
    return (
        <div className="versus-profile">
            <div className="versus-profile-player">{player || null}</div>
            <div className="versus-profile-name">Some</div>
        </div>
    );
};
const PlayScreen = ({ app, sendMessage }) => (
    <div className="main-container">
        <div className="main-content">
            <div className="versus-profiles-container">
                <VersusStatus player={app.participants.player} />
                <div className="vs">VS</div>
                <VersusStatus player={app.opponent.data ? app.opponent.data.id : null} />
            </div>
        </div>
        <div className="main-footer">
            <button className="btn btn-play" type="button" onClick={() => sendMessage({ type: 'JOIN' })}>
                Play
            </button>
        </div>
    </div>
);

VersusStatus.propTypes = {
    player: PropTypes.string,
};

VersusStatus.defaultProps = {
    player: null,
};

PlayScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayScreen;
