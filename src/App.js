import React, { Component } from 'react';
import './App.css';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function sendMessage(msg) {
    ipcRenderer.send('MSG', msg);
}

class App extends Component {
    // Set the initial state, before contacting backend.
    // Bind the function to send messages
    constructor(props) {
        super(props);
        this.state = { app: { state: 'loading' } };
    }


    // When the page loads, get GSO from backend, save it to state.
    componentDidMount() {
        ipcRenderer.on('APP', (event, arg) => {
            this.setState({ app: arg });
        });
        sendMessage('Init');
    }


    render() {
        console.log(this.state.app);
        return (
            <div className="App" />
        );
    }
}

export default App;
