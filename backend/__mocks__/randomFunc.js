/* eslint-disable consistent-return */
// eslint-disable-next-line import/prefer-default-export

function getRandomUpTo(n, caseName) {
    // console.log('We are in mock getrandom!');
    if (caseName === 'firstPlayerActive') {
        return 0;
    } if (caseName === 'indexOpponent') {
        return 0;
    } if (caseName === 'index1Oven') {
        return 0;
    } if (caseName === 'index2Oven') {
        return 2;
    } if (caseName === 'chanceBowArrow') {
        return 4;
    } if (caseName === 'index1Bow') {
        return 0;
    } if (caseName === 'index2Bow') {
        return 2;
    } if (caseName === 'chanceforestMushroom') {
        return 5;
    } if (caseName === 'indexMushroom') {
        return 2;
    }
}

exports.getRandomUpTo = getRandomUpTo;
