const apple = {
    id: 'apple',
    name: 'Apple',
    type: 'action',
    icon: 'dropRed',
    category: 'heal',
    categoryName: 'heal',
    description: 'Magic youth-giving apples',
    initialpoints: 2,
    points: 2,
    disabled: false,
};

const bogatyr = {
    id: 'bogatyr',
    name: 'Bogatyr',
    type: 'action',
    icon: 'skull',
    category: 'attack',
    categoryName: 'attack',
    description: 'Hero-warrior',
    initialpoints: 4,
    points: 4,
    disabled: false,
};

const shieldSmall = {
    id: 'shieldSmall',
    name: 'Small Shield',
    type: 'item',
    icon: 'shield',
    category: 'shield',
    categoryName: 'shield',
    description: 'The shield',
    health: 2,
    healthCurrent: 2,
    disabled: false,
};

const wolf = {
    id: 'wolf',
    name: 'Grey Wolf',
    type: 'action',
    icon: 'skull',
    category: 'attack',
    categoryName: 'attack',
    description: 'Strong and dangerous enemy.',
    initialpoints: 2,
    points: 2,
    disabled: false,
};

const shieldLarge = {
    id: 'shieldLarge',
    name: 'Large Shield',
    type: 'item',
    icon: 'shield',
    category: 'shield',
    categoryName: 'shield',
    description: 'The shield, forged by Svarog',
    health: 4,
    healthCurrent: 4,
    disabled: false,
};

const waterLiving = {

    id: 'waterLiving',
    name: 'Living Water',
    type: 'item',
    icon: 'heartRed',
    category: 'heal',
    categoryName: 'heal',
    description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
    health: 3,
    healthCurrent: 3,
    initialpoints: 1,
    points: 1,
    disabled: false,
};

const waterDead = {
    id: 'waterDead',
    name: 'Dead Water',
    type: 'item',
    icon: 'heartBlack',
    category: 'damage',
    categoryName: 'damage',
    description: 'Dead water deals damage to the health. It kills the wounded and turns enemy into forever dead.',
    health: 3,
    healthCurrent: 3,
    initialpoints: 1,
    points: 1,
    disabled: false,
};

const russianOven = {
    id: 'russianOven',
    name: 'Russian Oven',
    type: 'action',
    icon: 'ballChain',
    category: 'holdCard',
    categoryName: 'hold',
    description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
    initialpoints: 2,
    points: 2,
    disabled: false,
};

const turningPotion = {
    id: 'turningPotion',
    name: 'The Turning Potion',
    type: 'action',
    icon: 'arrows',
    category: 'turning',
    categoryName: 'turning',
    description: "Deep underground the luminous moss grows. The Potion made of it allows to intoxicate the enemy's consciousness and to enjoy an advantage",
    disabled: false,
};

const plateMail = {
    id: 'plateMail',
    name: 'Plate Mail',
    type: 'item',
    icon: 'hand',
    category: 'reflect',
    categoryName: 'reflect',
    description: "Plate mail is a  bogatyr's armor. Bewitched plate mail is saving warrior's life, reflecting enemy's attack turning stroke back.",
    health: 3,
    healthCurrent: 3,
    disabled: false,
};

const raven = {
    id: 'raven',
    name: 'Raven',
    type: 'action',
    icon: 'skull',
    category: 'attack',
    categoryName: 'attack',
    description: "Raven is Yaga's faithful companion. Keeper of arcane knowledge, giving sage advice. Master of Living and Dead Water secrecy.",
    initialpoints: 1,
    points: 1,
    disabled: false,
};

const clairvoyance = {
    id: 'clairvoyance',
    name: 'Clairvoyance',
    type: 'action',
    icon: 'eye',
    category: 'showCards',
    categoryName: 'show',
    description: '«Second vision». This gift offers great possibilities. It helps to see the lie, to see damage ahead and to avoid it. ',
    initialpoints: 1,
    points: 1,
    disabled: false,
};

const malachiteBox = {
    id: 'malachiteBox',
    name: 'Malachite Box',
    type: 'item',
    icon: 'deckMove',
    category: 'generator',
    categoryName: 'create',
    description: "Maid's gift. But it has a hidden agenda and brings miseries to the person who opens box without permission.",
    health: 2,
    healthCurrent: 2,
    disabled: false,
};

export default {
    apple,
    bogatyr,
    shieldSmall,
    wolf,
    shieldLarge,
    waterLiving,
    waterDead,
    russianOven,
    turningPotion,
    plateMail,
    raven,
    clairvoyance,
    malachiteBox,
};
