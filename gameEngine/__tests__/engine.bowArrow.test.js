import {
    dealAllState,
} from '../__data__/states';

import {
    message, target,
} from '../../src/constants';

import cards from '../__data__/cards';

const {
    bowArrow, warhorse, magicMirror, raven, apple,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Bow and Arrow Card Tests ** *//

// Test that player can put  Bow and Arrows card in item holder
test('msg ACTION received: player can put Bow&Arrow card in item.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = bowArrow;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);

    // ожидаем, что карта bowArrow в item holder походившего игрока
    expect(activePlayer.item[cardToTest]).toEqual(bowArrow);
});

// Test that once Bow and Arrows card is at opponent item holder, 2 player's
// cards with > 1 point have 60%  chance to loose 1 point
// at the beggining of every turn ( move counter +1)
test('msg ACTION received: if Bow&Arrow card is at opponent item, then with 60% 2 cards in player hand can loose 1 point at next acttion.', () => {
    const cardToTest = 'key20';
    const attackCard = 'key21';
    const msg = {
        type: message.ACTION,
        activeCard: attackCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key20 = bowArrow;
    gameForTest.game.players[0].hand.key18 = warhorse;
    gameForTest.game.players[0].hand.key20 = magicMirror;
    gameForTest.game.players[0].hand.key21 = warhorse;
    gameForTest.game.players[0].hand.key22 = apple;
    gameForTest.game.players[0].hand.key0 = raven;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта bowArrow в item holder неактивного игрока
    expect(inactivePlayer.item[cardToTest]).toEqual(bowArrow);
    // ожидаем 2 карты в руке оппонента, которые подпали под влияние
    // карты bowArrow все также с уменьшенным на 1 очко здоровьем
    expect(activePlayer.grave[attackCard].points).toEqual(2);
    expect(activePlayer.hand.key18.points).toEqual(2);
});
