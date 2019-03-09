/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import ListOfHeroes from './ListOfHeroes';
import OneHero from './OneHero';
import './css/MainMenu.css';
import './css/App.css';
import './css/HeroSelection.css';
import styles from './css/HeroSelection.module.css';

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

const Play = props => (
    <div className="btn btn-play footer-menu" role="button" onClick={props.selectHero} onKeyPress={props.selectHero} tabIndex={props.tabIndex}>
        PLAY
    </div>
);

// footer section
const Footer = props => (
    <section className="heroselection-footer">
        {props.hero
            ? <BackButton onBack={props.onBack} />
            : null
        }
        <Play selectHero={props.selectHero} tabIndex="5" />

    </section>
);

const BackButton = props => (
    <div className="btn btn-back footer-menu" role="button" onClick={props.onBack} onKeyPress={props.onBack} tabIndex="10">
        &#767;
    </div>
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.defaultHeroID = this.app.heroSelect[Object.keys(this.app.heroSelect)[0]].id;
        this.state = {
            hero: null,
            selected: this.defaultHeroID,
        };
        this.showHero = this.showHero.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
        this.selectLeftHero = this.selectLeftHero.bind(this);
        this.selectRightHero = this.selectRightHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
        this.showHeroList = this.showHeroList.bind(this);
        this.showRightHero = this.showRightHero.bind(this);
        this.showLeftHero = this.showLeftHero.bind(this);
    }

    showHero() {
        const heroID = this.state.selected;
        const hero = this.app.heroSelect[heroID];
        this.setState({ hero });
    }

    showHeroList() {
        this.setState({ hero: null });
    }

    changeSelected(selected) {
        this.setState({ selected });
        this.showHero(this.app.heroSelect[selected]);
    }

    selectRightHero() {
        const heroes = Object.keys(this.app.heroSelect);
        let index = heroes.indexOf(this.state.selected);
        index = index === heroes.length - 1 ? 0 : index + 1;
        this.setState({ selected: heroes[index] });
    }

    selectLeftHero() {
        const heroes = Object.keys(this.app.heroSelect);
        let index = heroes.indexOf(this.state.selected);
        index = index === 0 ? heroes.length - 1 : index - 1;
        this.setState({ selected: heroes[index] });
    }

    showRightHero() {
        const heroes = Object.keys(this.app.heroSelect);
        let index = heroes.indexOf(this.state.selected);
        index = index === heroes.length - 1 ? 0 : index + 1;
        const heroID = this.state.selected;
        const hero = this.app.heroSelect[heroID];
        this.setState({ selected: heroes[index], hero: hero });    
    }

    showLeftHero() {
        this.selectLeftHero();
        this.showHero();
    }

    selectHero() {
        this.props.sendMessage({ type: 'HEROSELECTED', hero: this.state.selected });
    }

    render() {
        console.log(this.state.selected, this.state.hero);
        return (
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
                            />
                        )
                    }
                </div>
                <MainMenu sendMessage={this.props.sendMessage} />
                <Footer
                    hero={this.state.hero}
                    selectHero={this.selectHero}
                    onBack={this.showHeroList}
                />
            </div>
        );
    }
}

Header.propTypes = {
    selected: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,

    onShow: PropTypes.func.isRequired,
};

HeaderHeroButton.propTypes = {
    direction: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    funct: PropTypes.func.isRequired,
};

Footer.propTypes = {
    selectHero: PropTypes.func.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

HeaderHeroButton.propTypes = {
    funct: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
};

CharacterDetailsButton.propTypes = {
    onShow: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
};

Header.propTypes = {
    hero: PropTypes.object,
};

Header.defaultProps = {
    hero: null,
};

Footer.propTypes = {
    onBack: PropTypes.func.isRequired,
    hero: PropTypes.object,
};

Footer.defaultProps = {
    hero: null,
};

BackButton.propTypes = {
    onBack: PropTypes.func.isRequired,
};

Play.propTypes = {
    selectHero: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
};


export default HeroSelection;
