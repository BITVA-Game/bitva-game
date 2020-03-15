import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import { getAccountForPart } from './rules';

const PlayScreen = ({ app, sendMessage }) => (
    <div className="main-container">
        <div className="main-content">
            <div className="versus-profiles-container">
                <div className="versus-profile">
                    <div className="versus-profile-player">Player 1</div>
                    <div className="versus-profile-name">{getAccountForPart(app, app.participants.player).name}</div>
                </div>
                <div className="vs">VS</div>
                <div className="versus-profile">
                    <div className="versus-profile-player">Player 2</div>
                    <div className="versus-profile-name">{getAccountForPart(app, app.participants.guest).name}</div>
                </div>
            </div>
        </div>
        <div className="main-footer">
            <button className="btn btn-play" type="button" onClick={() => sendMessage({ type: 'PLAY' })}>
                Play
            </button>
        </div>
    </div>
);

PlayScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayScreen;
