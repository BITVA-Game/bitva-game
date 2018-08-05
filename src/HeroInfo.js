import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import HeroSelection from './HeroSelection.js';
import chars from './images/IconCharacters.png';
import cards from './images/IconCards.png';
import silver from './images/IconMoney.png';

/*
const HeroInfo = props => (
    <div>
        <button type="button" onClick={() => props.sendMessage({ type: 'HEROSELECTED', hero: 'Yaga' })}>
Select imaginary hero
        </button>
    </div>
);
*/

const BackButton = props => (
    <div className="BackButton">
        <img className="BackButton" src={props.icon} alt={props.icon} />
        <button type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.text}
        </button>
    </div>
);

const CaharacterName = props => (
    <div>
        <div className="CharacterInfo">
            <img className="CharacterImage" src={character} alt="CharacterImage" />
            <img className="FirstCard" src={card} alt="FirstCard" />
                <MenuButton name="ArrowBack" type="ArrowBack" sendMessage={props.sendMessage} />
                <MenuButton name="ArrowForward" type="ArrowForward" sendMessage={props.sendMessage} />
                
            </div>
    
    <div className="LowShelf">
            <TopButton icon={chars} sendMessage={props.sendMessage} type="PROPFILECHARACTERS" text="Back" />
            <TopButton icon={cards} sendMessage={props.sendMessage} type="PROPFILECARDS" text="Select" />
       </div>
    </div>
);

HeroInfo.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default HeroInfo;
