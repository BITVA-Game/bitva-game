/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';
import MainMenu from '../MainMenu';
import HeroSwiper from './HeroSwiper';
import ListOfHeroesContent from './ListOfHeroes';
import OneHeroContent from './OneHero';
import '../css/App.css';
import '../css/HeroSelection.css';
import '../css/Cards.css';

import { sortedHeroesList, getCurrentPlayer } from '../rules';
import playSound from '../soundController';

const { message } = require('../constants');

// const clickSound1 = new UIFx(`${process.env.PUBLIC_URL}/sound/click.mp3`, { volume: 1.0 });
const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, {
    volume: 1.0,
});

const Header = (props) => (
    <header className="main-header">
        <div className="hs-header-item">
            <div>{props.title}</div>
        </div>
        <div className="hs-header-item hs-header-item-centered">
            {props.centre}
        </div>
        <div className="hs-header-item">
            <div className="heroselection-playername">{props.playerName}</div>
        </div>
    </header>
);

const OneHero = ({
    heroesList, select, hero, unselect, play, app,
}) => {
    const swiper = (
        <HeroSwiper
            hero={hero}
            allHeroes={heroesList()}
            select={select}
        />
    );

    return (
        <div className="main-container">
            <Header title="Character Details" centre={swiper} playerName={getCurrentPlayer(app)} />
            <OneHeroContent
                hero={hero}
                unselect={unselect}
                play={play}
                isAvailable={app.heroSelect.heroes.includes(hero.id)}
            />
        </div>
    );
};

const ListOfHeroes = ({ heroesList, select, app }) => (
    <div className="main-container">
        <Header title="Select Character" playerName={getCurrentPlayer(app)} />
        <ListOfHeroesContent
            heroesID={app.heroSelect.heroes}
            allHeroes={heroesList()}
            select={select}
        />
    </div>
);

const HeroSelection = (props) => {
    const [hero, setHero] = useState(null);
    const { app } = props;
    const select = (heroID) => {
        const currentHero = app.heroSelect.allHeroes[heroID];
        setHero(currentHero);
    };
    const unselect = () => setHero(null);
    const play = () => {
        clickSound2.play();
        props.sendMessage({
            type: message.HEROSELECTED,
            hero: hero.id,
            player: app.heroSelect.activePlayer,
        });
        if (props.sendMessage && hero.id) {
            playSound(hero.id);
        }
    };
    const heroesList = () => Object.values(sortedHeroesList(app));

    return (
        <div>
            {hero
                ? <OneHero app={app} heroesList={heroesList} select={select} unselect={unselect} play={play} hero={hero} />
                : <ListOfHeroes app={app} heroesList={heroesList} select={select} />}
            <MainMenu sendMessage={props.sendMessage} />
        </div>
    );
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

OneHero.propTypes = {
    heroesList: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    unselect: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

ListOfHeroes.propTypes = {
    heroesList: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    centre: PropTypes.object,
    playerName: PropTypes.string.isRequired,
};

Header.defaultProps = {
    centre: undefined,
};

export default HeroSelection;
