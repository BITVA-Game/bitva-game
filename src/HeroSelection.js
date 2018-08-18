import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/HeroSelection.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

const HeroDetails = props => (
    <div className="HeroDetails"><p>{props.hero.id}</p><p>{props.hero.description}</p></div>
);

// Individual hero block, repeates to display every character
const HeroBlock = props => (
    <div className="HeroBlock">
        <button type="button" hero={props.hero} onClick={() => props.showDetails(props.hero)}>
            Info
        </button>
        <button type="button" onClick={() => props.onShow(props.hero)}>
            <img src={images[props.hero.id]} alt={props.hero.id} />
        </button>
    </div>
);

// List of all characters, for each the HeroBlock is displayed.
// Click will take the player into character info screen
const ListOfHeroes = props => (
    <div className="HeroSelection">
        <h3>
            Select one character
        </h3>
        {Object.values(props.app.heroSelect).map(hero => (
            <HeroBlock key={hero.id} onShow={props.onShow} showDetails={props.showDetails} hero={hero} />
        ))}
    </div>
);

// Info about one hero. The click on the image should show a popup with char details
const OneHero = props => (
    <div className="OneHero">
        <h3>
            Character
            {props.hero.name}
        </h3>
        <img src={images[props.hero.id]} alt={props.hero.id} />
        <div>
            <button type="button" onClick={() => props.onBack()}>
                Back
            </button>
            <button type="button" onClick={() => props.onSelect(props.hero)}>
                Select
            </button>
        </div>
    </div>
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.state = { hero: null, details: null };
        this.showHero = this.showHero.bind(this);
        this.selectHero = this.selectHero.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    showHero(hero) {
        this.setState({ hero });
    }

    selectHero(hero) {
        this.props.sendMessage({ type: 'HEROSELECTED', hero: hero.id });
    }

    showDetails(hero) {
        this.setState({details: hero})
    }

    render() {
        return (
            <div>
                {this.state.hero
                    ? <OneHero hero={this.state.hero} onBack={this.showHero} onSelect={this.selectHero}/>
                    : <ListOfHeroes app={this.props.app} onShow={this.showHero} showDetails={this.showDetails}/>}
                {this.state.details
                    ? <HeroDetails hero={this.state.details}/>
                    : null}
            </div>
        )
        }
}

HeroBlock.propTypes = {
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};


export default HeroSelection;
