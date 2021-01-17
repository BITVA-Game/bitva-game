import React from 'react';
import PropTypes from 'prop-types';
import SkinInfo from './layout/SkinInfo';

const tutorialDescription = () => (
    <div style={{ fontSize: '24px', color: 'black', textAlign: 'center' }}>
        And here comes the time for the epiquie battle - BITVA.
        <br />
        {' '}
        Come in and try your weapon, magic might and allies.
    </div>
);

const Tutorial = (props) => (
    <div className="main-container">
        <header className="main-header">WELCOME TO TUTORIAL!</header>
        <section className="main-content">
            <SkinInfo>
                <div className="login-profiles">
                    {tutorialDescription()}
                </div>
                <div className="login-buttons">
                    <button
                        type="button"
                        className="login-button"
                        onClick={() => {
                            console.log('WE ARE IN CLICK TO GO BACK -> LOGIN');
                            props.sendMessage({ type: 'LOGIN', account: props.app.activeAccount });
                        }}
                    >
                        BACK
                    </button>
                    <button type="button" className="login-button" onClick={() => {}}>START TUTORIAL</button>
                </div>
            </SkinInfo>
        </section>
        <footer className="main-footer" />
    </div>

);

Tutorial.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,

};

export default Tutorial;
