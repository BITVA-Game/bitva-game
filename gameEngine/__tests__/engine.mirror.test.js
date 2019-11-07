import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    magicMirror, warhorse, shieldSmall, bogatyr,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Magic Mirror Card Tests ** *//

// Test, that active player can put Magic Mirror card in item holder
test('EDGE CASE TEST active player can put Magic Mirror in item holder.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = magicMirror;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    // ожидаем, что карта magic mirror в item holder активного игрока
    expect(Object.keys(activePlayer.item)).toContain(cardToTest);
});

// Test, that when Magic Mirror card is at a player's item holder then
// it reflects half of damage got from the opponent (or round down damage points to integer)
// and half of damage goes to the opponent back
test('msg EDGE CASE TEST inactive player has Magic Mirror in item, it reflects half of active player attack back.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const warhorseCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: warhorseCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key0 = warhorse;
    gameForTest.game.players[1].item.key20 = magicMirror;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у неактивного игрока в item holder лежит карта magicMirror
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(magicMirror.id);
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.REFLECTCATEGORY);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что у активного и неактивного игроков здоровье уменьшится на половину очков атаки
    // или др цело число , округленное в меньшую сторону.
    expect(inactivePlayer.health.current).toEqual(14);
    expect(activePlayer.health.current).toEqual(15);
});

// Test, that when Magic Mirror card is at any player's item holder and when
// it reflects half of damage back to the opponent (or round down damage points to integer)
// and if opponent has a shield then reflected damage goes to the shield
test('EDGE CASE TEST inactive player has Magic Mirror in item, it reflects half of active player attack to her shield if any.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const warhorseCard = 'key0';
    const shieldCard = 'key7';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: warhorseCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key0 = warhorse;
    gameForTest.game.players[0].item.key7 = shieldSmall;
    gameForTest.game.players[1].item.key20 = magicMirror;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у неактивного игрока в item holder лежит карта magicMirror
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(magicMirror.id);
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.REFLECTCATEGORY);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что у неактивного игрока здоровье уменьшится на половину очков атаки
    // или др цело число , округленное в меньшую сторону.
    expect(inactivePlayer.health.current).toEqual(14);
    // ожидаем, что у активного игрока здоровье не уменьшится
    // так как щит принял на себя атаку
    expect(activePlayer.health.current).toEqual(16);
    // ожидаем, что здоровье щита в item Моревны уменьшится на половину атаки
    expect(activePlayer.item[shieldCard].healthCurrent).toEqual(1);
});

// Test, that when Magic Mirror card is at any player's item holder and when
// it reflects half of damage back to the opponent (or round down damage points to integer)
// and if opponent has a shield then reflected damage goes to the shield
// remaining attack points are deducted from opponent health, if damage is more than shield health
test('EDGE CASE TEST inactive player has Magic Mirror in item, it reflects half of active player attack to shield and then damage player.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const bogatyrCard = 'key0';
    const shieldCard = 'key7';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key0 = bogatyr;
    gameForTest.game.players[0].item.key7 = shieldSmall;
    gameForTest.game.players[0].item.key7.healthCurrent = 1;
    gameForTest.game.players[1].item.key20 = magicMirror;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у неактивного игрока в item holder лежит карта magicMirror
    expect(inactivePlayer.item[cardToTest].id).toEqual(magicMirror.id);
    // ожидаем, что у неактивного игрока здоровье уменьшится на половину очков атаки
    expect(inactivePlayer.health.current).toEqual(13);
    // ожидаем, что у активного игрока здоровье уменьшится на 1 очко
    // так как щит принял на себя атаку в 1 одно очко
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что здоровье щита в item Моревны обнулится и он уйдет на кладбище
    expect(Object.keys(activePlayer.grave)).toContain(shieldCard);
});

// Test, that when Magic Mirror card is at inactive player's item holder then after attack
// card points <= 0, mirror card goes to graveyard and gets its initial points back
test('EDGE CASE TEST inactive player has Magic Mirror in item, after attack its points <=0 and card goes to graveyard.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const bogatyrCard = 'key0';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key0 = bogatyr;
    gameForTest.game.players[1].item.key20 = magicMirror;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find inactive player
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта magic mirror на кладбище неактивного игрока
    expect(Object.keys(inactivePlayer.grave)).toContain(cardToTest);
    // ожидаем, что points карты mirror получат назад первоначальное значение
    expect(inactivePlayer.grave[cardToTest].healthCurrent).toEqual(2);
});
