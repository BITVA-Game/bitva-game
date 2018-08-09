import React from 'react';
import PropTypes from 'prop-types';
import './App.css';


const TopButton = props => (
    <div className="TopButton">
        <img className="TopIcon" src={props.icon} alt={props.icon} />
        <button type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.text}
        </button>
    </div>
);

TopButton.propTypes = {
    icon: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default TopButton;
