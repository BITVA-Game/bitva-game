/* eslint-disable no-unused-vars */
// mock random function created for each case, tests and gameEngine are  corrected accordingly


function getRandomUpTo(n, caseName) {
    // console.log('We are in real getrandom!');
    return Math.floor(Math.random() * Math.floor(n));
}

exports.getRandomUpTo = getRandomUpTo;
