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
const heartBeat = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeat.mp3`, { volume: 0.5 });
const heartBeatFast = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeatFast.mp3`, { volume: 0.5 });
const heartBeatSingle = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeat.mp3`, { volume: 0.85 });
const magicMirror = new UIFx(`${process.env.PUBLIC_URL}/sound/mirror.mp3`, { volume: 0.5 });
const attackItems = new UIFx(`${process.env.PUBLIC_URL}/sound/skullLantern.mp3`, { volume: 1.0 });
const hozyaika = new UIFx(`${process.env.PUBLIC_URL}/sound/hozyaika.mp3`, { volume: 1.0 });
const morevna = new UIFx(`${process.env.PUBLIC_URL}/sound/morevna.mp3`, { volume: 1.0 });
const premudraya = new UIFx(`${process.env.PUBLIC_URL}/sound/premudraya.mp3`, { volume: 1.0 });
const yaga = new UIFx(`${process.env.PUBLIC_URL}/sound/yaga.mp3`, { volume: 1.0 });
const waterDead = new UIFx(`${process.env.PUBLIC_URL}/sound/waterDead.mp3`, { volume: 1.0 });


export const action = {
    graveyard: graveyardSound,
    attackOpponent: attackSound,
    attackItemOpponent,
    attackItems,
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
    heartBeatSingle,
    magicMirror,
    hozyaika,
    morevna,
    premudraya,
    yaga,
    waterDead,
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
