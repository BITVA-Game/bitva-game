import UIFx from 'uifx';


const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 0.05 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });

// sound controller function to manage all sounds in project
export default function isSound(game, type) {
    console.log('We are in isSound - Sound controller!');

    // we play attack sound if active player attacks opponent or its item
    if (type === 'attackOpponent' || type === 'attackItemOpponent') {
        console.log('We are in isSound - attack Opponent or its item!');
        attackSound.play();
        // eslint-disable-next-line no-param-reassign
        game.lastAction.type = '';
    }
    // we play graveyard sound if player drops card to graveyard
    if (type === 'graveyard') {
        console.log('We are in isSound - graveyard!');
        graveyardSound.play();
        // eslint-disable-next-line no-param-reassign
        game.lastAction.type = '';
    }
    // we play chains sound if player got chained property by oven or mushroom card
    if (type === 'chains') {
        chainsSound.play();
        // eslint-disable-next-line no-param-reassign
        game.lastAction.type = '';
    }

}
