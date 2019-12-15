import UIFx from 'uifx';

const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 0.05 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });
const healSound = graveyardSound;
const itemSound = graveyardSound;
const clairvoyanceSound = graveyardSound;
const turningPotionSound = graveyardSound;

const action = {
    graveyard: graveyardSound,
    attackOpponent: attackSound,
    attackItemOpponent: attackSound,
    chains: chainsSound,
    heal: healSound,
    item: itemSound,
    clairvoyance: clairvoyanceSound,
    turningPotion: turningPotionSound,
};

function playSound(type) {
    action[type].play();
}

function soundController(type) {
    console.log('We are in isSound - graveyard!');

    playSound(type);
}

export default soundController;
