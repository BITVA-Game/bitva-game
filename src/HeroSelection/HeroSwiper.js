import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';

const HeaderHeroButton = props => (
    <div className={`btn hero-btn-arrow ${props.direction}`} role="button" onClick={props.funct} onKeyPress={props.funct} tabIndex={props.tabIndex}>
        {props.img}
    </div>
);

const HeroSwiper = (props) => {
    const heroIndex = props.allHeroes.findIndex(hero => hero.id === props.hero.id);
    const prevIndex = heroIndex === 0 ? props.allHeroes.length - 1 : heroIndex - 1;
    const nextIndex = heroIndex === props.allHeroes.length - 1 ? 0 : heroIndex + 1;
    const prevID = props.allHeroes[prevIndex].id;
    const nextID = props.allHeroes[nextIndex].id;

    return (
        <div className="header-menu header-nav-menu">
            <HeaderHeroButton direction="hero-btn-arrow-left" funct={() => props.select(prevID)} tabIndex="1" img="◀" />
            <div className="header-menu hero-nav-menu-name">
                {props.hero.name}
            </div>
            <HeaderHeroButton direction="hero-btn-arrow-right" funct={() => props.select(nextID)} tabIndex="2" img="▶" />
        </div>
    );
};

HeaderHeroButton.propTypes = {
    direction: PropTypes.string.isRequired,
    funct: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

HeroSwiper.propTypes = {
    hero: PropTypes.object.isRequired,
    allHeroes: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
};

export default HeroSwiper;
