import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    malachiteBox, bogatyr, apple,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Malachite Box Card Tests ** *//

// test that active player can put malachiteBox card in item holder,
// and opponent health current does not increased immediately (only on next act of player)
test('msg ACTION received: player can put malachiteBox in item, opponent health is not increased', () => {
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
    gameForTest.game.players[0].hand.key20 = malachiteBox;


    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у активного игрока в item holder лежит карта malachiteBox
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(malachiteBox.id);
    expect(Object.keys(activePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что у неактивного игрока не изменится, health current == 15
    expect(inactivePlayer.health.current).toEqual(15);
});


// test that once player attacks, while having malachiteBox card in item holder,
// then opponent also is attacked by bat card
test('msg ACTION received: active player has malachite box in item, when player acts then opponent is attacked by bat card', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = malachiteBox;
    gameForTest.game.players[0].hand.key20 = bogatyr;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у активного игрока в item holder лежит карта malachiteBox
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(malachiteBox.id);
    expect(activePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(activePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что очки карты malachiteBox  > 0
    expect(activePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья активного игрока убавятся:
    // 4 очка от атаки картой богатырь и
    // 1 очко от атаки картой летучая мышь ( показана анимацией)
    expect(inactivePlayer.health.current).toEqual(10);
});

// test that once player heal herself, while having malachiteBox card in item holder,
// then opponent also is attacked by bat card
test('msg ACTION received: active player has malachite box in item, when player heal then opponent is attacked by bat card', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const appleCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: appleCard,
        target: target.HERO,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = malachiteBox;
    gameForTest.game.players[0].hand.key20 = apple;
    gameForTest.game.players[0].health.current = 10;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у активного игрока в item holder лежит карта malachiteBox
    expect(activePlayer.item[cardToTest].id).toEqual(malachiteBox.id);
    expect(Object.keys(activePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что от текущего здоровья оппонента - неактивного игрока
    // отнимется 1 очко от атаки картой летучая мышь ( показана анимацией)
    expect(inactivePlayer.health.current).toEqual(14);
    // ожидаем, что активный поправит свое здоровье на 2 очка карты яблоко
    expect(activePlayer.health.current).toEqual(12);
});

// test that once player put card to graveyard, while having malachiteBox card in item holder,
// then opponent also is attacked by bat card
test('msg ACTION received: active player has malachite box in item, when player put a card to graveyard then opponent is attacked by bat card', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const appleCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: appleCard,
        target: target.GRAVE,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = malachiteBox;
    gameForTest.game.players[0].hand.key20 = apple;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у активного игрока в item holder лежит карта malachiteBox
    expect(activePlayer.item[cardToTest].id).toEqual(malachiteBox.id);
    expect(Object.keys(activePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что у активного игрока на кладбище лежит карта appleCard
    expect(Object.keys(activePlayer.grave)).toContain(appleCard);
    // ожидаем, что от текущего здоровья оппонента - неактивного игрока
    // отнимется 1 очко от атаки картой летучая мышь ( показана только анимацией)
    expect(inactivePlayer.health.current).toEqual(14);
});

// test that once player attacks malachiteBox card in opponent's item holder,
// with attack points > than card health current points
// then malachiteBox card goes to graveyard
test('msg ACTION received: active player attacks malachite box in item of opponent, card goes to graveyard', () => {
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
    gameForTest.game.players[1].item.key24 = malachiteBox;
    gameForTest.game.players[0].hand.key20 = bogatyr;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что у не активного игрока в карта malachiteBox ушла на кладбище
    expect(Object.values(inactivePlayer.item).length).toEqual(0);
    expect(inactivePlayer.grave[cardToTest].id).toEqual(malachiteBox.id);
    // ожидаем, что очки карты malachiteBox  восстановились до 2
    expect(inactivePlayer.grave[cardToTest].healthCurrent).toEqual(2);
    // ожидаем, что текущее здоровье игроков не измениться
    expect(inactivePlayer.health.current).toEqual(15);
    expect(activePlayer.health.current).toEqual(16);
});
