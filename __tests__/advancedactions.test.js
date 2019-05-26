/* eslint-disable max-len */
/* eslint-disable no-plusplus */

// import module for tests
const application = require('../backend/application');

jest.mock('../backend/randomFunc');

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
                            type: 'action', category: 'attack', points: 2, disabled: false,
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
    expect(result.game.players[0].grave.key10.id).toEqual('magicMirror');
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
