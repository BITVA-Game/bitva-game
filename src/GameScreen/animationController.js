import React, { useState, useEffect } from 'react';
import playSound from '../soundController';

const BirdsAnimation = () => {
    // animation duration time
    const animationDuration = 9000;
    const [birdsAnim, setBirdsAnim] = useState(false);

    // min time delay to start animation
    const minStart = 60000;
    // max time delay to start animation
    const maxStart = 180000;
    // random time delay to start animation between mmin and max values
    const animationStart = Math.floor(Math.random() * ((maxStart - minStart) + 1)) + minStart;

    // we need to change state after 1st render - didMount
    // and birdsAnim === true to return BIRDS
    // we need to make random delay
    // after random delay there will be another re-render
    // and we need to make birdsAnim = false
    // and to return birdsAnim == true with random delay

    const startBirds = () => setInterval(() => {
        playSound('birds');
        // console.log('birds animation starts in', animationStart / 60000);
        setBirdsAnim(true);
    }, animationDuration + animationStart);


    useEffect(() => {
        startBirds();
        if (birdsAnim === true) {
            clearInterval(startBirds);

            setTimeout(() => {
                setBirdsAnim(false);
            }, animationDuration);
        }
        return () => {
            clearInterval(startBirds);
        };
    }, [birdsAnim]);

    const birdsAnimComp = birdsAnim
        ? (
            <div className="animation-game-screen">
                <div className="bird-container bird-container-one">
                    <div className="bird bird-one" />
                </div>
                <div className="bird-container bird-container-two">
                    <div className="bird bird-two" />
                </div>
                <div className="bird-container bird-container-three">
                    <div className="bird bird-three" />
                </div>
            </div>
        ) : <div />;
    return birdsAnimComp;
};

export default BirdsAnimation;
