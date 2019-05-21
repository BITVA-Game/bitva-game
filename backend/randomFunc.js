<<<<<<< HEAD
/* eslint-disable no-unused-vars */

function getRandomUpTo(n, caseName) {
    // console.log('We are in real getrandom!');
=======
function getRandomUpTo(n) {
    console.log('We are in real getrandom!');
>>>>>>> randomUpTo function is in another file + mock func created trying to use
    return Math.floor(Math.random() * Math.floor(n));
}

exports.getRandomUpTo = getRandomUpTo;
