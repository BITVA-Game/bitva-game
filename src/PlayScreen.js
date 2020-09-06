import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import { getAccountForPart } from './rules';

const VersusStatus = ({ name, hero }) => (
    <div className="versus-profile">
        <div className="versus-profile-player">{name || null}</div>
        <div className="versus-profile-name">{hero || null}</div>
    </div>
);

const PlayScreen = ({ app, sendMessage }) => {
    const player = getAccountForPart(app, app.participants.player);
    return (
        <div className="main-container">
            <div className="main-content">
                <div className="versus-profiles-container">
                    <VersusStatus name={player.name} hero={app.players.find((p) => p.id === app.participants.player).hero} />
                    <div className="vs">VS</div>
                    <VersusStatus
                        name={app.opponent.opp ? app.opponent.opp.name : null}
                        hero={app.opponent.data ? app.opponent.data.hero : null}
                    />
                </div>
            </div>
            <div className="main-footer">
                <button className="btn btn-play" type="button" onClick={() => sendMessage({ type: 'PLAY' })}>
                Play
                </button>
            </div>
        </div>
    );
};

VersusStatus.propTypes = {
    name: PropTypes.string,
    hero: PropTypes.string,
};

VersusStatus.defaultProps = {
    name: null,
    hero: null,
};

PlayScreen.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default PlayScreen;
