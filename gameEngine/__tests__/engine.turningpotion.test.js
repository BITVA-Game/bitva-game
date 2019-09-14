import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';
// import { act } from 'react-testing-library';

const {
    turningPotion,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that when active player attacks opponent with turningPotion card
// then active player get turningHand property so next act player can chose any one card from opponent hand to act
// and his move counter to be increased by 1 only for act by both these cards
test('msg ACTION received: active player attacks with turningPotion and at next act can choose any 1 card from opponent hand to act for 1 move', () => {
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
    gameForTest.game.players[0].hand.key20 = turningPotion;
    gameForTest.game.players[0].moveCounter = 1;
    
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что Morevna сходила картой turningPotion, и та после ходя ушла на кладбище
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // ожидаем, что карта turning Potion имеет category: 'turning'
    expect(activePlayer.grave[cardToTest].category).toEqual(card.TURNINGCATEGORY);
    // ожидаем, что ход не сменится и Morevna продолжает быть активным игроком
    expect(activePlayer.hero).toEqual('morevna');
    // и ее счетчик хода не увеличился и равен 1
    expect(activePlayer.moveCounter).toEqual(1);
    // ожидаем, что у activePlayer появится свойство turningHand: true,
    // которое позволит ей выбрать карту из руки противника
    // и у inactivePlayer также появилось это свойство (для frontend)
    expect(activePlayer.turningHand).toEqual(true);
    expect(inactivePlayer.turningHand).toEqual(true);
});
