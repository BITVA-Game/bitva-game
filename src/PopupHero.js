import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './popup.css';
import morevna from './images/heroes/morevna.png';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>cross</button>
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className='app'>
        <h1>STAT</h1>
        <button onClick={this.togglePopup.bind(this)}>show /*popup</button>
        <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>*/
        {this.state.showPopup ? 
          <Popup
            text='Maria Morevna'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
};



ReactDOM.render(
  <App />,
  document.getElementById('content')
);
