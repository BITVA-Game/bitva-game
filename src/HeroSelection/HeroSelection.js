/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';

import MainMenu from './MainMenu';
import ListOfHeroes from './ListOfHeroes';
import OneHero from './OneHero';
import './css/MainMenu.css';
import './css/App.css';
import './css/HeroSelection.css';
import styles from './css/HeroSelection.module.css';
import { sortedHeroesList } from './rules';

const clickSound1 = new UIFx(`${process.env.PUBLIC_URL}/sound/click.mp3`, { volume: 1.0 });
const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, { volume: 1.0 });

// button in the header to choose previous or next character in the list
const HeaderHeroButton = props => (
    <div className={`btn hero-btn-arrow ${props.direction}`} role="button" onClick={props.funct} onKeyPress={props.funct} tabIndex={props.tabIndex}>
        {props.img}
    </div>
);

const CharacterDetailsButton = props => (
    <div className="btn header-menu btn-hero-details" role="button" onClick={props.onShow} onKeyPress={props.onShow} tabIndex={props.tabIndex}>
        CHARACTER DETAILS
    </div>
);

// common elements
// header section
const Header = props => (
    <section className="heroselection-header">
        <div className="header-menu heroselection-title">
            { props.hero ? 'Character details' : 'Select character' }
        </div>
        <div className="header-menu header-nav-menu">
            <HeaderHeroButton direction="hero-btn-arrow-left" funct={props.hero ? props.showPrev : props.prev} tabIndex="1" img="◀" />
            <div className="header-menu hero-nav-menu-name">
                {props.selected}
            </div>
            <HeaderHeroButton direction="hero-btn-arrow-right" funct={props.hero ? props.showNext : props.next} tabIndex="2" img="▶" />
        </div>
        { props.hero
            ? null : <CharacterDetailsButton onShow={props.onShow} tabIndex="4" />
        }
    </section>
);

const BackgroundAnimation = () => (
    <div className="hero-selection-screen-animation" />
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.heroesList = sortedHeroesList(this.app).map(h => h.id);
        this.defaultHeroID = this.heroesList[0];
        this.state = {
            hero: null,
            // selected: this.defaultHeroID,
            animation: null,
        };
        this.showHero = this.showHero.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        // this.selectLeftHero = this.selectLeftHero.bind(this);
        // this.selectRightHero = this.selectRightHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
        this.showHeroList = this.showHeroList.bind(this);
        // this.showRightHero = this.showRightHero.bind(this);
        // this.showLeftHero = this.showLeftHero.bind(this);
    }

    componentDidMount() {
        this.setState({ animation: 'background' });
        setTimeout(() => {
            this.setState({ animation: null });
        }, 1000);
    }

    showHero() {
        const heroID = this.state.selected;
        const hero = this.app.heroSelect.allHeroes[heroID];
        this.setState({ hero });
    }

    showHeroList() {
        this.setState({ hero: null });
    }

    changeSelected(selected) {
        this.setState({ selected });
    }

    selectRightHero() {
        const heroes = this.heroesList;
        let index = heroes.indexOf(this.state.selected);
        index = index === heroes.length - 1 ? 0 : index + 1;
        this.setState({ selected: heroes[index] });
        clickSound1.play();
    }

    selectLeftHero() {
        const heroes = this.heroesList;
        let index = heroes.indexOf(this.state.selected);
        index = index === 0 ? heroes.length - 1 : index - 1;
        this.setState({ selected: heroes[index] });
        clickSound1.play();
    }

    showRightHero() {
        const heroes = this.heroesList;
        let index = heroes.indexOf(this.state.selected);
        index = index === heroes.length - 1 ? 0 : index + 1;
        const hero = this.app.heroSelect[heroes[index]];
        this.setState({ selected: heroes[index], hero });
    }

    showLeftHero() {
        const heroes = this.heroesList;
        let index = heroes.indexOf(this.state.selected);
        index = index === 0 ? heroes.length - 1 : index - 1;
        const hero = this.app.heroSelect[heroes[index]];
        this.setState({ selected: heroes[index], hero });
    }

    selectHero() {
        clickSound2.play();
        this.props.sendMessage({ type: 'HEROSELECTED', hero: this.state.selected, player: this.app.heroSelect.activePlayer });
        this.showHeroList();
    }

    render() {
        // console.log(sortedHeroesList(this.app));
        // console.log(this.state.selected, this.state.hero);
        return (
            this.state.animation === 'background' ? <BackgroundAnimation />
                : (
                    <div className="heroselection-container">
                        <Header
                            hero={this.state.hero}
                            prev={this.selectLeftHero}
                            next={this.selectRightHero}
                            selected={this.state.selected}
                            onShow={this.showHero}
                            // for char details
                            showNext={this.showRightHero}
                            showPrev={this.showLeftHero}
                        />
                        <div className={styles.main}>
                            {this.state.hero
                                ? (
                                    <OneHero
                                        hero={this.state.hero}
                                    />
                                ) : (
                                    <ListOfHeroes
                                        app={this.props.app}
                                        onShow={this.showHero}
                                        changeSelected={this.changeSelected}
                                        selected={this.state.selected}
                                        opponent={!this.props.first}
                                    />
                                )
                            }
                        </div>
                        <MainMenu sendMessage={this.props.sendMessage} />
                    </div>
                )
        );
    }
}

Header.propTypes = {
    hero: PropTypes.object,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired,
    showNext: PropTypes.func.isRequired,
    showPrev: PropTypes.func.isRequired,
};

Header.defaultProps = {
    hero: null,
};

HeaderHeroButton.propTypes = {
    direction: PropTypes.string.isRequired,
    funct: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

CharacterDetailsButton.propTypes = {
    onShow: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
};


export default HeroSelection;
