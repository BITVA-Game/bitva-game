import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/TopMenu.css';
import './css/MainMenu.css';
import TopButton from './TopButton';

import chars from './images/IconCharacters.png';
import cards from './images/IconCards.png';
import silver from './images/IconMoney.png';
import gold from './images/IconSpecial.png';
import ornament from './images/MainOrnament.jpg';
import drakon from './images/dragon-1.png';


const MenuButton = props => (
    <li>
        <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.name}
        </button>
    </li>
);

const MainMenu = props => (
    <div className="MainMenuContainer">
        <div className="TopShelf">
            <TopButton icon={chars} sendMessage={props.sendMessage} type="PROPFILECHARACTERS" text="Characters" />
            <TopButton icon={cards} sendMessage={props.sendMessage} type="PROPFILECARDS" text="Cards" />
            <TopButton icon={silver} sendMessage={props.sendMessage} type="SHOP" text="Coins" />
            <TopButton icon={gold} sendMessage={props.sendMessage} type="SHOP" text="Shards" />
        </div>
        {/* <textarea value={JSON.stringify(props.app.profile)} /> */}
        <div className="Content">
          <div className="DrakonImage">
            <img className="MainDrakonLeft" src={drakon} alt="MainDrakon" />
          </div>
          <ul>
            <MenuButton name="Profile" type="PROFILE" sendMessage={props.sendMessage} />
            <MenuButton name="Settings" type="SETTINGS" sendMessage={props.sendMessage} />
            <MenuButton name="Play PvP" type="PLAY" sendMessage={props.sendMessage} />
            <MenuButton name="Play Story" type="PLAY" sendMessage={props.sendMessage} />
          </ul>
          <div className="DrakonImage">
            <img className="MainDrakonRight" src={drakon} alt="MainDrakon" />
          </div>
        </div>
    </div>
);

MainMenu.propTypes = {
    // app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

MenuButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
