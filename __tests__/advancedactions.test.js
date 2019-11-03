/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */

// import module for tests
const application = require('../gameTerminal/application');

jest.mock('../gameTerminal/randomFunc');

// Test, that when inactive player has  magicTree item in  item holder,
// then active player can make only one action in 1 turn (turn changes once moveCounter == 1 not 2 as usual)
test.skip('msg ACTION received: active can make only 1 action in 1 turn if inactive player has magicTree in item holder', () => {
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

// Test that player can put  Bow and Arrows card in item holder
test.skip('msg ACTION received: player can put Bow&Arrow card in item.', () => {
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
test.skip('msg ACTION received: if Bow&Arrow card is at opponent item, then with 60% 2 cards in player hand can loose 1 point at next acttion.', () => {
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

// Test that active player can put  forestMushroom card in item holder,
// then once turn changes, at next action opponent can get forest mushroom panic with 60 % chance,
// so opponent at the beggining of his next action can act only with this one random card from his/her hand ( move counter +1)
test.skip('msg ACTION received: if forestMushroom card is at player item holder, then with 60% opponent can get only 1 random card available from hand.', () => {
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
test.skip('msg ACTION received: if forestMushroom card is at opponent item, then with 60% player can act only by 1 random card from hand at this action.', () => {
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
test.skip('msg ACTION received: if forestMushroom card is at opponent item, then at 2nd act active player has 60% chance to act only by 1 random card from hand at next action.', () => {
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
test.skip('msg ACTION received: if forestMushroom card is at opponent item, player got 60% chance and acted with 1 random card from hand, turn change, no panic .', () => {
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
test.skip('msg ACTION received: forestMushroom card is at opponent item && player attacked by russianOver, then with 60% player can act only by 1 random card even if it was chained by russian Oven.', () => {
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
