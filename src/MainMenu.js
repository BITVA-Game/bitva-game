import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';
import logo from './images/dark_logo.png';

const MenuButton = props => (
    <li>
        <button className="menu-button" type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.name}
        </button>
    </li>
);

const LogoBlock = props => (
    <div className="logo-container">
        {props.opened
            ? <img className="logo" src={logo} alt={logo} />
            : null
        }
    </div>
);

const ToggleButton = props => (
    <div
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
            <div className={this.state.opened ? 'main-menu sidebar-opened' : 'main-menu'}>
                <LogoBlock opened={this.state.opened} />
                <div className="menu-buttons-container">
                    <ul className="menu-buttons-group">
                        <MenuButton name="Single Play" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Player vs Player" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Tournament" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Daily Challenge" type="PLAY" sendMessage={this.props.sendMessage} />
                    </ul>
                    <ToggleButton toggle={this.toggle} />
                    <ul className="menu-buttons-group">
                        <MenuButton name="Store" type="" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Profile" type="PROFILE" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Settings" type="SETTINGS" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Quit" type="QUIT" sendMessage={this.props.sendMessage} />
                    </ul>
                </div>
                <div className="main-menu-overlay" role="button" onClick={this.toggle} onKeyPress={this.toggle} tabIndex="-1" />
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

LogoBlock.propTypes = {
    opened: PropTypes.bool,
};

LogoBlock.defaultProps = {
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
