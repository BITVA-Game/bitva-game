import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    clairvoyance,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// test to show 3 next cards in opponent cards once active player attacks opponent with clairvoyance card
test('msg ACTION received: active player attacks with clairvoyance and can see next 3 cards from opponent deck', () => {
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
    gameForTest.game.players[0].hand.key20 = clairvoyance;
   
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что Morevna сходила картой clairvoyance, и та после ходя ушла на кладбище
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // ожидаем, что карта showCards имеет category: 'showCards'
    expect(activePlayer.grave[cardToTest].category).toEqual(card.SHOWCARDSCATEGORY);

    // ожидаем, что у неактивного игрока, в появится cardsShown и в ней первые три карты из cards
    expect(Object.keys(inactivePlayer.cardsShown)).toContain('key1', 'key2', 'key4');
    // ожидаем, что у неактивного игрока, в cards сохранятся три карты показанные в cardsShown
    expect(Object.keys(inactivePlayer.cards)).toContain('key1', 'key2', 'key4');
});
