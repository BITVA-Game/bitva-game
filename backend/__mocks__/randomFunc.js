// eslint-disable-next-line import/prefer-default-export
export function getRandomUpTo(name, n) {
    console.log('We are in mock getrandom!');
    // return Math.floor(Math.random() * Math.floor(n));
    if (name === 'bowArrow') { return 4; }
}

exports.getRandomUpTo = getRandomUpTo;
