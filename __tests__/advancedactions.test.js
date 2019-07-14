/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */

// import module for tests
const application = require('../gameTerminal/application');

jest.mock('../gameTerminal/randomFunc');
// Test, that  when living water is in item holder, then
// players get +1 to their health current each until card has its points > 0
test('msg ACTION received: active player put Living Water in item, it increases players health current for 1pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            id: 'waterLiving', type: 'item', category: 'heal', disabled: false, points: 3, initialpoints: 3,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта living water в item holder активного игрока
    expect(result.game.players[0].item.key1.id).toEqual('waterLiving');
    // ожидаем, что карта dead water активного игрока имеет тип - heal
    expect(result.game.players[0].item.key1.category).toEqual('heal');
    // ожидаем, что очки карты dead water активного игрока > 0
    expect(result.game.players[0].item.key1.points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(result.game.players[0].health.current).toEqual(11);
    expect(result.game.players[1].health.current).toEqual(9);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key1.points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each until card has it health points.
test('msg ACTION received: active player has dead water in item, it decreased players health current for 1pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key10: {
                            id: 'waterDead', type: 'item', category: 'damage', points: 2, initialpoints: 3,
                        },
                    },
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water в item holder активного игрока
    expect(result.game.players[0].item.key10.id).toEqual('waterDead');
    // ожидаем, что карта dead water неактивного игрока имеет тип - damage
    expect(result.game.players[0].item.key10.category).toEqual('damage');

    // ожидаем, что от текущего здоровья игроков отнимется по 1му очку
    expect(result.game.players[0].health.current).toEqual(9);
    expect(result.game.players[1].health.current).toEqual(4);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
});

// Test, that when living water card is in any player item holder then
// players get +1 to their current health each until card is in item holder
test('msg ACTION received: inactive player has living water in item, it increases players health current for 1pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {
                        key10: {
                            id: 'waterLiving', type: 'item', category: 'heal', points: 2, initialpoints: 3, disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water в item holder неактивного игрока
    expect(result.game.players[0].item.key10.id).toEqual('waterLiving');
    // ожидаем, что карта dead water неактивного игрока имеет тип - damage
    expect(result.game.players[0].item.key10.category).toEqual('heal');
    // ожидаем, что от текущего здоровья игроков отнимется по 1му очку
    expect(result.game.players[1].health.current).toEqual(11);
    expect(result.game.players[0].health.current).toEqual(6);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each while card is in item holder.
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {},
                    },
                    moveCounter: 1,
                    item: {
                        key10: {
                            id: 'waterLiving', type: 'item', category: 'attack', health: 3, healthCurrent: 1, disabled: false,
                        },
                    },
                    grave: {},
                },
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 1, disabled: false,
                        },
                    },
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water ушла из item holder активного игрока на кладбище
    expect(result.game.players[0].grave.key10.id).toEqual('waterLiving');
    // ожидаем, что от текущего здоровья игроков отнимется по 1му очку
    expect(result.game.players[0].health.current).toEqual(10);
    expect(result.game.players[1].health.current).toEqual(8);
    // ожидаем, что очки карта-water восстановились до 3 initial points.
    expect(result.game.players[0].grave.key10.healthCurrent).toEqual(3);
});

// Test, that when active player attacks dead water, then
// attack points are deducted from water card points, players health does not change
// water cards goes to grave yard if her points <= 0,
// and there get its inital points back for future use
test('msg ACTION received: dead water card in opponent item is attacked, it goes to grave yard, if attack points same or greater than water card points, players health does not change.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {
                        key10: {
                            id: 'waterDead', type: 'item', category: 'damage', healthCurrent: 2, health: 3, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water ушла на кладбище неактивного игрока
    expect(result.game.players[1].grave.key10.id).toEqual('waterDead');
    // ожидаем, что карта-water получила назад свои начальные очки для будущего использования.
    expect(result.game.players[1].grave.key10.healthCurrent).toEqual(3);

    // ожидаем, что текущее здоровье игроков не изменится
    expect(result.game.players[0].health.current).toEqual(10);
    expect(result.game.players[1].health.current).toEqual(8);
});

// Test, that when living water card is in any player item holder then
// active player with current health == maximum heals does not get +1 to current health
test('msg ACTION received: inactive player has living water in item, it increases players health only if current != maximum', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {
                        key10: {
                            id: 'waterLiving', type: 'item', category: 'heal', points: 2, initialpoints: 3, disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 13, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: { },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water в item holder неактивного игрока
    expect(result.game.players[0].item.key10.id).toEqual('waterLiving');
    // ожидаем, что карта dead water неактивного игрока имеет тип - heal
    expect(result.game.players[0].item.key10.category).toEqual('heal');
    // ожидаем, что к текущему здоровью игрока (Моревна) не прибавляется  1о очко - т.к максимум
    expect(result.game.players[1].health.current).toEqual(13);
    // ожидаем, что к текущему здоровью игрока (Яга) прибавляется  1о очко ( за минусом атаки)
    expect(result.game.players[0].health.current).toEqual(6);
    // ожидаем, что при переходе хода на текущего активного,
    // карта -water стоит в item cо свойтсвом itemInstalled ==true
    // expect(result.game.players[1].item.key10.itemInstalled).toEqual(true);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
});

// Test, that when a player attackes with  russianOven card, then opponent
// cannot use two random cards from his hand in next turn (move counter 1+1)
test('msg ACTION received: active player attacks with russianOven, it disables 2 cards in hand of opponent for 1 turn.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key2: {},
                        key1: {
                            id: 'russianOven', type: 'action', category: 'holdCard', points: 2, initialpoints: 2, disabled: false,
                        },

                    },
                    grave: { },
                    item: {
                        key10: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 13, maximum: 13 },
                    hand: {
                        key11: { disabled: false },
                        key8: { disabled: false },
                        key13: { disabled: false },
                        key1: { disabled: false },
                        key3: { disabled: false },
                    },
                    moveCounter: 0,
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта russianOven на кладбище активного игрока
    expect(result.game.players[0].grave.key1.id).toEqual('russianOven');
    // ожидаем, что карта russianOven активного игрока имеет category holdCard
    expect(result.game.players[0].grave.key1.category).toEqual('holdCard');
    // ожидаем, что 2 карты  неактивного игрока имеют тип
    expect(Object.values(result.game.players[1].hand)).toContainEqual(
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
    const msg = {
        type: 'ACTION',
        activeCard: 'key3',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key2: {},
                        key4: {},

                    },
                    grave: {
                        key1: {
                            id: 'russianOven', type: 'action', category: 'holdCard', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 13, maximum: 13 },
                    hand: {
                        key11: { disabled: true },
                        key8: { disabled: true },
                        key13: { disabled: false },
                        key1: { disabled: false },
                        key3: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у активного игрокы (Моревна) 2 карты в руке с типом 'disabled'
    expect(Object.values(result.game.players[1].hand)).toContainEqual(
        { disabled: true }, { disabled: true }, { disabled: false }, { disabled: false },
    );
    // ожидаем, что у активного игрока счетчик хода равен 1
    expect(result.game.players[1].moveCounter).toEqual(1);
});

// Test, that when a player has been attacked with  russianOven card by opponent, then this player
// get back disabled: false to all cards in hand after his full turn ( move counter 1+1)
test('msg ACTION received: inactive player attacked with russianOven, all cards in hand of active player got disabled: false after full turn.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'hero',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key2: {},
                        key4: {},

                    },
                    grave: {
                        key1: {
                            id: 'russianOven', type: 'action', category: 'holdCard', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: { disabled: false },
                        key1: { disabled: false },
                        key17: { disabled: false },
                        key5: { disabled: false },
                        key7: { disabled: false },
                        key4: { disabled: false },
                        key6: { disabled: false },
                        key14: { disabled: false },
                        key12: { disabled: false },
                        key9: { disabled: false },
                    },
                    health: { current: 13, maximum: 13 },
                    hand: {
                        key11: { disabled: true },
                        key8: { disabled: true },
                        key13: { disabled: false },
                        key2: {
                            id: 'apple', type: 'action', category: 'heal', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {
                        key3: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у активного игрокы (Моревна) 2 карты в руке с типом 'disabled'
    expect(Object.values(result.game.players[1].hand)).toContainEqual(
        { disabled: false }, { disabled: false }, { disabled: false },
    );
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(result.game.players[1].hand).length; i++) {
        // and we expect active player to have disabled: false property in each card
        expect(Object.values(result.game.players[1].hand)[i]).toHaveProperty('disabled', false);
    }
    // ожидаем, что у активного игрокf (Моревна) счетчик хода равен 0 так как после полного хода-
    // - 2 действия, он снfчала равен 2, но тут же при переходе хода он обнуляется
    expect(result.game.players[1].moveCounter).toEqual(0);
});


// Test, that when active player attackes opponent with skullLantern card then
// all cards with item type are thrown to graveyard from the game table
test('msg ACTION received: active player attacks with  skullLantern, it moves all players cards with item type to graveyards', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    item: {
                        key10: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, initialpoints: 4, disabled: false,
                        },
                    },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: {
                            id: 'shieldsmall', type: 'item', category: 'shield', points: 2, initialpoints: 2, disabled: false,
                        },
                        key9: { type: 'action', disabled: false },
                        key2: { type: 'action', disabled: false },
                        key4: { type: 'action', disabled: false },
                    },
                    grave: {},
                },
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 14, maximum: 14 },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key8: {
                            id: 'shieldsmall', type: 'item', category: 'shield', points: 2, initialpoints: 2, disabled: false,
                        },
                        key13: { type: 'action', disabled: false },
                        key10: { type: 'action', disabled: false },
                        key1: {
                            id: 'skullLantern', type: 'action', category: 'attackItems', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта skullLantern окажется после атаки на кладбище активного игрока
    expect(result.game.players[1].grave.key1.id).toEqual('skullLantern');
    // ожидаем, что карта skullLantern активного игрока имеет категорию attackItems
    expect(result.game.players[1].grave.key1.category).toEqual('attackItems');

    // ожидаем, что карты с типом item из руки и item holder активного игрока уйдут на кладбище
    expect(Object.keys(result.game.players[1].grave)).toContain('key3', 'key8');
    expect(Object.keys(result.game.players[1].hand)).not.toContain('item');
    expect(Object.keys(result.game.players[1].item).length).toEqual(0);
    // ожидаем, что то карты с типом item из руки и item holder неактивного игрока уйдут на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key7', 'key10');
    expect(Object.keys(result.game.players[0].item).length).toEqual(0);
    expect(Object.keys(result.game.players[0].hand)).not.toContain('item');
});

// Test, that when Magic Mirror card is at any player's item holder then
// it reflects half of damage got from the opponent (or round down damage points to integer)
// and half of damage goes to the opponent back
test('msg ACTION received: inactive player has Magic Mirror in item, it reflects half of active player attack back.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    item: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key6: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта magic mirror в item holder неактивного игрока
    expect(result.game.players[0].item.key10.id).toEqual('magicMirror');
    // ожидаем, что карта magic mirror неактивного игрока имеет категорию - reflect
    expect(result.game.players[0].item.key10.category).toEqual('reflect');
    // ожидаем, что после атаки текущее здоровье неактивного игрока (Василисы) и активного Моревны
    // уменьшается только на половину очков атаки или др цело число , округленное в меньшую сторону
    // (3/2 =1.5 - округляем в меньшую сторону = 1 point)
    expect(result.game.players[0].health.current).toEqual(9);
    expect(result.game.players[1].health.current).toEqual(12);
    // ожидаем, что карта mirror находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.healthCurrent).not.toEqual(0);
    // ожидаем, что очки карты mirror, остануться неизменными
    expect(result.game.players[0].item.key10.healthCurrent).toEqual(2);
});

// Test, that when Magic Mirror card is at any player's item holder and when
// it reflects half of damage back to the opponent (or round down damage points to integer)
// and if opponent has a shield then reflected damage goes to the shield
test('msg ACTION received: inactive player has Magic Mirror in item, it reflects half of active player attack to her shield if any.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    item: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key6: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key15: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 2, health: 4, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта magic mirror в item holder неактивного игрока
    expect(result.game.players[0].item.key10.id).toEqual('magicMirror');

    // ожидаем, что после атаки текущее здоровье неактивного игрока (Василисы)
    // уменьшается только на половину очков атаки или др цело число , округленное в меньшую сторону
    // (3/2 =1.5 - округляем в меньшую сторону = 1 point)
    expect(result.game.players[0].health.current).toEqual(9);
    // ожидаем, что здоровье активного игрока Моревны не уменьшится
    expect(result.game.players[1].health.current).toEqual(13);
    // ожидаем, что здоровье щита в item Моревны уменьшится на половину атаки
    expect(result.game.players[1].item.key15.healthCurrent).toEqual(1);
});

// Test, that when Magic Mirror card is at any player's item holder and when
// it reflects half of damage back to the opponent (or round down damage points to integer)
// and if opponent has a shield then reflected damage goes to the shield and rest to opponent if damage is more than shield health
test('msg ACTION received: inactive player has Magic Mirror in item, it reflects half of active player attack to shield and then damage player.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    item: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key6: {},
                        key1: {
                            type: 'action', category: 'attack', points: 6, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key15: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 2, health: 4, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта magic mirror в item holder неактивного игрока
    expect(result.game.players[0].item.key10.id).toEqual('magicMirror');

    // ожидаем, что после атаки текущее здоровье неактивного игрока (Василисы)
    // уменьшается только на половину очков атаки == 3 pnts
    expect(result.game.players[0].health.current).toEqual(7);
    // ожидаем, что здоровье активного игрока Моревны уменьшится на 1 очко
    expect(result.game.players[1].health.current).toEqual(12);
    // ожидаем, что щит в item Моревны примет 2 очка ( т.к. его текущее здоровье только 2 и уйдет на кладбище)
    expect(Object.keys(result.game.players[1].grave)).toContain('key15');
});

// Test, that when Magic Mirror card is at inactive player's item holder then after attack
// card points <= 0, mirror card goes to graveyard and gets its initial points back
test('msg ACTION received: inactive player has Magic Mirror in item, after attack its points <=0 and card goes to graveyard.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 8, maximum: 14 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key6: {},
                    },
                    item: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    health: { current: 10, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key6: {},
                        key1: {
                            type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта magic mirror на кладбище неактивного игрока
    expect(Object.keys(result.game.players[0].grave)).toContain('key10');
    // ожидаем, что карта mirror после второга хода игрока обнулится и уйдет на кладбище
    // и ее points получат назад первоначальное значение
    expect(result.game.players[0].grave.key10.healthCurrent).toEqual(2);
});

// Test, that active player can put Magic Mirror card in item holder
test('msg ACTION received: active player can put Magic Mirror in item holder.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    item: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта magic mirror в item holder активного игрока
    expect(result.game.players[0].item.key10.id).toEqual('magicMirror');
});

// Test, that when inactive player has  magicTree item in  item holder,
// then active player can make only one action in 1 turn (turn changes once moveCounter == 1 not 2 as usual)
test('msg ACTION received: active can make only 1 action in 1 turn if inactive player has magicTree in item holder', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    item: {
                        key10: {
                            id: 'magicTree', type: 'item', category: 'holdTurn', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: { type: 'action', disabled: false },
                        key4: { type: 'action', disabled: false },
                    },
                    grave: {},
                },
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key8: { type: 'item', disabled: false },
                        key13: { type: 'action', disabled: false },
                        key10: { type: 'action', disabled: false },
                        key1: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что ход сменился и Yaga стала активным игроком
    expect(result.game.players[0].active).toEqual(true);
    // а Premudraya стала неактивным игроком и ее счетчик хода снова обнулился
    expect(result.game.players[1].active).toEqual(false);
    expect(result.game.players[1].moveCounter).toEqual(0);

    // ожидаем, что карта magicTree лежит в item holder активного игрока Yaga
    expect(result.game.players[0].item.key10.id).toEqual('magicTree');
    // ожидаем, что карта magicTree активного игрока имеет категорию holdTurn
    expect(result.game.players[0].item.key10.category).toEqual('holdTurn');
});

// test to show 3 next cards in opponent cards once active player attacks opponent with clairvoyance card
test('msg ACTION received: player attack opponent with clairvoyance card and can see next 3 opponent cards', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key10: {
                            id: 'clairvoyance', type: 'action', category: 'showCards', points: 1, initialpoints: 1, disabled: false,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    cards: {
                        key0: { id: 'apple' },
                        key2: { id: 'bulat' },
                        key13: { id: 'bogatyr' },
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у карты, которой ходит активный игрок, id == clairvoyance
    expect(result.game.players[0].grave.key10.id).toEqual('clairvoyance');

    // ожидаем, что у неактивного игрока, в cardsShown появятся первые три карты из cards
    expect(Object.keys(result.game.players[1].cardsShown)).toContain('key0', 'key2', 'key13');
    // ожидаем, что у неактивного игрока, в cards сохранятся три карты показанные в cardsShown
    expect(Object.keys(result.game.players[1].cards)).toContain('key0', 'key2', 'key13');
});

// test to remove cardsShown from opponent object once player attacked with clairvoyance card becomes active ( change of turn)
test('msg ACTION received: after turn changes cardsShown is removed from player who has been attacked with clairvoyance card', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key5',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key8: {
                            id: 'shieldsmall', type: 'item', category: 'shield', points: 2, initialpoints: 2, disabled: false,
                        },
                        key13: { type: 'action', disabled: false },
                        key5: { type: 'action', disabled: false },
                        key1: {
                            id: 'skullLantern', type: 'action', category: 'attackItems', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    grave: {
                        key10: {
                            id: 'clairvoyance', type: 'action', category: 'showCards', points: 1, initialpoints: 1, disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    cards: {
                        key0: { id: 'apple' },
                        key2: { id: 'bulat' },
                        key13: { id: 'bogatyr' },
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    cardsShown: {
                        key0: { id: 'apple' },
                        key2: { id: 'bulat' },
                        key13: { id: 'bogatyr' },
                    },
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у карты, которой ходил ранее активный игрок, id == clairvoyance
    expect(result.game.players[0].grave.key10.id).toEqual('clairvoyance');

    // ожидаем, что у противника исчезнет cardsShown после перехода к нему хода
    expect(Object.values(result.game.players[1])).not.toContain('cardsShown');
});

// test that once player acts with any card, while having malachiteBox card in item holder,
// then opponent also is attacked by bat card
test('msg ACTION received: player has malachiteBox in item, when player acts then opponent is attacked by bat card', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'hozyaika',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                    },
                    item: {
                        key1: {
                            id: 'malachiteBox', type: 'item', category: 'generator', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 14, maximum: 16 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у активного игрока в item holder лежит карта с id == malachiteBox
    expect(Object.values(result.game.players[0].item)[0].id).toEqual('malachiteBox');
    // ожидаем, что у активного игрока в item holder лежит карта с id == malachiteBox
    expect(result.game.players[0].moveCounter).toEqual(1);

    // ожидаем, что у неактивного игрока, health current == 9
    expect(result.game.players[1].health.current).toEqual(9);
});

// test that active player can put malachiteBox card in item holder,
// the opponent health current does not increased (only on next act of player)
test('msg ACTION received: player can put malachiteBox in item, opponent health is not increased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'hozyaika',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                        key1: {
                            id: 'malachiteBox', type: 'item', category: 'generator', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    item: {},

                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 14, maximum: 16 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {},
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у активного игрока в item holder лежит карта с id == malachiteBox
    expect(Object.values(result.game.players[0].item)[0].id).toEqual('malachiteBox');
    // ожидаем, что у активного игрока в item holder лежит карта с id == malachiteBox
    expect(result.game.players[0].moveCounter).toEqual(1);

    // ожидаем, что у неактивного игрока не изменится, health current == 14
    expect(result.game.players[1].health.current).toEqual(14);
});

// Test, that when active player attacks opponent with turningPotion card
// then active player get turningHand property so next act player can chose any one card from opponent hand to act
// and his move counter to be increased by 1 only for act by both these cards
test('msg ACTION received: active player attacks with turningPotion and can choose any 1 card from opponent hand to act for 1 move', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key4',
        target: 'item',
    };
    const sendReply = jest.fn();
    // we set app game in needed state for testing
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {},
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key4: {
                            id: 'bowArrow', type: 'item', category: 'supress', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    moveCounter: 1,
                    grave: {},
                },
            ],
        },
    });

    application.msgReceived(msg, sendReply);
    // We return random to initial value, so it is not always set to 1
    // Math.random = oldRandom;
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карт лук и стрелы лежат в item активного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('bowArrow');
});

// Test that player can put  Bow and Arrows card in item holder
test('msg ACTION received: player can put Bow&Arrow card in item.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key4',
        target: 'item',
    };
    const sendReply = jest.fn();
    // we set app game in needed state for testing
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {},
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key4: {
                            id: 'bowArrow', type: 'item', category: 'supress', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    moveCounter: 1,
                    grave: {},
                },
            ],
        },
    });

    application.msgReceived(msg, sendReply);
    // We return random to initial value, so it is not always set to 1
    // Math.random = oldRandom;
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карт лук и стрелы лежат в item активного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('bowArrow');
});

// Test that once Bow and Arrows card is at opponent item holder, 2 player's
// cards with > 1 point have 60%  chance to loose 1 point at the beggining of every turn ( move counter +1)
test('msg ACTION received: if Bow&Arrow card is at opponent item, then with 60% 2 cards in player hand can loose 1 point at next acttion.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
                        },
                        key5: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                        key7: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key9: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false,
                        },
                        key6: {
                            id: 'blabla', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key2: {
                            id: 'testtest', type: 'item', category: 'attack', points: 5, initialpoints: 5, disabled: false,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {
                        key4: {
                            id: 'bowArrow', type: 'item', category: 'supress', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карт лук и стрелы лежат в item неактивного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('bowArrow');
    // ожидаем 2 карты в руке оппонента, которые приа активации карты bowArrow все также с уменьшенными на 1 очками
    expect(result.game.players[0].grave.key1.points).toEqual(2);
    expect(result.game.players[0].hand.key9.points).toEqual(4);
});

// Test, that when active player attacks opponent with turningPotion card
// then active player get turningHand property so next act player can chose any one card from opponent hand to act
// and his move counter to be increased by 1 only for act by both these cards
test('msg ACTION received: active player attacks with turningPotion and at next act can choose any 1 card from opponent hand to act for 1 move', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key4',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: { type: 'action', disabled: false },
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                    moveCounter: 1,
                    grave: {},
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key1: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что Yaga сходила картой turningPotion, и та после ходя ушла на кладбище
    expect(result.game.players[0].grave.key4.id).toEqual('turningPotion');
    // ожидаем, что ход не сменится и Yaga продолжает быть активным игроком
    expect(result.game.players[0].active).toEqual(true);
    // и ее счетчик хода не увеличился и равен 1
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что у Yaga появится свойство turningHand: true,
    // которое позволит ей выбрать карту из руки противника
    // и у Премудрой также появилось это свойство (для frontend)
    expect(result.game.players[0].turningHand).toEqual(true);
    expect(result.game.players[1].turningHand).toEqual(true);
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// and now player choses one card from opponent's hand to move it to opponent's grave
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put 1 card from opponent hand to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'graveyard',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('horsemanRed');
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// that now player choses one card from opponent's hand to heal herself /  himself
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put 1 card from opponent hand to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'hero',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 10, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'dolly', type: 'action', category: 'heal', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что здоровье Яги увеличится на 2 очка
    expect(result.game.players[0].health.current).toEqual(12);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('dolly');
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to attack opponent
// opponent shield in item holder took some damage and goes to graveyard as well as active card
// opponent's health to be decrease by difference (if any active card points left)
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now attacks opponent with 1 card from opponent hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('horsemanRed');
    // ожидаем, что щит из item holder Премудрой ушёл на кладбище
    expect(Object.keys(result.game.players[1].grave)).toContain('key3');
    // ожидаем, что текущее здоровье Премудрой уменьшилось на 1
    expect(result.game.players[1].health.current).toEqual(9);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(result.game.players[0].health.current).toEqual(15);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to put it to her/his own item holder
// such card in player's item holder got fromOpponent: true property, so we may return it back to opponent cards
// after furutre attack when this card health to be == 0 and card would go to opponent graveyard
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put in his/her item holder 1 card from opponent hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'shieldLarge', type: 'item', category: 'shield', health: 4, healthCurrent: 4, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что карта из руки Премудрой ушла Яге в item holder
    expect(result.game.players[0].item.key2.id).toEqual('shieldLarge');
    // ожидаем, что карта в item holder Яги приобрела свойство fromOpponent: true
    expect(result.game.players[0].item.key2.fromOpponent).toEqual(true);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(result.game.players[0].health.current).toEqual(15);
});

// Test, that when inactive player previoulsy put shield card from opponent's hand to her/his own item holder
// with the help of turningPotion card
// opponent now attacks inactive player and shield card goes back to opponent's grave ( so cards remain same as when dealt)
// fromOpponent: true property has been removed now from this shield card in inactive player's item holder
test('msg ACTION received: inactive player put in own item holder shield card from opponent hand, after attack against player it returns to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {
                        key2: {
                            id: 'shieldLarge', type: 'item', category: 'shield', health: 4, healthCurrent: 2, disabled: false, fromOpponent: true,
                        },
                    },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что карта почле атаки ушло Премудрой на кладбище из item holder Яги
    expect(result.game.players[1].grave.key2.id).toEqual('shieldLarge');
    // ожидаем, что карта потеряла свойство fromOpponent: true, уйдя из item holder Яги
    expect(result.game.players[1].grave.key2).not.toContain('fromOpponent');
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что текущее здоровье Yaga уменьшилось на 2
    expect(result.game.players[0].health.current).toEqual(13);
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// and now player choses one card from opponent's hand to move it to opponent's grave
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put 1 card from opponent hand to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'graveyard',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('horsemanRed');
});

// Test, that when active player has already attacked opponent with turningPotion card
// and active player has gotten turningHand property,
// that now player choses one card from opponent's hand to heal herself /  himself
// and only now his move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put 1 card from opponent hand to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'hero',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 10, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'dolly', type: 'action', category: 'heal', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что здоровье Яги увеличится на 2 очка
    expect(result.game.players[0].health.current).toEqual(12);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('dolly');
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to attack opponent
// opponent shield in item holder took some damage and goes to graveyard as well as active card
// opponent's health to be decrease by difference (if any active card points left)
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now attacks opponent with 1 card from opponent hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что выбранная Ягой карта из руки Премудрой ушла на кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('horsemanRed');
    // ожидаем, что щит из item holder Премудрой ушёл на кладбище
    expect(Object.keys(result.game.players[1].grave)).toContain('key3');
    // ожидаем, что текущее здоровье Премудрой уменьшилось на 1
    expect(result.game.players[1].health.current).toEqual(9);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(result.game.players[0].health.current).toEqual(15);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to put it to her/his own item holder
// such card in player's item holder got fromOpponent: true property, so we may return it back to opponent cards
// after furutre attack when this card health to be == 0 and card would go to opponent graveyard
// player's move counter to be increased by 1 (after 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now put in his/her item holder 1 card from opponent hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: { id: 'bogatyr', type: 'action', disabled: false },
                        key2: {
                            id: 'shieldLarge', type: 'item', category: 'shield', health: 4, healthCurrent: 4, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // и ее счетчик хода сначала увеличился до 2х, а потом обнулился при переходе хода
    expect(result.game.players[0].moveCounter).toEqual(0);
    // ожидаем, что карта из руки Премудрой ушла Яге в item holder
    expect(result.game.players[0].item.key2.id).toEqual('shieldLarge');
    // ожидаем, что карта в item holder Яги приобрела свойство fromOpponent: true
    expect(result.game.players[0].item.key2.fromOpponent).toEqual(true);
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(result.game.players[0].health.current).toEqual(15);
});

// Test, that when inactive player previoulsy put shield card from opponent's hand to her/his own item holder
// with the help of turningPotion card
// opponent now attacks inactive player and shield card goes back to opponent's grave ( so cards remain same as when dealt)
// fromOpponent: true property has been removed now from this shield card in inactive player's item holder
test('msg ACTION received: inactive player put in own item holder shield card from opponent hand, after attack against player it returns to opponent graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {
                        key2: {
                            id: 'shieldLarge', type: 'item', category: 'shield', health: 4, healthCurrent: 2, disabled: false, fromOpponent: true,
                        },
                    },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key10: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что карта почле атаки ушло Премудрой на кладбище из item holder Яги
    expect(result.game.players[1].grave.key2.id).toEqual('shieldLarge');
    // ожидаем, что карта потеряла свойство fromOpponent: true, уйдя из item holder Яги
    expect(result.game.players[1].grave.key2).not.toContain('fromOpponent');
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что текущее здоровье Yaga уменьшилось на 2
    expect(result.game.players[0].health.current).toEqual(13);
});

// Test, that when active player has attacked with turningPotion card and got turningHand property,
// then now player choses one card from opponent's hand to put attack item card in opponent item holder
// such card in opponent item holder  and the active card both go to opponent graveyard
// player's move counter to be increased by 1 (after this 2nd act)
test('msg ACTION received: active player attacked with turningPotion and now attacks opponent item with the card from opponent hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key2',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key2
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    item: {},
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: {
                            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    turningHand: true,
                    grave: {
                        key4: {
                            id: 'turningPotion', type: 'action', category: 'turning', disabled: false,
                        },
                    },
                },
                {
                    active: false,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key15: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: {
                            id: 'skullLantern', type: 'action', category: 'attackItems ', disabled: false,
                        },
                        key8: { id: 'shieldsmall', type: 'item', disabled: false },
                        key13: { id: 'horsemanWhite', type: 'action', disabled: false },
                        key2: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                        key10: {
                            id: 'shieldLarge', type: 'item', category: 'shield', health: 4, healthCurrent: 4, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    turningHand: true,
                    item: {
                        key3: {
                            id: 'magicMirror', type: 'item', category: 'reflect', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                    grave: {
                        key1: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что у Yaga и у Премудрой пропало свойство turningHand: true
    expect(result.game.players[0].turningHand).not.toEqual(true);
    expect(result.game.players[1].turningHand).not.toEqual(true);
    // ожидаем, что ход сменится и Yaga неактивный игрок
    expect(result.game.players[0].active).toEqual(false);
    // ожидаем, что карта из item holder Премудрой ушла на её кладбище
    expect(result.game.players[1].grave.key3.id).toEqual('magicMirror');
    // ожидаем, что активная карта из руки Премудрой ушла на её кладбище
    expect(result.game.players[1].grave.key2.id).toEqual('bogatyr');
    // ожидаем, что текущее здоровье Премудрой не изменилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что текущее здоровье Yaga не изменилось
    expect(result.game.players[0].health.current).toEqual(15);
});

// Test that active player can put  forestMushroom card in item holder,
// then once turn changes, at next action opponent can get forest mushroom panic with 60 % chance,
// so opponent at the beggining of his next action can act only with this one random card from his/her hand ( move counter +1)
test('msg ACTION received: if forestMushroom card is at player item holder, then with 60% opponent can get only 1 random card available from hand.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key4',
        target: 'item',
    };
    const sendReply = jest.fn();
    // we set app game in needed state for testing
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
                        },
                        key7: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key5: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },

                        key9: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 13, maximum: 15 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key4: {
                            id: 'forestMushroom', type: 'item', category: 'panic', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    item: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    moveCounter: 1,
                    grave: {},
                },
            ],
        },
    });

    application.msgReceived(msg, sendReply);
    // We return random to initial value, so it is not always set to 1
    // Math.random = oldRandom;
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта "лесные грибы" лежит в item holder у Яги
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('forestMushroom');
    // ожидаем, что произошла смена хода и активный игрок теперь - Василиса
    expect(result.game.players[0].active).toEqual(true);
    // ожидаем, так как сменился ход - Василиса стала активной, и с 60% вероятностью лесные грибы сработали
    // и одна рэндомная карта в руке Василисы приобрела свойство panic: false, остальные - panic: true
    // ожидаем, что оставшиеся карты в руке Василисы потеряли свойство panic: true
    expect(result.game.players[0].hand).toEqual(
        {
            key10: {
                id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key7: {
                id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: false,
            },
            key5: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: true,
            },

            key9: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
            },
        },
    );
});

// Test that if opponent has forestMushroom card in item holder, then with 60 % chance,
// active player's one random card in hand got panic: false property and other cards - panic: true incl item, at the beggining of action
// and then player acted with this one random card, it went to graveyard and panic: false property dissapeared
// and then again with 60 % chance cards got panic: true property except one random that gets panic: false
test('msg ACTION received: if forestMushroom card is at opponent item, then with 60% player can act only by 1 random card from hand at this action.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key7',
        target: 'itemOpponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key5: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
                        },
                        key7: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: false,
                        },
                        key9: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: true,
                        },
                    },
                    item: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
                        },
                    },
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 13, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {
                        key4: {
                            id: 'forestMushroom', type: 'item', category: 'panic', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карта forestMushroom лежит в item holder неактивного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('forestMushroom');
    // ожидаем, здоровье карты forestMushroom после атаки активного игрока уменьшилось
    expect(Object.values(result.game.players[1].item)[0].healthCurrent).toEqual(1);
    // ожидаем, что оставшиеся карты в руке Василисы потеряли свойство panic: true
    expect(result.game.players[0].hand).toEqual(
        {
            key5: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key9: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
            },
        },
    );
    expect(Object.values(result.game.players[0].item)[0].panic).toEqual(true);
    // ожидаем, что Василиса походила, moveCounter + 1
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что предыдущая рэндоманая карта с ключом 7 потеряла свойство panic, уйдя на кладбище
    expect(result.game.players[0].grave.key7).toEqual(
        {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    );
    // ожидаем, что здоровье карты 'forestMushroom' в item Яги уменьшилось на 1
    expect(Object.values(result.game.players[1].item)[0].healthCurrent).toEqual(1);
});

// Test that if opponent has forestMushroom card in item holder, and with 60 % chance,
// active player's one random card in hand got at the beggining of action panic: false property ,
// and now player acted with this one random card, it went to graveyard and panic property dissapeared
// 'forestMushroom' card has lost its healthCurrent points and went to graveyard
// no cards in hand of player got any panic property now
test('msg ACTION received: if forestMushroom card is at opponent item, then at 2nd act active player has 60% chance to act only by 1 random card from hand at next action.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key9',
        target: 'itemOpponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
                        },
                        key9: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
                        },
                        key7: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: true,
                        },
                        key5: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 1,
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 13, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {
                        key4: {
                            id: 'forestMushroom', type: 'item', category: 'panic', health: 2, healthCurrent: 1, disabled: false,
                        },
                    },
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карта 'forestMushroom' ушла на кладбище Яги и здоровье ее восстановилось
    expect(result.game.players[1].grave.key4.healthCurrent).toEqual(2);
    expect(Object.values(result.game.players[1].grave)).toContainEqual(
        expect.objectContaining(
            { category: 'panic', disabled: false, health: 2, healthCurrent: 2, id: 'forestMushroom', type: 'item' },
        ),
    );
    // ожидаем, что активная карта с ключом 9, после атаки ушла на кладбище
    // и потеряла свойство panic: true
    expect(result.game.players[0].grave.key9).toEqual(
        {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
        },
    );
    // ожидаем, что ни одна из карт в руке Василисы не содержат свойства panic: true
    expect(Object.values(result.game.players[0].hand)).not.toContainEqual({ panic: true });
    expect(Object.values(result.game.players[0].hand)).not.toContainEqual({ panic: false });
    // ожидаем, что Василиса походила, moveCounter + 1 = 2 а потом обнулился при переходе хода
    // и Василиса стала неактивной
    expect(result.game.players[0].moveCounter).toEqual(0);
    expect(result.game.players[0].active).toEqual(false);
});

// Test that if active player has forestMushroom card in item holder from previous turn, then with 60 % chance,
// opponent's one random card in hand got at previous act panic: true property ,
// then if active player acts now - none of the cards get panic property
test('msg ACTION received: if forestMushroom card is at opponent item, player got 60% chance and acted with 1 random card from hand, turn change, no panic .', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'hero',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
                        },
                        key5: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key7: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 1,
                },
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 10, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                    },
                    hand: {
                        key10: {
                            id: 'chickenLegsHut', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false,
                        },
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {
                        key4: {
                            id: 'forestMushroom', type: 'item', category: 'panic', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что Yaga походила, moveCounter + 1
    expect(result.game.players[1].moveCounter).toEqual(1);
    expect(result.game.players[1].health.current).toEqual(15);
    // ожидаем, что карта forestMushroom лежит в item holder неактивного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('forestMushroom');
    // ожидаем, что здоровье карты 'forestMushroom' в item Яги после её дейтсвия не уменьшилось
    expect(Object.values(result.game.players[1].item)[0].healthCurrent).toEqual(2);
    // we check every card in hand of active player Yaga
    for (let i = 0; i < Object.keys(result.game.players[1].hand).length; i++) {
        // ожидаем, что ни одна из карт в руке Яги не содержат свойства panic: true
        expect(Object.values(result.game.players[1].hand)[i]).not.toHaveProperty('panic', true);
    }
    // ожидаем, что предыдущая рэндоманая карта Василисы с ключом 7
    // осталась у неё в руке и сохраниласвойство panic до следующего её хода
    expect(result.game.players[0].hand.key7).toEqual(
        {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
        },
    );
    // we check every card in hand of inactive player Premudraya
    for (let c = 0; c < Object.keys(result.game.players[0].hand).length; c++) {
        // ожидаем, что ни одна из карт в руке Яги не содержат свойства panic: true, кроме 'chemise'
        // eslint-disable-next-line no-unused-expressions
        Object.values(result.game.players[1].hand)[c].id === 'chemise' ? c += 1 : null;
        expect(Object.values(result.game.players[1].hand)[c]).not.toHaveProperty('panic', true);
    }
});

// Test that if opponent atacked player with russianOven,
// player got 2 cards with disabled: true ( he can not act with these cards)
// and since opponent has forestMushroom card in item holder, then with 60 % chance,
// active player's one random card in hand got panic: false property and other cards - panic: true, at the beggining of action
// and if  the same random card get panic: false that already got disabled: true,
// then we delete disbabled: true and override panice: false instead - player can act with this card
test('msg ACTION received: forestMushroom card is at opponent item && player attacked by russianOver, then with 60% player can act only by 1 random card even if it was chained by russian Oven.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key7',
        target: 'opponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                        key1: {
                            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
                        },
                        key7: {
                            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key9: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: true,
                        },
                        key5: {
                            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: true,
                        },
                    },
                    item: {},
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 13, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {
                        key4: {
                            id: 'forestMushroom', type: 'item', category: 'panic', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карта forestMushroom лежит в item holder неактивного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('forestMushroom');
    // ожидаем, что Василиса походила, moveCounter + 1
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что оставшиеся карты в руке Василисы потеряли свойство panic: true
    expect(result.game.players[0].hand).toEqual(
        {
            key10: {
                id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key9: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
            },
            key5: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: true, panic: true,
            },
        },
    );
    // ожидаем, что  карта с ключом 7 без panic, уйдя на кладбище
    expect(result.game.players[0].grave.key7).toEqual(
        {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    );
});

// Test that if opponent has plateMail card in item holder,
// then active player's attack card damages opponent for points -1,
// and this 1 pnt is reflected back to player
test('msg ACTION received: if plateMail card is at opponent item, player get 1 pnts back from attack, where opponent get health damage less for 1 pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {},
                    item: {
                        key4: {
                            id: 'plateMail', type: 'item', category: 'reflect', health: 3, healthCurrent: 3, disabled: false,
                        },
                    },
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 10, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                    },
                    hand: {
                        key10: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {},
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карта plateMail лежит в item holder неактивного игрока
    expect(Object.values(result.game.players[0].item)[0].id).toEqual('plateMail');
    // ожидаем, что здоровье Yaga уменьшилось на 1
    expect(result.game.players[1].health.current).toEqual(9);
    // ожидаем, что здоровье карты 'plateMail' в item Моревны после её дейтсвия не уменьшилось
    expect(Object.values(result.game.players[0].item)[0].healthCurrent).toEqual(3);
    // ожидаем, что здоровье Моревны уменьшилось на 3 очка вметсо 4х
    expect(result.game.players[0].health.current).toEqual(10);
});

// Test that if opponent has plateMail card in item holder,
// then active player's attack card which attack points ==1
// damages opponent and player for 0 points,
test('msg ACTION received: if plateMail card is at opponent item, player get 1 pnts back from attack, where opponent get health damage less for 1 pnt.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    hand: {},
                    item: {
                        key4: {
                            id: 'plateMail', type: 'item', category: 'reflect', health: 3, healthCurrent: 3, disabled: false,
                        },
                    },
                    grave: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'yaga',
                    health: { current: 10, maximum: 15 },
                    grave: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                    },
                    hand: {
                        key10: {
                            id: 'gusiLebedi', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    item: {},
                    moveCounter: 0,
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карта plateMail лежит в item holder неактивного игрока
    expect(Object.values(result.game.players[0].item)[0].id).toEqual('plateMail');
    // ожидаем, что здоровье Яги не уменьшилось
    expect(result.game.players[1].health.current).toEqual(10);
    // ожидаем, что здоровье карты 'plateMail' в item Моревны после её дейтсвия не уменьшилось
    expect(Object.values(result.game.players[0].item)[0].healthCurrent).toEqual(3);
    // ожидаем, что здоровье Моревны не уменьшилось
    expect(result.game.players[0].health.current).toEqual(13);
});
