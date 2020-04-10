import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../src/constants';

import cards from '../__data__/cards';

const {
    skullLantern, shieldLarge, plateMail, waterDead,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that when active player attackes opponent with skullLantern card then
// all cards with item type are thrown to graveyard from the game table
test('msg ACTION received: active player attacks with  skullLantern, it moves all players cards with item type to graveyards', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = skullLantern;
    gameForTest.game.players[0].hand.key0 = plateMail;
    gameForTest.game.players[0].item.key10 = shieldLarge;
    gameForTest.game.players[1].item.key10 = shieldLarge;
    gameForTest.game.players[1].hand.key0 = waterDead;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что Morevna сходила картой skullLantern, и та после хода ушла на кладбище
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // ожидаем, что карта skullLantern имеет category: 'attackItems'
    expect(activePlayer.grave[cardToTest].category).toEqual(card.ATTACKITEMSCATEGORY);

    // ожидаем, что карты с типом item из руки и item holder активного игрока уйдут на кладбище
    expect(Object.keys(activePlayer.grave)).toContain('key10', 'key0');
    expect(Object.keys(activePlayer.hand)).not.toContain('item');
    expect(Object.keys(activePlayer.item).length).toEqual(0);
    // ожидаем, что то карты с типом item из руки и item holder неактивного игрока уйдут на кладбище
    expect(Object.keys(inactivePlayer.grave)).toContain('key10', 'key0');
    expect(Object.keys(inactivePlayer.hand)).not.toContain('item');
    expect(Object.keys(inactivePlayer.item).length).toEqual(0);
});
