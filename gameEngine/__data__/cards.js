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

export default {
    apple, bogatyr, shieldSmall, wolf, shieldLarge,
};
