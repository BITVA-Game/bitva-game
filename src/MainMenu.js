import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import chars from './images/IconCharacters.png';
import cards from './images/IconCards.png';
import silver from './images/IconMoney.png';
import gold from './images/IconSpecial.png';
import ornament from './images/MainOrnament.jpg';


const TopButton = props => (
    <div className="TopButton">
        <img className="TopIcon" src={props.icon} alt={props.icon} />
        <button type="button" onClick={() => props.sendMessage({ type: props.type })}>
            {props.text}
        </button>
    </div>
);

const MainMenu = props => (
    <div>
        <div className="TopShelf">
            <TopButton icon={chars} sendMessage={props.sendMessage} type="PROPFILECHARACTERS" text="Characters" />
            <TopButton icon={cards} sendMessage={props.sendMessage} type="PROPFILECARDS" text="Cards" />
            <TopButton icon={silver} sendMessage={props.sendMessage} type="SHOP" text="Coins" />
            <TopButton icon={gold} sendMessage={props.sendMessage} type="SHOP" text="Shards" />
        </div>
        {/* <textarea value={JSON.stringify(props.app.profile)} /> */}
        <div className="Content">
            <img className="MainOrnament" src={ornament} alt="MainOrnament" />
            <ul>
                <li>
                    <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: 'PROFILE' })}>
                        Profile
                    </button>
                </li>
                <li>
                    <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: 'SETTINGS' })}>
                        Settings
                    </button>
                </li>
                <li>
                    <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: 'PLAY' })}>
                        Play PvP
                    </button>
                </li>
                <li>
                    <button className="MenuButton" type="button" onClick={() => props.sendMessage({ type: 'PLAY' })}>
                        Play Story
                    </button>
                </li>
            </ul>
        </div>
    </div>
);

MainMenu.propTypes = {
    // app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

TopButton.propTypes = {
    icon: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

export default MainMenu;
