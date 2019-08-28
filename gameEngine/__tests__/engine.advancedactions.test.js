/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    // shieldSmall, shieldLarge,
    waterLiving, waterDead, wolf, bogatyr, russianOven, apple,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Water Cards Tests ** *//

// Test, that  when player puts living water in item holder, then
// players get +1 to their health current each until card has its points > 0
test('msg ACTION received: active player put Living Water in item, it increases players health current for 1pnt.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = waterLiving;
    gameForTest.game.players[0].health.current = 15;
    gameForTest.game.players[1].health.current = 14;
    gameForTest.game.players[0].moveCounter = 1;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта living water в item holder неактивного игрока
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    expect(inactivePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(inactivePlayer.hand)).not.toContain(cardToTest);
    // ожидаем, что карта dead water неактивного игрока имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.HEALCATEGORY);
    // ожидаем, что очки карты living water неактивного игрока > 0
    expect(inactivePlayer.item[cardToTest].points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each until card has it health points.
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = waterDead;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта dead water в item holder неактивного игрока,
    // т.к. после перехода хода бывший активный игрок стал неактивным
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterDead.id);
    expect(inactivePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что карта dead water имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.DAMAGECATEGORY);
    // ожидаем, что очки карты dead water  > 0
    expect(inactivePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья игроков убавится по 1му очку
    // помимо ущерба от очков карты атаки
    expect(inactivePlayer.health.current).toEqual(15);
    expect(activePlayer.health.current).toEqual(12);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that  when living water is in item holder, then
// players get +1 to their current health each until card is in item holder
test('msg ACTION received: active player already has Living Water in item, it increases players health current for 1pnt.', () => {
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].health.current = 15;
    gameForTest.game.players[1].health.current = 14;
    gameForTest.game.players[0].moveCounter = 1;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта living water в item holder неактивного игрока
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    // ожидаем, что карта  living water неактивного игрока имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.HEALCATEGORY);
    // ожидаем, что очки карты living water неактивного игрока > 0
    expect(inactivePlayer.item[cardToTest].points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(13);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that when dead water is attacked once is in any player item holder
// and gone to graveyard once its health points are == 0
test('msg ACTION received: after attack the dead water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterDead;
    gameForTest.game.players[0].hand.key20 = bogatyr;
    gameForTest.game.players[1].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта dead water ушла из item holder активного игрока,
    // т.к. после атаки е ездоровье  стало == 0 и она ушла на кладбище
    expect(Object.values(activePlayer.item).length).toEqual(0);
    expect(inactivePlayer.grave[cardToTest].id).toEqual(waterDead.id);
    expect(Object.keys(activePlayer.item)).not.toContain(cardToTest);
    // ожидаем, что очки карты dead water восстановились до первоначальных
    expect(inactivePlayer.grave[cardToTest].healthCurrent).toEqual(3);
    // ожидаем, что текущее здоровье игроков не имзеняется ( карта ушла )
    expect(inactivePlayer.health.current).toEqual(15);
    expect(activePlayer.health.current).toEqual(16);
});

// Test, that when living water is attacked once is in any player item holder
// and gone to graveyard once its health points are == 0
test('msg ACTION received: after attack the living water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = bogatyr;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[1].health.current = 12;
    gameForTest.game.players[0].health.current = 10;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта dead water ушла из item holder активного игрока,
    // т.к. после атаки е ездоровье  стало == 0 и она ушла на кладбище
    expect(Object.values(activePlayer.item).length).toEqual(0);
    expect(activePlayer.grave[cardToTest].id).toEqual(waterLiving.id);
    expect(Object.keys(activePlayer.item)).not.toContain(cardToTest);
    // ожидаем, что очки карты dead water восстановились до первоначальных
    expect(activePlayer.grave[cardToTest].healthCurrent).toEqual(3);
    // ожидаем, что текущее здоровье игроков не имзеняется ( карта ушла )
    expect(inactivePlayer.health.current).toEqual(10);
    expect(activePlayer.health.current).toEqual(12);
});

// Test, that when living water  is in any player item holder then
// active player with current health == maximum does not get +1 to current health
test('msg ACTION received: after attack the living water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта living water в item holder активного игрока,
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    // ожидаем, что очки карты living water уменьшились на очки атаки
    expect(activePlayer.item[cardToTest].healthCurrent).toEqual(1);
    // ожидаем, что текущее здоровье игроков не имзеняется ( т.к. === maximum )
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(15);
});


//* ****** Russian Oven Card Tests ** *//

// Test, that when a player attackes with  russianOven card, then opponent
// cannot use two random cards from his hand in next turn (move counter 1+1)
test('msg ACTION received: active player attacks with russianOven, it disables 2 cards in hand of opponent for 1 turn.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = russianOven;
    gameForTest.game.players[1].hand = {
        key11: { disabled: false },
        key8: { disabled: false },
        key13: { disabled: false },
        key1: { disabled: false },
        key3: { disabled: false },
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище походившего игрока
    expect(activePlayer.grave[cardToTest].id).toEqual(russianOven.id);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
    // ожидаем, что карта russianOven неактивного игрока имеет category - holdCard
    expect(activePlayer.grave[cardToTest].category).toEqual(card.HOLDCARDCATEGORY);
    // ожидаем, что 2 карты  атакованного игрока получили свойство disabled: true
    expect(Object.values(inactivePlayer.hand)).toContainEqual(
        { disabled: true },
        { disabled: true },
        { disabled: false },
        { disabled: false },
        { disabled: false },
    );
});

// Test, that when a player is attacked with  russianOven card by opponent, then this player
// cannot use two random cards from his hand  during his turn ( move counter 1+1)
test('msg ACTION received: inactive player attacked with russianOven, 2 cards in hand of active player got disabled: true for full turn.', () => {
    const cardToTest = 'key23';
    const bajunCard = 'key3';
    const msg = {
        type: message.ACTION,
        activeCard: bajunCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].grave.key23 = russianOven;
    gameForTest.game.players[0].hand = {
        key11: { disabled: true },
        key8: { disabled: true },
        key13: { disabled: false },
        key1: { disabled: false },
        key3: {
            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище неактивного игрока
    expect(inactivePlayer.grave[cardToTest].id).toEqual(russianOven.id);

    // ожидаем, что 2 карты  активного игрока со свойством disabled: true
    expect(Object.values(activePlayer.hand)).toContainEqual(
        { disabled: true }, { disabled: true }, { disabled: false }, { disabled: false },
    );
    // ожидаем, что у активного игрока счетчик хода равен 1
    expect(activePlayer.moveCounter).toEqual(1);
});

// Test, that when a player has been attacked with  russianOven card by opponent, then this player
// get back disabled: false to all cards in hand after his full turn ( move counter 1+1)
test('msg ACTION received:  all cards (incl disabled by russianOven prev) in hand of active player got disabled: false after full turn.', () => {
    const appleCard = 'key2';
    const cardToTest = 'key23';
    const msg = {
        type: message.ACTION,
        activeCard: appleCard,
        target: target.HERO,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].health.current = 10;
    gameForTest.game.players[1].grave.key23 = russianOven;
    gameForTest.game.players[0].hand = {
        key11: { disabled: true },
        key8: { disabled: true },
        key13: { disabled: false },
        key2: apple,
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище активного игрока
    expect(activePlayer.grave[cardToTest].id).toEqual(russianOven.id);
    // ожидаем, что 2 карты  походившего игрока,
    // что были со свойством disabled: true - стали disabled: false
    expect(Object.values(inactivePlayer.hand)).toContainEqual(
        { disabled: false }, { disabled: false }, { disabled: false },
    );
    // we check every card dealt to ex-active player 0
    for (let i = 0; i < Object.keys(inactivePlayer.hand).length; i++) {
    // and we expect inactive player 0 to have disabled: false property in each card
        expect(Object.values(inactivePlayer.hand)[i]).toHaveProperty('disabled', false);
    }
    // ожидаем, что у походившего  игрока счетчик хода равен 0
    expect(activePlayer.moveCounter).toEqual(0);
});
