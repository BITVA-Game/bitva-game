import React, { Component } from 'react';
import './css/App.css';
import StartScreen from './StartScreen';
import HeroSelection from './HeroSelection';
import VersusScreen from './VersusScreen';
import WebFont from 'webfontloader';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function sendMessage(msg) {
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
        case 'HEROSELECT':
            return <HeroSelection sendMessage={sendMessage} app={this.state.app} />;
        case 'VERSUS':
            return <VersusScreen sendMessage={sendMessage} app={this.state.app} />;
        default:
            return `UNKNOWN SCREEN NAME ${this.state.app.manager.screen}`;
        }
    }

    render() {
        console.log(this.state.app.manager.screen);
        WebFont.load({
            custom: {
               families: ['Ruslan Display'],
               urls: ['/fonts/RuslanDisplay.css']
             }
          });
        return (
            <div className="App">
                {this.showApplication()}
            </div>
        );
    }
}

export default App;
