import React, { Component } from 'react';
import './css/App.css';
import WebFont from 'webfontloader';

import StartScreen from './StartScreen';
import Profile from './Profile';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import GameScreen from './GameScreen';
// import NetworkPlay from './NetworkPlay';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function sendMessage(msg) {
    console.log('MESSAGE', msg);
    ipcRenderer.send('APP', msg);
}

class App extends Component {
    // Set the initial state, before contacting backend.
    // Bind the function to send messages
    constructor(props) {
        super(props);
        this.state = { app: { manager: { screen: 'loading' } } };
    }


    // When the page loads, get GSO from backend, save it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            console.log({ app: arg });
            this.setState({ app: arg });
        });
        sendMessage('Init');
    }

    showApplication() {
        switch (this.state.app.manager.screen) {
        case 'loading':
            return 'LOADING';
        case 'STARTSCREEN':
            return <StartScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'PROFILE':
            return <Profile sendMessage={sendMessage} app={this.state.app} />;
        case 'HEROSELECT':
            return <HeroSelection sendMessage={sendMessage} app={this.state.app} key={this.state.app.heroSelect.activePlayer} />;
        case 'VERSUS':
            return <VersusScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'PLAYERACT':
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
            /*
        case 'GAMESCREEN':
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'NETWORKPLAY':
            return <NetworkPlay sendMessage={sendMessage} app={this.state.app} />;
            */
        default:
            return `UNKNOWN SCREEN NAME ${this.state.app.manager.screen}`;
        }
    }

    render() {
        // console.log('APP ', this.state.app);
        WebFont.load({
            custom: {
                families: ['Ruslan Display', 'Sedan SC'],
                urls: ['fonts/RuslanDisplay.css', 'fonts/Sedan-SC.css'],
            },
        });
        return (
            <div className="App" data-testid="app-screen">
                {this.showApplication()}
            </div>
        );
    }
}

export default App;
