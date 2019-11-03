import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    magicMirror, bogatyr,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Magic Mirror Card Tests ** *//

// Test, that when Magic Mirror card is at a player's item holder then
// it reflects half of damage got from the opponent (or round down damage points to integer)
// and half of damage goes to the opponent back
test('msg ACTION received: inactive player has Magic Mirror in item, it reflects half of active player attack back.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const bogatyrCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key0 = bogatyr;
    gameForTest.game.players[1].item.key20 = magicMirror;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у активного игрока в item holder лежит карта magicMirror
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(magicMirror.id);
    expect(Object.keys(activePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что у активного игрока уменьшится на половину очков атаки health current и == 15
    expect(inactivePlayer.health.current).toEqual(15);
     // ожидаем, что у неактивного игрока уменьшится на половину очков атаки health current и == 15
     expect(activePlayer.health.current).toEqual(15);
});
