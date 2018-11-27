import React, { Component } from 'react';
import './css/App.css';
import WebFont from 'webfontloader';

import StartScreen from './StartScreen';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import GameScreen from './GameScreen';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

/**
 * send Message "message"
 *
 * @param {string} msg message we receive.
 * @returns {function} that send message msg to channel 'APP'
 */
function sendMessage(msg) {
    ipcRenderer.send('APP', msg);
}

/**
 * @class App
 * @property constructor
 * @default initial state with screen set to 'loading'
 * @return {function} to send messages
 */

class App extends Component {
    // Set the initial state, before contacting backend.
    // Bind the function to send messages
    constructor(props) {
        super(props);
        this.state = { app: { manager: { screen: 'loading' } } };
    }

    /**
 * mount backend GSO to state
 *
 * @param {none} none
 * @returns {function} that listen to channel 'APP'
 * @param {string} channel 'APP' with param 'event', arg
 * @returns {function} that setState
 * @param {object} app
 * @returns {object} arg
 * @returns {function} to send message
 * @param {string} 'Init'
 */
    // When the page loads, get GSO from backend, save it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            this.setState({ app: arg });
        });
        sendMessage('Init');
    }

    /**
 * show Application
 *
 * @param {none} none
 * @returns {function} that set state of application manager screen by switch
 * @default 'UNKNOWN SCREEN NAME' + current application manager screen
 */
    showApplication() {
        switch (this.state.app.manager.screen) {
        case 'loading':
            return 'LOADING';
        case 'STARTSCREEN':
            return <StartScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'HEROSELECT':
            return <HeroSelection sendMessage={sendMessage} app={this.state.app} />;
        case 'VERSUS':
            return <VersusScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'PLAYERACT':
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
        default:
            return `UNKNOWN SCREEN NAME ${this.state.app.manager.screen}`;
        }
    }

    /**
 * render
 *
 * @param {none} none
 * @returns {function} that load fonts from Web: 'Ruslan Display', 'Sedan SC'
 * @returns {function} that return to DOM show Application function
 */
    render() {
        console.log(this.state.app.manager.screen);
        console.log("Here's the app object for testing");
        console.log(this.state.app);
        WebFont.load({
            custom: {
                families: ['Ruslan Display', 'Sedan SC'],
                urls: ['/fonts/RuslanDisplay.css', '/fonts/Sedan-SC.css'],
            },
        });
        return (
            <div className="App">
                {this.showApplication()}
            </div>
        );
    }
}

export default App;
