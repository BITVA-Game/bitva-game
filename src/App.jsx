import React, { Component } from 'react';
import './App.css';

// Import electron and establis connection to use app.js as Renderer
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {

    // Set the initial state, before contacting backend.
    // Bind the function to send messages
    constructor(props){
        super(props);
        this.state = {gso: {state: "loading"} }
        this.sendMessage = this.sendMessage.bind(this);
    }

    // Using electron Renderer send message to Main process.
    sendMessage(msg){
        ipcRenderer.send('MSG', msg);
    }

    // When the page loads, get GSO from backend, save it to state.
    componentDidMount(){
        ipcRenderer.on("GSO", (event, arg) => {
            this.setState({ gso: arg });
        });
        this.sendMessage("Init");
    }

    render() {
        return (
            <div className="App" />
        );
    }
}

export default App;
