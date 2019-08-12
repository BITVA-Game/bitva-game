import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './css/App.css';
import WebFont from 'webfontloader';

import StartScreen from './StartScreen';
import Profile from './Profile';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import GameScreen from './GameScreen';
import NetworkPlay from './NetworkPlay';

import hutImage from './images/backgrounds/Background_hut.png';
import greyTreeL from './images/backgrounds/GreyTree_2.png';
import greyTreeR from './images/backgrounds/GreyTree_1.png';
import blackTreeL from './images/backgrounds/BlackTree_2.png';
import blackTreeR from './images/backgrounds/BlackTree_1.png';

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
        this.state = { animation: false, app: { manager: { screen: 'LOADING' } } };
    }


    // When the page loads, get GSO from backend, save it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            console.log({ app: arg });
            this.setState({ app: arg });
        });
        sendMessage('INIT');
        setTimeout(() => this.setState({ animation: true }), 1000);
    }

    showApplication() {
        switch (this.state.app.manager.screen) {
        case 'LOADING':
            return 'LOADING';
        case 'STARTSCREEN':
            return <StartScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'PROFILE':
            return <Profile sendMessage={sendMessage} app={this.state.app} />;
        case 'HEROSELECT':
            return (
                <HeroSelection
                    sendMessage={sendMessage}
                    app={this.state.app}
                    key={this.state.app.heroSelect.activePlayer}
                />
            );
        case 'VERSUS':
            return <VersusScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'GAMESCREEN':
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
        case 'NETWORKPLAY':
            return <NetworkPlay sendMessage={sendMessage} app={this.state.app} />;
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
                <div id="background" className="start-screen">
                    <img alt="hut" src={hutImage} className="background-hut" />
                    <img alt="grey tree 1" src={greyTreeL} className="background-greyTreeL" />
                    <img alt="grey tree 2" src={greyTreeR} className="background-greyTreeR" />
                    <img alt="black tree 1" src={blackTreeL} className="background-blackTreeL" />
                    <CSSTransition
                        classNames="example"
                        in={this.state.animation}
                        timeout={5500}
                    >
                        <div>
                            <img alt="black tree 2" src={blackTreeR} className="background-blackTreeR" />
                        </div>
                    </CSSTransition>
                </div>
                {this.showApplication()}
            </div>
        );
    }
}

export default App;
