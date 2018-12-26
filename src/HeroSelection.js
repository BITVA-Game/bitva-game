import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/MainMenu.css';
import './css/App.css';
import './css/HeroSelection.css';
import styles from './css/HeroSelection.module.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
import heart from './images/icons/heart.png';

const images = {
    yaga,
    morevna,
};

function isAvailable(app, hero) {
    return app.profile.characters.find(character => character === hero.id);
}

const HeaderHeroButton = props => (
    <div className={`btn hero-nav-menu-btn hero-btn-arrow ${props.direction}`} role="button" onClick={props.funct} onKeyPress={props.funct} tabIndex={props.tabIndex}>
        {props.img}
    </div>
);

// common elements
// header section
const Header = props => (
    <section className="heroselection-header">
        <div className="header-menu heroselection-title">
            <span>
                SELECT CHARACTER
            </span>
        </div>
        <div className="header-menu header-nav-menu">
            <HeaderHeroButton direction="hero-btn-arrow-left" funct={props.prev} tabIndex="1" img="◀" />
            <div className="hero-nav-menu-name header-menu">
                {props.selected}
            </div>
            <HeaderHeroButton direction="hero-btn-arrow-right" funct={props.next} tabIndex="2" img="▶" />
        </div>
        { props.hero
            ? null : (
                <div className="btn btn-hero-details header-menu" role="button" onClick={props.onShow} onKeyPress={props.onShow} tabIndex="4">
                    <span>
                  CHARACTER DETAILS
                    </span>
                </div>
            )
        }
    </section>
);

// footer section
const Footer = props => (
    <section className="heroselection-footer">
        {props.hero
            ? <BackButton onBack={props.onBack} />
            : null
        }
        <div className="heroselection-footer-menu heroselection-play">
            <div className="btn btn-play footer-menu" role="button" onClick={props.selectHero} onKeyPress={props.selectHero} tabIndex="5">
                PLAY
            </div>
        </div>
    </section>
);

// Individual hero block, repeates to display every character
const HeroBlock = props => (
    <div className={isAvailable(props.app, props.hero) ? 'hero-block' : 'hero-block hero-inaccessable'}>
        <div className={props.selected ? 'btn-hero btn-hero-selected' : 'btn-hero icons-inactive'} role="button" onClick={props.onShow} onKeyPress={props.onShow} tabIndex="-1">
            <img className="heroselection-hero-image" src={images[props.hero.id]} alt={props.hero.id} />
            <div className="deck-icon">
                <div className="deck-text">
                    {props.hero.cardsNumber}
                </div>
            </div>
            <div className="health-container">
                <img className="health" src={heart} alt="" />
                <div className="health-text">
                    {props.hero.health}
                </div>
            </div>
            {/* <div className="hero-name hero-nav-menu-name header-menu">
                {props.hero.name}
            </div> */}
        </div>
    </div>
);

// List of all characters, for each the HeroBlock is displayed.
// Click will take the player into character info screen
const ListOfHeroes = props => (
    <div className="heroes-list">
        {Object.values(props.app.heroSelect).map(hero => (
            <HeroBlock
                key={hero.id}
                onShow={props.onShow}
                hero={hero}
                app={props.app}
                selected={hero.id === props.selected}
                changeSelected={props.changeSelected}
            />
        ))}
    </div>
);

const HeroImage = props => (
    <div className="details-hero">
        <div className="details-hero-avatar">
            <img src={images[props.heroid]} alt={props.heroid} />
        </div>
    </div>
);


const BackButton = props => (
    <div className="details-hero-btn-block">
        <div className="btn btn-back footer-menu" role="button" onClick={props.onBack} onKeyPress={props.onBack} tabIndex="10">
          &#767;
        </div>
    </div>
);

const CardPreview = props => (
    props.card
    ? <img className="details-card" data-card={props.card} src={images["morevna"]} alt={props.card.name} tabIndex={props.tabIndex} />
    : <img className="details-card" style={{opacity: "0.25"}} src={images["yaga"]} alt="card" />
)

const CardsRow = props => (
  <>
    <CardPreview card={props.cards[props.row[0]]} tabIndex="6"/>
    <CardPreview card={props.cards[props.row[1]]} tabIndex="7"/>
    <CardPreview card={props.cards[props.row[2]]} tabIndex="8"/>
  </>
)


function prepairCards(cards){
  let cardsKeys = Object.keys(cards);
  let cardsBy3 = [];
  for(let i=0; i<cardsKeys.length; i=i+3){
    cardsBy3.push(cardsKeys.slice(i, i+3));
  }
  return cardsBy3;
}

class CardsBlock extends Component {
  constructor(props){
    super(props);
    this.cardsBy3 = prepairCards(props.cards);
    this.state = {row: 0}
    this.changeRow = this.changeRow.bind(this);
  }

  changeRow(){
    console.log("changeRow ", this.state.row);
    let maxRotation = this.cardsBy3.length-1;
    let currentRow = this.state.row;
    if (currentRow==maxRotation){
      this.setState({ row: 0 })
    } else {
      this.setState({ row: currentRow+1 })
    }
  }

  render(){
    return (
      <section className="details-cards">
          <div className="btn cards-btn cards-btn-left" role="button" onClick={this.changeRow} onKeyPress={this.changeRow} tabIndex="5">
              ◀
          </div>
          <CardsRow heroId={this.props.heroId} row={this.cardsBy3[this.state.row]} cards={this.props.cards}/>
          <div className="btn cards-btn cards-btn-right" role="button" onClick={this.changeRow} onKeyPress={this.changeRow} tabIndex="9">
              ▶
          </div>
      </section>
    )
  }
}

// Info about one hero. The click on the image should show a popup with char details
const OneHero = props => (
    <div className={styles.details}>
        <HeroImage heroid={props.hero.id} />
        <div className="details-info-block">
            <article className="details-description">
                <span>
                    {props.hero.description}
                    {console.log("PROPS HERO ", props.hero.cards)}
                </span>
            </article>
            <CardsBlock heroId={props.hero.id} cards={props.hero.cards}/>
        </div>
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
    }


    showHero() {
        const heroID = this.state.selected;
        const hero = this.app.heroSelect[heroID];
        this.setState({ hero });

    }

    showHeroList() {
        this.setState({ hero: null })
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

    selectHero() {
        this.props.sendMessage({ type: 'HEROSELECTED', hero: this.state.selected });
    }

    render() {
        return (
            <div className="heroselection-container">
                <Header
                    hero={this.state.hero}
                    prev={this.selectLeftHero}
                    next={this.selectRightHero}
                    selected={this.state.selected}
                    onShow={this.showHero}
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
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
};

Footer.propTypes = {
    // something: PropTypes.string.isRequired,
    selectHero: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

HeroBlock.propTypes = {
    app: PropTypes.object.isRequired,
    // changeSelected: PropTypes.func.isRequired,
    hero: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

ListOfHeroes.propTypes = {
    app: PropTypes.object.isRequired,
    changeSelected: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.object.isRequired,
};

HeroImage.propTypes = {
    heroid: PropTypes.string.isRequired,
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

Header.propTypes = {
};

Footer.propTypes = {
    onBack: PropTypes.func.isRequired,
};

BackButton.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default HeroSelection;
