import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    magicTree, warhorse,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Magic Tree Card Tests ** *//

// Test, that when inactive player has  magicTree item in  item holder,
// then active player can make only one action in 1 turn
// (turn changes when moveCounter == 1 not 2 as usual)
test('EDGE CASE TEST: active player can make only 1 action in 1 turn if opponent has magicTree in item holder', () => {
    const cardToTest = 'key17';
    const attackCard = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: attackCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = warhorse;
    gameForTest.game.players[1].item.key17 = magicTree;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что ход сменился и Yaga стала активным игроком
    expect(activePlayer.hero).toEqual('yaga');
    // а morevna стала неактивным игроком после 1 хода и ее счетчик хода снова обнулился
    expect(inactivePlayer.hero).toEqual('morevna');
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что карта magicTree лежит в item holder активного игрока Yaga
    expect(activePlayer.item[cardToTest]).toEqual(magicTree);
    // ожидаем, что карта magicTree активного игрока имеет категорию holdTurn
    expect(activePlayer.item[cardToTest].category).toEqual(card.HOLDTURNCATEGORY);
});

// Test, that when active player attacks  magicTree item in opponent's item holder,
// then magicTree goes to graveyard
test('EDGE CASE TEST: active player can make only 1 action in 1 turn if opponent has magicTree in item holder', () => {
    const cardToTest = 'key17';
    const attackCard = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: attackCard,
        target: target.ITEMOPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = warhorse;
    gameForTest.game.players[1].item.key17 = magicTree;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find inactive players
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта magicTree лежит на кладбище неактивного игрока Yaga
    expect(inactivePlayer.grave[cardToTest]).toEqual(magicTree);
});
