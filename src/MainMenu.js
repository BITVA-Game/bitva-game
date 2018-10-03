import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/MainMenu.css';

const MenuButton = props => (
    <li>
        <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.name}
        </button>
    </li>
);

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { opened: props.opened };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log('opened:', this.state.opened);
        if (this.state.opened) {
            this.setState({ opened: false });
        } else {
            this.setState({ opened: true });
        }
    }

    render() {
        return (
            <div className={this.state.opened ? 'MainMenuContainer sidebar-opened' : 'MainMenuContainer'}>
                <div className="Logo">
                    <p>
                        Bitva
                    </p>
                </div>
                <div className="MenuButtons">
                    <ul>
                        <MenuButton name="Single Play" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Player vs Player" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Tournament" type="PLAY" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Daily Challenge" type="PLAY" sendMessage={this.props.sendMessage} />
                    </ul>
                    <div className="btn btn-sidebar-toggle" role="button" onClick={() => this.toggle()} onKeyDown={() => this.toggle()} tabIndex="-1">
                        ▶
                    </div>
                    <ul>
                        <MenuButton name="Store" type="" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Profile" type="PROFILE" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Settings" type="SETTINGS" sendMessage={this.props.sendMessage} />
                        <MenuButton name="Quit" type="" sendMessage={this.props.sendMessage} />
                    </ul>
                </div>
            </div>
        );
    }
}

MainMenu.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
};

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
