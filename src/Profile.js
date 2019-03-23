/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Profile.css';

const Profile = (props) => {
    const characters = props.app.profile.characters.map(character => (
        <span key={character}>{character}</span>
    ));
    const deck = props.app.profile.deck.map(card => (
        <span key={card}>{card}</span>
    ));

    return (
        <div className="profile-container app-background">
            <div className="profile">
                <p>Characters: {characters}</p>
                <p>Deck: {deck}</p>
                <p>Gold: {props.app.profile.gold}</p>
            </div>
            <MainMenu sendMessage={props.sendMessage} />
        </div>
    );
};

Profile.propTypes = {
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};
export default Profile;
