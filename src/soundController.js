import UIFx from 'uifx';

const { action } = require('../constants');


const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 0.1 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });

// sound controller function to manage all sounds in project
export default function isSound(type) {
    console.log('We are in isSound - Sound controller!');

    // we play attack sound if active player attacks opponent or its item
    if (type === action.ATACKOPPONENT || type === action.ATTACKITEMOPPONENT) {
        attackSound.play();
    }
    // we play graveyard sound if player drops card to graveyard
    if (type === action.GRAVEYARD) {
        graveyardSound.play();
    }
    // we play chains sound if player got chained property by oven or mushroom card
    if (type === action.CHAINS) {
        chainsSound.play();
    }
}
