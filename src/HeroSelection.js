import React from 'react';
import PropTypes from 'prop-types';
import './App.css';


const HeroSelection = props => (
    <div>
        <button type="button" onClick={() => props.sendMessage({ type: 'HEROSELECTED', hero: 'Yaga' })}>
Select imaginary hero
        </button>
    </div>
);


HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default HeroSelection;
