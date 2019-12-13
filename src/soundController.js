import UIFx from 'uifx';
import rules from './rules';


const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 0.1 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });

export default function isSound(player, active, target) {
    console.log('We are in isSound - Sound controller!');
    console.log('player', player);
    console.log('target', target);
    console.log('active', active);
        
    // // we play attack sound if active player attacks opponent or its item
    // if (!active && target !== 'graveyard') {
    //     if (rules(player, target)) {
    //         attackSound.play();
    //     }
    // }
    // // we play graveyard sound if player drops card to graveyard
    // if (target === 'graveyard') {
    //     graveyardSound.play();
    // }
    if (player.chained.includes('mushroom')
    || player.chained.includes('oven')) {
        chainsSound.play();
    }
}
