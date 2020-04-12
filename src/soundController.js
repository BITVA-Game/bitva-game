import UIFx from 'uifx';

const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 1.0 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });
const attackItemOpponent = new UIFx(`${process.env.PUBLIC_URL}/sound/attackItemOpponent.mp3`, { volume: 0.5 });
const cardsFromGrave = new UIFx(`${process.env.PUBLIC_URL}/sound/cards.mp3`, { volume: 0.5 });
const healSound = new UIFx(`${process.env.PUBLIC_URL}/sound/heal.mp3`, { volume: 0.5 });
const itemSound = graveyardSound;
const clairvoyanceSound = graveyardSound;
const turningPotionSound = graveyardSound;
const birds = new UIFx(`${process.env.PUBLIC_URL}/sound/birds.mp3`, { volume: 1.0 });
const card = new UIFx(`${process.env.PUBLIC_URL}/sound/card.mp3`, { volume: 1.0 });
const heartBeat = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeat.mp3`, { volume: 0.03 });
const heartBeatFast = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeatFast.mp3`, { volume: 0.5 });

const action = {
    graveyard: graveyardSound,
    attackOpponent: attackSound,
    attackItemOpponent,
    birds,
    chains: chainsSound,
    heal: healSound,
    item: itemSound,
    clairvoyance: clairvoyanceSound,
    turningPotion: turningPotionSound,
    cardsFromGrave,
    card,
    heartBeat,
    heartBeatFast,
};

function playSound(type, count) {
    // console.log('We play Sound:', type, count);
    if (!count) {
        action[type].play();
    } else {
        const time = 500 * count;
        setTimeout(() => action[type].play(), time);
        const n = count - 1;
        if (n === 0) {
            return null;
        }
        return playSound(type, n);
    }
    return null;
}

export default playSound;
