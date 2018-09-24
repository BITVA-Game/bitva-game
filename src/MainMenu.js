import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';


const MenuButton = props => (
    <li>
        <button className="menu-button" type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.name}
        </button>
    </li>
);

const MainMenu = props => (
    <div className="main-menu-container">
        <div className="logo">
            <p>
                Bitva
            </p>
        </div>
        <div className="menu-buttons-container">
            <ul className="menu-buttons-group">
                <MenuButton name="Single Play" type="PLAY" sendMessage={props.sendMessage} />
                <MenuButton name="Player vs Player" type="PLAY" sendMessage={props.sendMessage} />
                <MenuButton name="Tournament" type="PLAY" sendMessage={props.sendMessage} />
                <MenuButton name="Daily Challenge" type="PLAY" sendMessage={props.sendMessage} />
            </ul>
            <ul className="menu-buttons-group">
                <MenuButton name="Store" type="" sendMessage={props.sendMessage} />
                <MenuButton name="Profile" type="PROFILE" sendMessage={props.sendMessage} />
                <MenuButton name="Settings" type="SETTINGS" sendMessage={props.sendMessage} />
                <MenuButton name="Quit" type="" sendMessage={props.sendMessage} />
            </ul>
        </div>
    </div>
);

MainMenu.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
