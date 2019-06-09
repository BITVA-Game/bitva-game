/* eslint-disable consistent-return */
// eslint-disable-next-line import/prefer-default-export

function getRandomUpTo(n, caseName) {
    // console.log('We are in mock getrandom!');
    if (caseName === 'indexPlayer') {
        return 1;
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
        return 3;
    }
}

exports.getRandomUpTo = getRandomUpTo;
