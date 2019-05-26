/* eslint-disable no-unused-vars */

function getRandomUpTo(n, caseName) {
    // console.log('We are in real getrandom!');
    return Math.floor(Math.random() * Math.floor(n));
}

exports.getRandomUpTo = getRandomUpTo;
