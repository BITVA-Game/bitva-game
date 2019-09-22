/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';
import MainMenu from '../MainMenu';
// import ListOfHeroes from './ListOfHeroes';
// import OneHero from './OneHero';
import '../css/App.css';
import '../css/HeroSelection.css';
import styles from '../css/HeroSelection.module.css';
import '../css/Cards.css';

import { sortedHeroesList } from '../rules';
import click2 from '../sound/fin.mp3';

const clickSound2 = new UIFx(click2, { volume: 1.0 });

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.heroesList = sortedHeroesList(this.app).map(h => h.id);
        this.state = {
            hero: null,
        };
    }

    select(heroID) {
        const hero = this.app.heroSelect.allHeroes[heroID];
        this.setState({ hero });
    }

    unselect() {
        this.setState({ hero: null });
    }

    play() {
        console.log('PLAY MESSAGE SENT', this.state.hero);
        clickSound2.play();
        this.props.sendMessage({ type: 'HEROSELECTED', hero: this.state.selected, player: this.app.heroSelect.activePlayer });
    }

    render() {
        return (
            <div>
                {/* this.state.hero ? <OneHero /> : <ListOfHeroes /> */}
                <MainMenu sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

export default HeroSelection;
