import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/HeroSelection.css';

const HeaderHeroButton = (props) => (
    <div className={`btn btn-${props.dir}`} role="button" onClick={props.funct} onKeyPress={props.funct} tabIndex={props.tabIndex}>
        <svg viewBox="0 0 24 24">
            <path fill="none" stroke="#ECEBEB" strokeWidth="2" d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z" />
        </svg>
    </div>
);

const HeroSwiper = (props) => {
    const heroIndex = props.allHeroes.findIndex((hero) => hero.id === props.hero.id);
    const prevIndex = heroIndex === 0 ? props.allHeroes.length - 1 : heroIndex - 1;
    const nextIndex = heroIndex === props.allHeroes.length - 1 ? 0 : heroIndex + 1;
    const prevID = props.allHeroes[prevIndex].id;
    const nextID = props.allHeroes[nextIndex].id;

    return (
        <div className="header-menu">
            <HeaderHeroButton funct={() => props.select(prevID)} tabIndex="1" dir="prev" />
            <div className="hero-nav-menu-name">
                {props.hero.name}
            </div>
            <HeaderHeroButton funct={() => props.select(nextID)} tabIndex="2" dir="next" />
        </div>
    );
};

HeaderHeroButton.propTypes = {
    funct: PropTypes.func.isRequired,
    tabIndex: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
};

HeroSwiper.propTypes = {
    hero: PropTypes.object.isRequired,
    allHeroes: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
};

export default HeroSwiper;
