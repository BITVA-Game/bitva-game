// import module for tests
const application = require('../backend/application');


// If it's the first INITIAL message from frontend, return the app in it's initial state
test('Game loaded. Send the app in its initial state', () => {
    // Create a messade that has type and may have additional data later.
    // We only need type for this test.
    const msg = { type: 'INITIAL' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            profile: {
                characters: ['morevna'],
                deck: ['apple'],
                silver: 5,
                gold: 0,
            },
            manager: {
                screen: 'STARTSCREEN',
            },
            game: {

            },
        },
    );
});

// Test the first game state Play, returns the available characters
test('First game state Play. The Player can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: 'PLAY' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            profile: {
                characters: ['morevna'],
                deck: ['apple'],
                silver: 5,
                gold: 0,
            },
            manager: {
                screen: 'HEROSELECT',
            },
            game: {

            },
        },
    );
});


// Test msg PLAY returns list with all available characters.game state  Hero Select.
test('PLAY msg received. List with all characters added - HERO SELECT state.', () => {
// We only need type for this test.
    const msg = { type: 'PLAY' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toEqual(
        {
            profile: {
                characters: ['morevna'],
                deck: ['apple'],
                silver: 5,
                gold: 0,
            },
            heroSelect: {
                morevna: {
                    id: 'morevna',
                    name: 'Мarya Мorevna',
                    description: 'Lady bogatyr of steppe, crown queen possesing great sorcerous powers, who enchained Koschei the Deathless.',
                    health: 13,
                    cards: {
                        bajun: {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            count: 2,
                        },
                        sivka: {
                            id: 'sivka',
                            name: 'Sivka-Burka',
                            count: 1,
                        },
                        bogatyr: {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            count: 3,
                        },
                        apple: {
                            id: 'apple',
                            name: 'Apple',
                            count: 4,
                        },
                        bereginya: {
                            id: 'bereginya',
                            name: 'Bereginya',
                            count: 4,
                        },
                        shieldLarge: {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            count: 2,
                        },
                        shieldSmall: {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            count: 3,
                        },
                    },
                },

                yaga: {
                    id: 'yaga',
                    name: 'Yaga',
                    description: 'Yaga can lead a person between realm of the dead and the living. She is a Witch, Keeper of the Living and Dead water.',
                    health: 15,
                    cards: {
                        bajun: {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            count: 2,
                        },
                        sivka: {
                            id: 'sivka',
                            name: 'Sivka-Burka',
                            count: 1,
                        },
                        bogatyr: {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            count: 3,
                        },
                        apple: {
                            id: 'apple',
                            name: 'Apple',
                            count: 4,
                        },
                        bereginya: {
                            id: 'bereginya',
                            name: 'Bereginya',
                            count: 4,
                        },
                        shieldLarge: {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            count: 2,
                        },
                        shieldSmall: {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            count: 3,
                        },
                    },
                },
            },
            manager: {
                screen: 'HEROSELECT',
            },
            game: {

            },
        },
    );
});

// Test that msg HEROSELECTED clears the characters list and turn state into HERO SELECTED
test('msg HEROSELECTED received. List with charactes cleared. State Hero Selected.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            profile: {
                characters: ['morevna'],
                deck: ['apple'],
                silver: 5,
                gold: 0,
            },
            heroSelect: {
            },
            game: {

            },
        },
    );
});

// screen swtich to state VERSUS after hero is selected
test('msg HEROSELECTED switches screen state to VERSUS', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            profile: {
                characters: ['morevna'],
                deck: ['apple'],
                silver: 5,
                gold: 0,
            },
            heroSelect: {
            },
            manager: {
                screen: 'VERSUS',
            },
            game: {

            },
        },
    );
});

// Test that one player has become active. Game state VERSUS.
test('msg HEROSELECTED received: active player is set.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set it to 0
    Math.random = jest.fn();
    Math.random.mockReturnValue(0);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            game: {
                players: [
                    { active: true },
                    { active: false },
                ],
            },
        },
    );
});

// Test that active player gets its character's deck. Game state VERSUS.
test('msg HEROSELECTED received: active player has a character and 15 cards.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[1].hero).toEqual('morevna');
    expect(Object.keys(result.game.players[1].cards).length).toEqual(15);
});

// Test that inactive player gets its character and it's deck. Game state VERSUS.
test('msg HEROSELECTED received: inactive player gets available character and 15 cards.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[0].hero).toEqual('yaga');
    expect(Object.keys(result.game.players[0].cards).length).toEqual(15);
});

// Test that players gets their characters health. Game state VERSUS.
test('msg HEROSELECTED received: player gets character healths.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[0].hero).toEqual('yaga');
    expect(result.game.players[0].health.current).toEqual(15);

    expect(result.game.players[1].hero).toEqual('morevna');
    expect(result.game.players[1].health.current).toEqual(13);
});

// Test that each player has its hand empty. State Hero Selected.
test('msg HEROSELECTED received: Players hand is empty. State Hero Selected.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[0].hero).toEqual('yaga');
    expect(result.game.players[0].hand).toEqual({});

    expect(result.game.players[1].hero).toEqual('morevna');
    expect(result.game.players[1].hand).toEqual({});
});

// Test that both players get 5 cards from deck to their hands. Game state Deal All.
test('msg DEALALL received: Players hands have 5 cards each. Players cards have 5 cards less. State Deal All.', () => {
    const msg = { type: 'DEALALL' };
    // Mock sendReply function
    const sendReply = jest.fn();


    // Mock will rewrite all game state and set it to DealAll case
    application.setApp({
        game: {
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    cards: {
                        key1: {},
                        key15: {},
                        key18: {},
                        key3: {},
                        key7: {},
                        key9: {},
                        key2: {},
                        key6: {},
                        key14: {},
                        key0: {},
                    },
                    hand: {
                        key4: {}, key11: {}, key10: {}, key16: {}, key5: {},
                    },
                    health: 15,
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
                    hand: {
                        key11: {}, key10: {}, key1: {}, key8: {}, key13: {},
                    },
                    health: 13,
                },
            ],
        },
    });


    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[0].hero).toEqual('yaga');
    expect(Object.keys(result.game.players[0].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[0].cards).length).toEqual(10);

    expect(result.game.players[1].hero).toEqual('morevna');
    expect(Object.keys(result.game.players[1].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[1].cards).length).toEqual(10);

    expect(result.manager.screen).toEqual('PLAYERACT');
});

// screen swtich to state STARTSCREEN after button TO START SCREEN is clicked
test('msg STARTSCREEN switches screen state to STARTSCREEN', () => {
    // We only need type for this test.
    const msg = { type: 'STARTSCREEN' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            manager: {
                screen: 'STARTSCREEN',
            },

        },
    );
});


// Test that active card is from active player's hand, his counter less than 2,
// then card goes to graveyard. Game state Case1.
test('msg CASE1 received: active card was in active player hand, then moved to graveyard. Counter <2. State Case1.', () => {
    const msg = {
        type: 'CASE1', key: 'key10', category: 'graveyard', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {

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
                    health: 13,
                    hero: 'morevna',
                    hand: {
                        key11: {}, key1: {}, key8: {}, key13: {},
                    },
                    moveCounter: 0,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                },
            ],

        },

    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // До действия -ожидаем, что активная карта пришла от активного игрока
    expect(result.game.players[0].active).toBeTruthy();
    // ожидаем, что активный игрок может действовать (его каунтер не равен 2)
    expect(result.game.players[0].moveCounter).toBeLessThan(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key10');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key10');
});

// Test msg with action card from active player's hand with category: 'action', class: 'heal'
// card heal hero for its points not > maximum, then card goes to graveyard. Game state Case2.
test('msg CASE2 received: action card is action and can heal, applies points to hero then moved to graveyard. State Case2.', () => {
    const msg = {
        type: 'CASE2', key: 'key1', category: 'heal', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: { type: 'action', points: 3 },
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что активный игрок может действовать (его каунтер не более 2 после хода)
    expect(result.game.players[0].moveCounter).toBeLessThanOrEqual(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(2);
    // ожидаем, что карта с очками здоровья - это карта-действие
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // ожидаем, что очки здоровья активной карты переданы в health героя
    expect(result.game.players[0].health.current).toEqual(8);
    // expect(result.game.players[0].grave.key1.points).toEqual(0);
    // ожидаем, что очки здоровья health героя не больше максимума
    expect(result.game.players[0].health.current).toBeLessThanOrEqual(13);
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test msg with action card from active player's hand with category: 'action', class: 'attack'
// card attack inactive hero but not > maximum, then card goes to graveyard. Game state Case3.
test('msg CASE3 received: card is action and can attack, no defense, points damages inactive hero health & card to graveyard. State Case3.', () => {
    const msg = {
        type: 'CASE3', key: 'key1', category: 'attack', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
    application.setApp({
        game: {
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: { type: 'action', category: 'attack', points: 2 },
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: { type: 'action' },
                    },
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

    // ожидаем, что активный игрок может действовать (его каунтер не более 2 после хода)
    expect(result.game.players[0].moveCounter).toBeLessThanOrEqual(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(2);
    // ожидаем, что карта имеет category атаки
    expect(result.game.players[0].grave.key1.category).toEqual('attack');
    // ожидаем, что карта с очками атаки - это карта-действие
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // ожидаем, что У противника нет защитных карт.
    expect(Object.values(result.game.players[1].item)).not.toContain('defense');
    // ожидаем, что очки здоровья inactive hero после удара будут больше или равны 0
    expect(result.game.players[1].health.current).toBeMoreThanOrEqual(0);
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test msg with action card from active player's hand with category: 'action', class: 'attack'
// Card attacks inactive hero for its points not but not mre than maximum,
// then card goes to graveyard. Game state Case3.
test('msg CASE3 received: card is action and can attack, inactive hero shield took points, shield & card go to graveyard. State Case3.', () => {
    const msg = {
        type: 'CASE3', key: 'key1', category: 'attack', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
    application.setApp({
        game: {
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: { type: 'action', category: 'attack', points: 3 },
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'defense', points: 3,
                        },
                    },
                    grave: { },
                },
            ],
        },
    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что активный игрок может действовать (его каунтер не более 2 после хода)
    expect(result.game.players[0].moveCounter).toBeLessThanOrEqual(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(2);
    // ожидаем, что карта имеет category атаки
    expect(result.game.players[0].grave.key1.category).toEqual('attack');
    // ожидаем, что карта с очками атаки - это карта-действие
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // ожидаем - щит противника принял все повреждение, отразив от него атаку, и ушел на кладбище.
    expect(Object.values(result.game.players[1].grave)).toContain('defense', 3);
    expect(result.game.players[1].item).toEqual({});
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test msg with action card from active player's hand with category: 'action', class: 'attack'
// card attacks inactive hero shield, which has defense points more than attack card, points lessen.
// Attack card goes to graveyard. Acrive player's Move counter +1. Game state Case3.
test('msg CASE3 received: card is action and can attack, inactive hero shield defens points lessen, card go to graveyard. State Case3.', () => {
    const msg = {
        type: 'CASE3', key: 'key1', category: 'attack', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
    application.setApp({
        game: {
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: { type: 'action', category: 'attack', points: 3 },
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'defense', points: 5,
                        },
                    },
                    grave: { },
                },
            ],
        },
    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что активный игрок может действовать (его каунтер не более 2 после хода)
    expect(result.game.players[0].moveCounter).toBeLessThanOrEqual(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(2);
    // ожидаем, что карта имеет category атаки
    expect(result.game.players[0].grave.key1.category).toEqual('attack');
    // ожидаем, что карта с очками атаки - это карта-действие
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // щит противника принял все повреждение, отразив от него атаку, его очки защиты уменьшаться.
    expect(result.game.players[1].item.points).toEqual(2);
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// У противника есть щит, здоровье щита меньше, чем сила удара.
// Щит убирается на кладбище противника. Здоровье противника уменьшается
// на разницу между силой удара и здоровьем щита.
// Карта атаки отправляется на кладбище. Действие засчитано.
test('msg CASE3 received: card is action and can attack, inactive hero shield took part of points, shield & card go to graveyard. State Case3.', () => {
    const msg = {
        type: 'CASE3', key: 'key1', category: 'attack', active: true,
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
    application.setApp({
        game: {
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: { type: 'action', category: 'attack', points: 5 },
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'defense', points: 3,
                        },
                    },
                    grave: { },
                },
            ],
        },
    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];
    // ожидаем, что активный игрок может действовать (его каунтер не более 2 после хода)
    expect(result.game.players[0].moveCounter).toBeLessThanOrEqual(2);
    // после действия ожидаем, что счетчик увеличен на 1
    expect(result.game.players[0].moveCounter).toEqual(2);
    // ожидаем, что карта имеет category атаки
    expect(result.game.players[0].grave.key1.category).toEqual('attack');
    // ожидаем, что карта с очками атаки - это карта-действие
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // ожидаем - щит противника принял часть повреждения, отразив от него атаку, и ушел на кладбище.
    expect(Object.values(result.game.players[1].grave)).toContain('defense', 3);
    expect(result.game.players[1].item).toEqual({});
    // ожидаем, что активная карта сохранилась на кладбище
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // ожидаем, что активная карта убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
    // ожидаем, что здоровье неактивного перса уменьшилось на очки аттаки, неотраженные щитом
    expect(result.game.players[1].health.current).toEqual(5);
});
