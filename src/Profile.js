/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from './MainMenu';
import './css/Profile.css';

// import { getActiveProfile, getInActivePlayer } from './rules';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';
// import hozyaika from './images/heroes/hozyaika.jpg';
import premudraya from './images/heroes/premudraya.jpg';

const Profile = (props) => {
    // const profile = getActiveProfile(props.app);
    // console.log(profile);
    // const characters = profile.characters.map(character => (
    //     <span key={character}>{character}</span>
    // ));
    // const deck = profile.deck.map(card => (
    //     <span key={card}>{card}</span>
    // ));
    return (
        <div className="profile-container">
            <div className="profile">
                <div className="profile-header">
                    <div className="profile-name">
                        {/* <h1>{`${props.app.game.active}'s profile`}</h1> */}
                        <h1>Inga's profile</h1>
                    </div>
                    <div className="profile-currency">
                        Gold x 50
                    </div>
                </div>
                <div className="profile-characters">
                    <div className="profile-character-container">
                        <div className="profile-character-image-container">
                            <img className="profile-character-image" src={morevna} border="5" alt="Morevna" />
                        </div>
                        <div className="profile-character-info-container">
                            <h3 className="profile-character-name">Morevna</h3>
                            <div>Wins: 82%</div>
                            <div>Matches played: 100</div>
                            <div>Special cards: 2/3</div>
                        </div>
                    </div>
                    <div className="profile-character-container">
                        <div className="profile-character-image-container">
                            <img className="profile-character-image" src={yaga} border="5" alt="Yaga" />
                        </div>
                        <div className="profile-character-info-container">
                            <h3 className="profile-character-name">Yaga</h3>
                            <div>Wins: 50%</div>
                            <div>Matches played: 60</div>
                            <div>Special cards: 1/3</div>
                        </div>
                    </div>
                    <div className="profile-character-container">
                        <div className="profile-character-image-container">
                            <img className="profile-character-image" src={premudraya} border="5" alt="Premudraya" />
                        </div>
                        <div className="profile-character-info-container">
                            <h3 className="profile-character-name">Premudraya</h3>
                            <div>Wins: 69%</div>
                            <div>Matches played: 200</div>
                            <div>Special cards: 3/3</div>
                        </div>
                    </div>
                </div>
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
