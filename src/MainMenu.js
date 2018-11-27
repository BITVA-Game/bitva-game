import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';
import logo from './images/logo.png';


/**
* MenuButton component
*
* @param {string} name Button's text
* @param {string} type Type of screen to load after clicking the button
* @param {function} sendMessage Message to pass type of screen to load after clicking the button
* @returns {object} MenuButton component
*/
const MenuButton = props => (
    <li>
        <button className="menu-button" type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.name}
        </button>
    </li>
);

/**
* MainMenu component
*
* @param {bool} opened Set MainMenu's state
* @param {function} sendMessage Message to pass type of screen to load after clicking the button
* @returns {object} MainMenu component
*/
class MainMenu extends Component {
    /**
    * MainMenu constructor
    *
    * @param {bool} opened Set MainMenu's state
    * @returns {object} MainMenu 
    */
    constructor(props) {
        super(props);
        this.state = { opened: props.opened };
        this.toggle = this.toggle.bind(this);
    }

    /**
    * toggle MainMenu
    *
    * @param {none} none
    * @returns {bool} opened Set MainMenu's state
    */
    toggle() {
        const opened = this.state.opened;
        this.setState({ opened: !opened });
    }

    /**
    * toggle MainMenu
    *
    * @param {none} none
    * @returns {object} MainMenu
    */
    render() {
        return (
            <div className={this.state.opened ? 'main-menu sidebar-opened' : 'main-menu'}>
                <div className="logo-container">
                    <img className="logo logo-shadowFilter" src={logo} alt="bitva" />
                </div>
                <div className="menu-buttons-container">
                    <ul className="menu-buttons-group">
                        <MenuButton name="Single Play" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Player vs Player" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Tournament" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Daily Challenge" type="PLAY" sendMessage={this.props.sendMessage} />
                    </ul>
                    <div className="btn btn-sidebar-toggle" role="button" onClick={() => this.toggle()} onKeyDown={() => this.toggle()} tabIndex="-1">
                        ▶
                    </div>
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
    // eslint-disable-next-line react/require-default-props
    opened: PropTypes.bool.isRequired,
};

MainMenu.defaultProps = {
    opened: false,
};

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
