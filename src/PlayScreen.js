import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/App.css";
import "./css/VersusScreen.css";

import { getAccountForPart } from "./rules";

class PlayScreen extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>
            {
              getAccountForPart(
                this.props.app,
                this.props.app.participants.player
              ).name
            }
          </h1>
          <h1>VS</h1>
          <h1>
            {
              getAccountForPart(
                this.props.app,
                this.props.app.participants.guest
              ).name
            }
          </h1>
          <button onClick={() => this.props.sendMessage({ type: "PLAY" })}>
            CLICK ME
          </button>
        </div>
      </div>
    );
  }
}

PlayScreen.propTypes = {
  app: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default PlayScreen;
