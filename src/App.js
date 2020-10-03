import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './css/App.css';
import WebFont from 'webfontloader';

import LoginScreen from './LoginScreen';
import StartScreen from './StartScreen';
import Profile from './Profile';
import Settings from './Settings';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import GameScreen from './GameScreen';
import NetworkPlay from './NetworkPlay';
import PlayScreen from './PlayScreen';

import hutImage from './images/backgrounds/Background_hut.png';
import greyTreeL from './images/backgrounds/GreyTree_2.png';
import greyTreeR from './images/backgrounds/GreyTree_1.png';
import blackTreeL from './images/backgrounds/BlackTree_2.png';
import blackTreeR from './images/backgrounds/BlackTree_1.png';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const { message: messageConst, screen: screenConst } = require('./constants');

function sendMessage(msg) {
    console.log('MESSAGE', msg);
    ipcRenderer.send('APP', msg);
}

class App extends Component {
    // Set the initial state, before contacting backend.
    // Bind the function to send messages
    constructor(props) {
        super(props);
        this.state = { loaded: false, app: { manager: { screen: screenConst.LOADING } } };
        this.loadAnimation = this.loadAnimation.bind(this);
    }

    // When the page loads, get GSO from backend, save it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            // console.log({ app: arg });
            this.setState({ app: arg });
        });
        sendMessage({ type: messageConst.INIT });
        setTimeout(() => this.loadAnimation(), 0);
    }

    loadAnimation() {
        this.setState((oldState) => ({ loaded: !oldState.loaded }));
    }

    showApplication() {
        console.log('APP: ', this.state.app.manager.screen, this.state.app);
        switch (this.state.app.manager.screen) {
        case screenConst.LOADING:
            return screenConst.LOADING;
        case screenConst.LOGIN:
            return (
                <LoginScreen
                    sendMessage={sendMessage}
                    accounts={this.state.app.accounts}
                    message={messageConst.LOGIN}
                />
            );
        case screenConst.STARTSCREEN:
            return <StartScreen sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.PROFILE:
            return <Profile sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.SETTINGS:
            return <Settings sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.SELECTOPPONENT:
            return (
                <LoginScreen
                    sendMessage={sendMessage}
                    accounts={this.state.app.accounts}
                    message={messageConst.OPPONENT}
                    participants={this.state.app.participants}
                />
            );
        case screenConst.HEROSELECT:
            return (
                <HeroSelection
                    sendMessage={sendMessage}
                    app={this.state.app}
                    key={this.state.app.heroSelect.activePlayer}
                />
            );
        case screenConst.VS:
            return <PlayScreen sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.VERSUS:
            return <VersusScreen sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.GAMESCREEN:
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.OVER:
            return <GameScreen sendMessage={sendMessage} app={this.state.app} />;
        case screenConst.NETWORKSCREEN:
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
        const { loaded } = this.state;
        const needAdjustment = this.state.app.system === 768;
        return (
            <div className={needAdjustment ? 'app-768' : ''}>
                <div id="background" className="start-screen">
                    <CSSTransition classNames="moveForest" in={loaded} timeout={5000}>
                        <div>
                            <img alt="hut" src={hutImage} className="background-hut" />
                            <img
                                alt="grey tree 1"
                                src={greyTreeL}
                                className="background-greyTreeL"
                            />
                            <img
                                alt="grey tree 2"
                                src={greyTreeR}
                                className="background-greyTreeR"
                            />
                            <img
                                alt="black tree 1"
                                src={blackTreeL}
                                className="background-blackTreeL"
                            />
                            <img
                                alt="black tree 2"
                                src={blackTreeR}
                                className="background-blackTreeR"
                            />
                        </div>
                    </CSSTransition>
                </div>
                {this.showApplication()}
            </div>
        );
    }
}

export default App;
