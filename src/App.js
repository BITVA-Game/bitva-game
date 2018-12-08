import React, { Component } from 'react';
import './css/App.css';
import WebFont from 'webfontloader';

import StartScreen from './StartScreen';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import GameScreen from './GameScreen';

// Import electron and establish connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

/**
 * function that sends Message
 *
 * @param {string} msg message we receive.
 * @returns {function} that send message msg to channel 'APP'
 */
// we send message to our channel APP within our game application
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
 * mount backend GSO to state received in message from channel APP
 *
 * @param {function} that listen to channel 'APP'
 * @param {string} channel 'APP' with param 'event', arg
 * @returns {function} setState that set application state as per arg received in channel message
 * @param {object} app - application
 * @returns {object} arg - argument received with message within channel APP comminucation
 * @returns {function} to send message to all child components within game application
 * @param {string} 'Init'- deafault parameter Initial
 */
    // When the page loads, function gets GSO from backend with the message, saves it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            this.setState({ app: arg });
        });
        sendMessage('Init');
    }

    /**
 * function show Application
 *
 * @param {object} application state
 * @returns switch that set state of application manager screen
 * @returns new state for manager screen according to the application state
 * @default {string} if any rare mistake we get  'UNKNOWN SCREEN NAME'
 * */
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
 * component that renders to DOM
 *
 * @returns {function} that load fonts from Web: 'Ruslan Display', 'Sedan SC'
 * @returns {function} that return to DOM showApplication function managing the screen
 */
    render() {
        // we show manager screen
        console.log(this.state.app.manager.screen);
        // we show string "Here's the app object for testing" to locate application
        console.log("Here's the app object for testing");
        // we show application state
        console.log(this.state.app);
        // We load fonts from Web
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
