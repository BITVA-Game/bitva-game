import UIFx from 'uifx';

const click = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, { volume: 1 });
// temporary on top as graveyard sound is used as default for cards with no own sounds
const graveyardSound = new UIFx(`${process.env.PUBLIC_URL}/sound/graveyard.mp3`, { volume: 1.0 });

const attackItems = new UIFx(`${process.env.PUBLIC_URL}/sound/skullLantern.mp3`, { volume: 1.0 });
const attackItemOpponent = new UIFx(`${process.env.PUBLIC_URL}/sound/attackItemOpponent.mp3`, { volume: 1.0 });
const attackSound = new UIFx(`${process.env.PUBLIC_URL}/sound/attack.mp3`, { volume: 1.0 });
const birds = new UIFx(`${process.env.PUBLIC_URL}/sound/birds.mp3`, { volume: 1.0 });
const card = new UIFx(`${process.env.PUBLIC_URL}/sound/card.mp3`, { volume: 1.0 });
const cardsFromGrave = new UIFx(`${process.env.PUBLIC_URL}/sound/cards.mp3`, { volume: 1.0 });
const chainsSound = new UIFx(`${process.env.PUBLIC_URL}/sound/chains.mp3`, { volume: 1.0 });
const clairvoyanceSound = graveyardSound;
const healSound = new UIFx(`${process.env.PUBLIC_URL}/sound/heal.mp3`, { volume: 1.0 });
const heartBeat = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeat.mp3`, { volume: 1.0 });
const heartBeatFast = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeatFast.mp3`, { volume: 1.0 });
const heartBeatSingle = new UIFx(`${process.env.PUBLIC_URL}/sound/heartBeatSingle.mp3`, { volume: 1.0 });
const hozyaika = new UIFx(`${process.env.PUBLIC_URL}/sound/hozyaika.mp3`, { volume: 1.0 });
const itemSound = graveyardSound;
const magicMirror = new UIFx(`${process.env.PUBLIC_URL}/sound/mirror.mp3`, { volume: 1.0 });
const morevna = new UIFx(`${process.env.PUBLIC_URL}/sound/morevna.mp3`, { volume: 1.0 });
const premudraya = new UIFx(`${process.env.PUBLIC_URL}/sound/premudraya.mp3`, { volume: 1.0 });
const turningPotionSound = graveyardSound;
const yaga = new UIFx(`${process.env.PUBLIC_URL}/sound/yaga.mp3`, { volume: 1.0 });
const waterDead = new UIFx(`${process.env.PUBLIC_URL}/sound/waterDead.mp3`, { volume: 1.0 });
const waterLiving = new UIFx(`${process.env.PUBLIC_URL}/sound/waterLiving.mp3`, { volume: 1.0 });

export const action = {
    attackOpponent: attackSound,
    attackItemOpponent,
    attackItems,
    birds,
    card,
    cardsFromGrave,
    chains: chainsSound,
    clairvoyance: clairvoyanceSound,
    click,
    graveyard: graveyardSound,
    heal: healSound,
    heartBeat,
    heartBeatFast,
    heartBeatSingle,
    hozyaika,
    item: itemSound,
    magicMirror,
    morevna,
    premudraya,
    turningPotion: turningPotionSound,
    waterDead,
    waterLiving,
    yaga,
};

function playSound(type, soundOn, volume, count) {
    // console.log('We play Sound:', type, count);
    const sound = soundOn ? action[type].setVolume(volume * 1) : action[type].setVolume(0);
    if (!count) {
        sound.play();
    } else {
        const time = 500 * count;
        setTimeout(() => sound.play(), time);
        const n = count - 1;
        if (n === 0) {
            return null;
        }
        return playSound(type, soundOn, n);
    }
    return null;
}

export default playSound;
