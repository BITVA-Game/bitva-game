/* eslint-disable no-plusplus */
// import module for tests
const application = require('../backend/application');
const heroData = require('../backend/data/characters.json');


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

    // Save the data into variable for checks
    const heroSelect = sendReply.mock.calls[0][0].heroSelect;
    expect(heroSelect.morevna.cardsNumber).toEqual(15);
    expect(heroSelect.morevna.health).toEqual(16);
    expect(Object.keys(heroSelect.morevna.cards).length).toEqual(8);

    expect(heroSelect.yaga.cardsNumber).toEqual(15);
    expect(heroSelect.yaga.health).toEqual(15);
    expect(Object.keys(heroSelect.yaga.cards).length).toEqual(8);
});

// Test that msg HEROSELECTED clears the characters list and turn state into HERO SELECTED
test('msg HEROSELECTED received. List with charactes cleared. State Hero Selected.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

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
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

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
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // we save normal random here before mock it
    const oldRandom = Math.random;
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            game: {
                players: [
                    { active: false },
                    { active: true },
                ],
            },
            heroSelect: {},
        },
    );
    // We return random to initial value, so it is not always set to 1
    Math.random = oldRandom;
});

// Test that active player gets all the data. Game state VERSUS.
test('msg HEROSELECTED received: active player has all the data.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active player
    let activePlayer = result.game.players[0];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
    }

    // Expect player to have relevant data
    expect(activePlayer.hero).toBeDefined();
    expect(Object.keys(activePlayer.cards).length).toEqual(
        heroData[activePlayer.hero].cardsNumber,
    );
    expect(activePlayer.health.maximum).toEqual(heroData[activePlayer.hero].health);
    expect(activePlayer.hand).toEqual({});
});

// Test that inactive player gets its character and it's deck. Game state VERSUS.
test('msg HEROSELECTED received: inactive player gets relevant data.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    let inactivePlayer = result.game.players[0];
    if (result.game.players[0].active === true) {
        inactivePlayer = result.game.players[1];
    }
    expect(inactivePlayer.hero).toBeDefined();
    expect(Object.keys(inactivePlayer.cards).length).toEqual(
        heroData[inactivePlayer.hero].cardsNumber,
    );
    expect(inactivePlayer.health.maximum).toEqual(heroData[inactivePlayer.hero].health);
    expect(inactivePlayer.hand).toEqual({});
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
                    grave: {},
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
        type: 'ACTION',
        activeCard: 'key10',
        target: 'graveyard',
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
                        key11: {},
                        key1: {},
                        key8: {},
                        key13: {},
                        key10: { points: 3, disabled: false },
                    },
                    moveCounter: 0,
                    item: {},
                    // graveyard is empty
                    grave: {},
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
        type: 'ACTION',
        activeCard: 'key1',
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
                    item: {},
                    hand: {},
                    grave: {},
                },
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[1].moveCounter).toEqual(0);
    // expect that the card was an action card
    expect(result.game.players[1].grave.key1.type).toEqual('action');
    // expect that hero's health was increased
    expect(result.game.players[1].health.current).toEqual(8);
    // expect that the card was moved to graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key1');
    // expect the card not to be in hand
    expect(Object.keys(result.game.players[1].hand)).not.toContain('key1');
});

// player heals for over the max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing will go over max', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);
    // expect that the card was an action card
    expect(result.game.players[0].grave.key1.type).toEqual('action');
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
        type: 'ACTION',
        activeCard: 'key13',
        target: 'opponent',
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
                        key11: {},
                        key8: {},
                        key13: {
                            type: 'action', category: 'attack', points: 2, disabled: false,
                        },
                        key1: {},
                    },
                    moveCounter: 0,
                    item: {},
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
    expect(result.game.players[0].moveCounter).toEqual(1);
    // expect that it was the action card
    expect(result.game.players[0].grave.key13.type).toEqual('action');
    // expect that it was the attack card
    expect(result.game.players[0].grave.key13.category).toEqual('attack');
    // expect opponent with no shield items
    expect(result.game.players[1].item).toEqual({});
    // expect opponents health to decrease
    expect(result.game.players[1].health.current).toEqual(4);
    // expect the card to be moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key13');
    // expect the card to be removed from the hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key13');
});

// player attacks enemy with attack power == shield points
test('msg ACTION CASE3 player attacks, shield & card go to graveyard', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect there's no item anymore
    expect(result.game.players[1].item).toEqual({});
    // expect the itme is now on graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key7');

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks enemy with attack power > shield points
test('msg ACTION CASE3 player attacks with more points than shield has, shield & card go to graveyard, opponent hit', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

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

// player attacks enemy with attack power < shield points
test('msg ACTION CASE3 player attacks with less than shield, card goes to graveyard, shield points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
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
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 5,
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect the shield helath to lessen
    expect(result.game.players[1].item.key7.points).toEqual(2);

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});


// Test, that when massage with item card  received, then
// if item holder is empty, active player moves item there
test('msg ACTION CASE4 received: active player choose item, if his item holder is empty player moves item there.', () => {
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 3, disabled: false,
                        },
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
    expect(result.game.players[0].item.key1.type).toEqual('item');
    // ожидаем, что карта-item убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test, that active player after his moveCounter = 2 gets missing cards to his hand.
// Inactive Player becomes active. Turn change.
test('msg ACTION ANY received: active player moveCounter = 2 after his action, he gets missing cards to hand, inactive player becomes active.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that active player hand has 4  cards before game passes to opponent
    expect(Object.keys(result.game.players[0].hand).length).toEqual(5);

    // expect that inactive player becomes active
    expect(result.game.players[1].active).toEqual(true);
});

// If Player does not have any life points left game.phase = 'OVER'
test('msg ACTION ANY, player life points === 0, game.phase = "OVER" ', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 2, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: { },
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

    // expect the inactive player health ===0
    expect(result.game.players[1].health.current).toBeLessThanOrEqual(0);

    // expect manager, screen is now Victory
    expect(result.game.phase).toEqual('OVER');
});

// player moves a card to graveyard
test('msg ACTION CASE 5, player wants to move his card from item holder to graveyard', () => {
    // active Card is always a card
    // target can be a place (item place, graveyard, deck, hero etc) or a card
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'graveyard',
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
                    hand: {
                        key11: {}, key1: {}, key8: {}, key13: {},
                    },
                    // We expect the card 10 will be moved to graveyard
                    item: { key10: { points: 3, disabled: false } },
                    moveCounter: 0,
                    // graveyard is empty
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8 },
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
    // expect the card to move out of the item
    expect(Object.keys(result.game.players[0].item)).not.toContain('key10');
    // expect the opponent health !== 0
    expect(result.game.players[1].health.current).toBeGreaterThan(0);
});

// Test, that  when living water is in item holder, then
// players get +1 to their health current each at next 3  moves.
test('msg ACTION received: active player put Living Water in item, it increases players health current for 1pnt next 3 moves.', () => {
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
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(result.game.players[0].health.current).toEqual(11);
    expect(result.game.players[1].health.current).toEqual(9);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key1.points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each at next 3  moves as card has 3pnts.
test('msg ACTION received: active player has dead water in item, it decreased players health current for 1pnt next 3 moves.', () => {
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
    // ожидаем, что при переходе хода на текущего активного,
    // карта -water стоит в item cо свойтсвом itemInstalled ==true
    // expect(result.game.players[1].item.key10.itemInstalled).toEqual(true);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
});

// Test, that when living water card is in any player item holder then
// players get +1 to their current health each at next 3  moves as card has 3pnts.
test('msg ACTION received: inactive player has living water in item, it increases players health current for 1pnt next 3 moves.', () => {
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
    // ожидаем, что при переходе хода на текущего активного,
    // карта -water стоит в item cо свойтсвом itemInstalled ==true
    // expect(result.game.players[1].item.key10.itemInstalled).toEqual(true);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each at next 3  moves as card has 3pnts.
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt next 3 moves.', () => {
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
                        key1: {},
                    },
                    moveCounter: 1,
                    item: {
                        key10: {
                            id: 'waterDead', type: 'item', category: 'attack', initialpoints: 3, points: 1,
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

    // ожидаем, что карта dead water ушла из item holder активного игрока на кладбище
    expect(result.game.players[0].grave.key10.id).toEqual('waterDead');
    // ожидаем, что от текущего здоровья игроков отнимется по 1му очку
    expect(result.game.players[0].health.current).toEqual(9);
    expect(result.game.players[1].health.current).toEqual(7);
    // ожидаем, что очки карта-water восстановились до 3 initial points.
    expect(result.game.players[0].grave.key10.points).toEqual(3);
});

// test - player attacks enemy with attack power < shieldLarge points
// only opponent shield points decreased for activeCard points, other shield cards points remain
test('msg ACTION CASE3 player attacks with less points than shieldLarge has, only attacked shield cards points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
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
                    },
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, disabled: false,
                        },
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 2,
                    item: {
                        key9: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 3,
                        },
                    },
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {},
                        key8: {},
                        key15: {},
                        key3: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, initialpoints: 4, disabled: false,
                        },
                    },
                    item: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, initialpoints: 4, disabled: false,
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

    // expect the Large shield card key7 health to lessen
    expect(result.game.players[1].item.key7.points).toEqual(1);

    // expect the Large shield card in opponent hand with key3 remains its health points
    expect(result.game.players[1].hand.key3.points).toEqual(4);

    // expect the Large shield card in opponent hand with key3 remains its health points
    expect(result.game.players[0].hand.key13.points).toEqual(4);

    // expect the Large shield card in active player item with key9 remains its health points
    expect(result.game.players[0].item.key9.points).toEqual(3);
});

// test - player attacks enemy with attack power = shield small points
// only opponent shield points decreased for activeCard points, other shield cards points remain
test('msg ACTION CASE3 player attacks with less points than shieldLarge has, only attacked shield cards points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
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
                    },
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 2, initialpoints: 2,
                        },
                        key1: {
                            type: 'action', category: 'attack', points: 1, disabled: false,
                        },
                    },
                    moveCounter: 2,
                    item: {
                        key9: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 1, initialpoints: 2,
                        },
                    },
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {},
                        key8: {},
                        key15: {},
                        key3: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 2, initialpoints: 2,
                        },
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 2, initialpoints: 2,
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

    // expect the small shield card key7 moved to gravyead and got its initial points back
    expect(result.game.players[1].item.key7.points).toEqual(1);

    // expect the small shield card in opponent hand with key3 remains its health points
    expect(result.game.players[1].hand.key3.points).toEqual(2);

    // expect the small shield card in opponent hand with key3 remains its health points
    expect(result.game.players[0].hand.key13.points).toEqual(2);

    // expect the Large shield card in active player item with key9 remains its health points
    expect(result.game.players[0].item.key9.points).toEqual(1);
});

// test to check that attacking card takes only points of shield in opponent's item
// and does not take points from other key shield in player's item
test('msg ACTION for shields with the same key, shields in item', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
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
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
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
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
                        },
                    },
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
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect shield for player 0 did not change
    expect(result.game.players[0].item).toEqual({
        key7: {
            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
        },
    });

    // expect shield for player 1 lost health
    expect(result.game.players[1].item).toEqual({
        key7: {
            id: 'shieldSmall', type: 'item', category: 'shield', points: 1,
        },
    });

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// test to check that attacking card takes only points of shield in opponent's item
// and does not take points from other key shield in player's hand
test('msg ACTION for shields with the same key, shield with the same key in hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
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
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 4, disabled: false,
                        },
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {},
                        key8: {},
                        key15: {},
                        key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
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

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(1);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect shield for player 0 did not change
    expect(result.game.players[0].hand).toEqual({
        key7: {
            id: 'shieldSmall', type: 'item', category: 'shield', points: 4, disabled: false,
        },
        key8: {},
        key13: {},
    });

    // expect shield for player 1 lost health
    expect(result.game.players[1].item).toEqual({
        key7: {
            id: 'shieldSmall', type: 'item', category: 'shield', points: 1,
        },
    });

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
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

// Test that screen swtichs to PROFILE when Profile message received
test('msg PROFILE switches screen state to PROFILE', () => {
    // We only need type for this test.
    const msg = { type: 'PROFILE' };

    // Mock sendReply function
    const sendReply = jest.fn();
    application.setApp({
        profile: {
            characters: ['morevna'],
            deck: ['apple'],
            gold: 0,
        },
        manager: {
            screen: 'PROFILE',
        },
        game: { phase: 'ACTIVE' },
    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что экран станет 'PROFILE'
    expect(result.manager.screen).toEqual('PROFILE');
});

// screen swtich to NETWORKPLAY when NETWORKPLAY message received
test('msg NETWORKPLAY switches screen state to SELECTROLE', () => {
    const msg = { type: 'NETWORKPLAY' };

    const sendReply = jest.fn();
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];

    expect(result.manager.screen).toEqual('NETWORKPLAY');
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

// Test that players cards get property disabled: false once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property disabled: fasle.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active andinactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(activePlayer.cards).length; i++) {
        // and we expect active player to have disabled: false property in each card
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('disabled', false);
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have disabled: false property in each card
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('disabled', false);
    }
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
test('msg ACTION received: inactive player has Magic Mirror in item, it reflects half of active player attack for next 2 turns.', () => {
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
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2,  disabled: false, 
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
    // ожидаем, что после атаки текущее здоровье неактивного игрока (Василисы)
    // уменьшается только на половину очков атаки или др цело число , округленное в меньшую сторону
    // (3/2 =1.5 - округляем в меньшую сторону = 1 point)
    expect(result.game.players[0].health.current).toEqual(9);
    // ожидаем, что карта mirror находится в item пока у нее есть очки.
    expect(result.game.players[0].item.key10.points).not.toEqual(0);
    // ожидаем, что очки карты mirror, остануться неизменными
    expect(result.game.players[0].item.key10.points).toEqual(2);
});

// Test, that when Magic Mirror card is at inactive player's item holder then after attack
// card points <= 0, Mirror card goes to graveyard and gets its initial points back
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
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 1, initialpoints: 2, disabled: false,
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
    expect(result.game.players[0].grave.key10.points).toEqual(2);
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
