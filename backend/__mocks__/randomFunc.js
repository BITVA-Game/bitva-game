// eslint-disable-next-line import/prefer-default-export

const getRandomUpTo = jest
    .fn()
    .mockReturnValueOnce(4)
    .mockReturnValueOnce(3)
    .mockReturnValue(1);

// const getRandomUpTo = function (from) {
//     console.log('We are in mock getrandom!');
//     if (from === 'bowArrow') {
//         getRandomUpTo === jest
//             .fn()
//             .mockReturnValueOnce(4)
//             .mockReturnValueOnce(3)
//             .mockReturnValue(1);
//     }
// }

exports.getRandomUpTo = getRandomUpTo;
