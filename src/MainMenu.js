import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const MainMenu = props => (
    <div>
        <textarea value={JSON.stringify(props.app.profile)} />
        <button type="button" onClick={() => props.sendMessage({ type: 'PLAY' })}>
Select imaginary PvP
        </button>
    </div>
);

MainMenu.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
