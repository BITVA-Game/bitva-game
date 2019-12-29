import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card, action,
} from '../../constants';

import cards from '../__data__/cards';
// import { act } from 'react-testing-library';

const {
    turningPotion, wolf, apple, shieldSmall, bogatyr, waterDead,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that when active player attacks opponent with turningPotion card
// then active player get turningHand property
// so next act player can chose any one card from opponent hand to act
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
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
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
    expect(newGame.game.lastAction.type).toEqual(action.TURNINGPOTION);
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// and now player choses one card from opponent's hand to move it to opponent's grave
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put 1 card from opponent hand to opponent graveyard', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const wolfCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.GRAVE,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand.key0 = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[0].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что выбранная Моревной карта из руки  Яги ушла на кладбище Яги
    expect(Object.keys(activePlayer.grave)).toContain(wolfCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(wolfCard);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// that now player choses one card from opponent's hand to heal herself /  himself
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION rcvd: active player attacked with turningPotion and can heal own hero wz healing card from opp. hand, cards goes to opp graveyard', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const appleCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: appleCard,
        target: target.HERO,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand.key0 = apple;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].health.current = 10;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[0].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что здоровье Morevna увеличится на 2 очка
    expect(inactivePlayer.health.current).toEqual(12);
    // ожидаем, что выбранная Моревной карта из руки  Яги ушла на кладбище Яги
    expect(Object.keys(activePlayer.grave)).toContain(appleCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(appleCard);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to attack opponent
// opponent shield in item holder took some damage and goes to graveyard as well as active card
// opponent's health to be decrease by difference (if any active card points left)
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now attacks opponent with 1 card from opponent hand', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const bogatyrCard = 'key0';
    const shieldCard = 'key24';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand[bogatyrCard] = bogatyr;
    gameForTest.game.players[1].item[shieldCard] = shieldSmall;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[0].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что выбранная Моревной карта из руки  Яги ушла на кладбище Яги
    expect(Object.keys(activePlayer.grave)).toContain(bogatyrCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(bogatyrCard);
    // ожидаем, что щит из item holder Yaga ушёл на кладбище
    expect(Object.keys(activePlayer.grave)).toContain(shieldCard);
    // ожидаем, что текущее здоровье Yaga уменьшилось на 2
    expect(activePlayer.health.current).toEqual(13);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(inactivePlayer.health.current).toEqual(16);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to put it to her/his own item holder
// such card in player's item holder got fromOpponent: true property,
// so we may return it back to opponent cards
// after furutre attack when this card health to be == 0 and card would go to opponent graveyard
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put in his/her item holder 1 card from opponent hand', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const shieldCard = 'key24';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: shieldCard,
        target: target.ITEMCARD,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand[shieldCard] = shieldSmall;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[0].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что выбранная Моревной карта из руки  Яги ушла в item holder к Моревне
    expect(Object.keys(inactivePlayer.item)).toContain(shieldCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(shieldCard);
    // ожидаем, что карта в item holder Morevna приобрела свойство fromOpponent: true
    expect(inactivePlayer.item[shieldCard].fromOpponent).toEqual(true);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(inactivePlayer.health.current).toEqual(16);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
});

// Test, that when inactive player previoulsy put shield card
// from opponent's hand to her/his own item holder with the help of turningPotion card
// opponent now attacks inactive player and shield card goes back to opponent's grave
// ( so cards remain same as when dealt) and fromOpponent: true property has been removed now from
//  this shield card in inactive player's item holder
test('msg ACTION received: inactive player put in own item holder shield card from opponent hand, after attack against player it returns to opponent graveyard', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const shieldCard = 'key24';
    const wolfCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item[shieldCard] = shieldSmall;
    gameForTest.game.players[1].hand[wolfCard] = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[1].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что выбранная Моревной карта атаки из руки  Яги ушла в grave yard к Yaga
    expect(Object.keys(activePlayer.grave)).toContain(wolfCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(wolfCard);
    // ожидаем, что из item holder щит ушел на кладбище к Яге
    expect(Object.keys(activePlayer.grave)).toContain(shieldCard);
    expect(Object.keys(activePlayer.item)).not.toContain(shieldCard);
    // ожидаем, что карта потеряла свойство fromOpponent: true, уйдя из item holder Яги
    expect(activePlayer.grave[shieldCard]).not.toContain('fromOpponent');
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(inactivePlayer.health.current).toEqual(16);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to attack item card in opponent item holder
// such card from opponent item holder  and the active card both go to opponent graveyard
// player's move counter to be increased by 1 (after this 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now attacks opponent item with the card from opponent hand', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const itemCard = 'key24';
    const wolfCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item[itemCard] = waterDead;
    gameForTest.game.players[1].item[itemCard].healthCurrent = 2;
    gameForTest.game.players[1].hand[wolfCard] = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].turningHand = true;
    gameForTest.game.players[1].turningHand = true;
    gameForTest.game.players[0].grave[cardToTest] = turningPotion;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у игроков свойство turningHand не равно true
    expect(activePlayer.turningHand).not.toEqual(true);
    expect(inactivePlayer.turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga активный игрок
    expect(activePlayer.hero).toEqual('yaga');
    // счетчик хода  Morevna сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(inactivePlayer.moveCounter).toEqual(0);
    // ожидаем, что выбранная Моревной карта атаки из руки  Яги ушла в grave yard к Yaga
    expect(Object.keys(activePlayer.grave)).toContain(wolfCard);
    expect(Object.keys(activePlayer.hand)).not.toContain(wolfCard);
    // ожидаем, что из item holder щит ушел на кладбище к Яге
    expect(Object.keys(activePlayer.grave)).toContain(itemCard);
    expect(Object.keys(activePlayer.item)).not.toContain(itemCard);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(inactivePlayer.health.current).toEqual(16);
    // ожидаем, что у Morevna на кладбище карта оборотное зелье
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
});
