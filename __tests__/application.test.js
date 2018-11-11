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


// player moves a card to graveyard
test('msg ACTION CASE1, player wants to move his card to graveyard', () => {
    // active Card is always a card
    // target can be a place (item place, graveyard, deck, herom etc) or a card
    const msg = {
        type:'ACTION',
        activeCard: 'key10',
        target: 'graveyard'
    };
    // Mock sendReply function
    const sendReply = jest.fn();
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
                    // We expect the card 10 will be moved to graveyard
                    hand: {
                        key11: {}, key1: {}, key8: {}, key13: {}, key10: { points: 3,  },
                    },
                    moveCounter: 0,
                    //graveyard is empty
                    grave: {},
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

    // expect that player[0] is active
    expect(result.game.players[0].active).toBeTruthy();
    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(1);
    // оexpect the card to move to graveryard
    expect(Object.keys(result.game.players[0].grave)).toContain('key10');
    // expect the card to move out of the hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key10');
});

// player heals for less than max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing is less than his max', () => {
  const msg = {
      type:'ACTION',
      activeCard: 'key1',
      target: 'hero'
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
                        key11: {}, key8: {}, key13: {}, key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal'},
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
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

    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(2);
    // expect that the card was an action card
    expect(result.game.players[0].grave['key1'].type).toEqual('action');
    // expect that hero's health was increased
    expect(result.game.players[0].health.current).toEqual(8);
    // expect that the card was moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the card not to be in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player heals for over the max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing will go over max', () => {
  const msg = {
      type:'ACTION',
      activeCard: 'key1',
      target: 'hero'
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
                    health: { current: 12, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {}, key8: {}, key13: {}, key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal'},
                    },
                    moveCounter: 1,
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
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

    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(2);
    // expect that the card was an action card
    expect(result.game.players[0].grave['key1'].type).toEqual('action');
    // expect that hero's health was increased
    expect(result.game.players[0].health.current).toEqual(13);
    // expect that the card was moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the card not to be in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks unprotected enemy
test('msg ACTION CASE3 player attacks the enemy, no protection', () => {
  const msg = {
      type:'ACTION',
      activeCard: 'key13',
      target: 'opponent'
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
                        key11: {}, key8: {}, key13: {type: 'action', category: 'attack', points: 2}, key1: {},
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

    // expect the counter of actions to grow
    expect(result.game.players[0].moveCounter).toEqual(2);
    // expect that it was the action card
    expect(result.game.players[0].grave['key13'].type).toEqual('action');
    // expect that it was the attack card
    expect(result.game.players[0].grave['key13'].category).toEqual('attack');
    // expect opponent with no shield items
    expect(result.game.players[1].item).toEqual({});
    // expect opponents health to decrease
    expect(result.game.players[1].health.current).toEqual(4);
    // expect the card to be moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key13');
    // expect the card to be removed from the hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key13');
});

// player attacks enemy with attack power == shield
test('msg ACTION CASE3 player attacks, shield & card go to graveyard', () => {
  const msg = {
      type:'ACTION',
      activeCard: 'key1',
      target: 'opponent'
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
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 3,
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

    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(2);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave['key1'].type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave['key1'].category).toEqual('attack');

    // expect there's no item anymore
    expect(result.game.players[1].item).toEqual({});
    // expect the itme is now on graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key7');

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks enemy with attack power == shield
test.only('msg ACTION CASE3 player attacks with more then sheald, shield & card go to graveyard, opponent hit', () => {
  const msg = {
      type:'ACTION',
      activeCard: 'key1',
      target: 'opponent'
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
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 1,
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

    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(2);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave['key1'].type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave['key1'].category).toEqual('attack');

    // expect there's no item anymore
    expect(result.game.players[1].item).toEqual({});
    // expect the itme is now on graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key7');
    // expect opponen's health to decrease
    expect(result.game.players[1].health.current).toEqual(4);

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test, that when massage with item card  received, then
// if item holder is empty, active player moves item there. State Case4.
test('msg CASE4 received: active player choose item, if his item holder is empty player moves item there. State Case4.', () => {
    const msg = {
        type: 'CASE4', key: 'key1', category: 'item', active: true,
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
                        key11: {}, key8: {}, key13: {}, key1: { category: 'item', points: 3 },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
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

    // ожидаем, что item holder активного игрока пустой
    expect(Object.values(result.game.players[0].item).length).toEqual(1);
    // ожидаем, что карта предмет окажется в item holder активного игрока
    expect(result.game.players[0].item.key1.category).toEqual('item');
    // ожидаем, что карта-item убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});
