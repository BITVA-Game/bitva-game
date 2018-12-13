import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';
import logo from './images/logo.png';


/**
* MenuButton component: each Button in Main Menu
*
* @param {function} props.sendMessage When the button is clicked this function sends message to pass type of screen to be loaded after clicking the button
* @param {string} props.type Type of screen to be loaded after clicking the button
* @param {string} props.name Button's text (value)
* @returns {object} MenuButton component: each Button in Main Menu
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
*/
class MainMenu extends Component {
    /**
    * MainMenu constructor
    *
    * @param {bool} this.state Sets MainMenu's state depending on props.opened
    * @param {bool} props.opened MainMenu's state
    * @param {function} this.toggle Binds toggle function
    * @returns {object} New MainMenu object
    */
    constructor(props) {
        super(props);
        this.state = { opened: props.opened };
        this.toggle = this.toggle.bind(this);
    }

    /**
    * function to toggle MainMenu's state (opened/closed)
    *
    * @property {bool} opened MainMenu's state
    * @property {function} this.setState Toggle MainMenu's state
    */
    toggle() {
        const opened = this.state.opened;
        this.setState({ opened: !opened });
    }

    /**
    * function to render MainMenu component containing logo, buttons to next screens and button to open/close MainMenu
    *
    * @returns {object} rendered MainMenu component
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
