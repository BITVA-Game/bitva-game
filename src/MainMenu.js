import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';
import logo from './images/dark_logo.png';

const { message } = require('./constants');

const MenuButton = (props) => (
    <li>
        <button
            data-testid="menu-button"
            className="menu-button"
            type="button"
            disabled={props.disabled}
            onClick={() => props.sendMessage({ type: props.type })}
        >
            {props.name}
        </button>
    </li>
);

const LogoBlock = () => (
    <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
    </div>
);

const ToggleButton = (props) => (
    <div
        data-testid="close-menu-btn"
        className="btn btn-sidebar-toggle"
        role="button"
        onClick={props.toggle}
        onKeyDown={props.toggle}
        tabIndex="-1"
    >
        ▶
    </div>
);

const MainMenu = ({ opened, game, sendMessage }) => {
    const [open, setOpen] = useState(opened);
    const toggle = () => setOpen(!open);

    return (
        <div
            data-testid="main-menu"
            className={open ? 'main-menu sidebar-opened' : 'main-menu'}
        >
            <LogoBlock />
            <div className="menu-buttons-container">
                <ul className="menu-buttons-group">
                    <MenuButton
                        name="Network Play"
                        type={message.NETWORKSCREEN}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Player vs Player"
                        type={message.LOCALPLAY}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Tournament"
                        type={message.PLAY}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Daily Challenge"
                        type={message.PLAY}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                </ul>
                <ToggleButton toggle={toggle} />
                <ul className="menu-buttons-group">
                    <MenuButton
                        name="Store"
                        type=""
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Profile"
                        type={message.PROFILE}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Settings"
                        type={message.SETTINGS}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                    <MenuButton
                        name="Quit"
                        type={message.QUIT}
                        sendMessage={sendMessage}
                        disabled={game}
                    />
                </ul>
            </div>
            <div
                data-testid="open-menu-btn"
                className="main-menu-overlay"
                role="button"
                onClick={toggle}
                onKeyPress={toggle}
                tabIndex="-1"
            />
        </div>
    );
};

MainMenu.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    opened: PropTypes.bool,
    game: PropTypes.bool,
};

MainMenu.defaultProps = {
    opened: false,
    game: false,
};

ToggleButton.propTypes = {
    toggle: PropTypes.func.isRequired,
};

MenuButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
