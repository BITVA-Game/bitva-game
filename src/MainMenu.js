import React, { Component } from 'react';
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

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { opened: props.opened };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const opened = this.state.opened;
        this.setState({ opened: !opened });
    }

    render() {
        return (
            <div
                data-testid="main-menu"
                className={this.state.opened ? 'main-menu sidebar-opened' : 'main-menu'}
            >
                <LogoBlock />
                <div className="menu-buttons-container">
                    <ul className="menu-buttons-group">
                        <MenuButton
                            name="Network Play"
                            type={message.NETWORKSCREEN}
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Player vs Player"
                            type={message.LOCALPLAY}
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Tournament"
                            type={message.PLAY}
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Daily Challenge"
                            type={message.PLAY}
                            sendMessage={this.props.sendMessage}
                        />
                    </ul>
                    <ToggleButton toggle={this.toggle} />
                    <ul className="menu-buttons-group">
                        <MenuButton
                            name="Store"
                            type=""
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Profile"
                            type={message.PROFILE}
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Settings"
                            type={message.SETTINGS}
                            sendMessage={this.props.sendMessage}
                        />
                        <MenuButton
                            name="Quit"
                            type={message.QUIT}
                            sendMessage={this.props.sendMessage}
                        />
                    </ul>
                </div>
                <div
                    data-testid="open-menu-btn"
                    className="main-menu-overlay"
                    role="button"
                    onClick={this.toggle}
                    onKeyPress={this.toggle}
                    tabIndex="-1"
                />
            </div>
        );
    }
}

MainMenu.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    opened: PropTypes.bool,
};

MainMenu.defaultProps = {
    opened: false,
};

ToggleButton.propTypes = {
    toggle: PropTypes.func.isRequired,
};

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
