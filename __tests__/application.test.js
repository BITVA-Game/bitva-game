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

    // Save the data into variable for checks
    const heroSelect = sendReply.mock.calls[0][0].heroSelect;
    expect(heroSelect.morevna.cardsNumber).toEqual(17);
    expect(heroSelect.morevna.health).toEqual(15);
    expect(Object.keys(heroSelect.morevna.cards).length).toEqual(8);

    expect(heroSelect.yaga.cardsNumber).toEqual(17);
    expect(heroSelect.yaga.health).toEqual(17);
    expect(Object.keys(heroSelect.yaga.cards).length).toEqual(8);
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
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

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
                        key11: {}, key1: {}, key8: {}, key13: {}, key10: { points: 3 },
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
                        key11: {}, key8: {}, key13: { type: 'action', category: 'attack', points: 2 }, key1: {},
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
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 3,
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
                            id: 'bogatyr', type: 'action', category: 'attack', points: 3,
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
                    item: { key10: { points: 3 } },
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
                            id: 'livingWater', type: 'item', category: 'heal', points: 3,
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
    expect(result.game.players[0].item.key1.id).toEqual('livingWater');
    // ожидаем, что карта dead water неактивного игрока имеет тип - heal
    expect(result.game.players[0].item.key1.category).toEqual('heal');
    // ожидаем, что к текущему здоровью игроков прибваиться по 1му очку
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
                        key1: { type: 'action', category: 'attack', points: 3 },
                    },
                    moveCounter: 1,
                    item: {
                        key10: {
                            id: 'deadWater', type: 'item', category: 'damage', points: 2,
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
    expect(result.game.players[0].item.key10.id).toEqual('deadWater');
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
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {
                        key10: {
                            id: 'livingWater', type: 'item', category: 'heal', points: 2,
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
                        key1: { type: 'action', category: 'attack', points: 3 },
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
    expect(result.game.players[0].item.key10.id).toEqual('livingWater');
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
                            id: 'deadWater', type: 'item', category: 'attack', itemInstalled: true, points: 1,
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
    expect(result.game.players[0].grave.key10.id).toEqual('deadWater');
    // ожидаем, что от текущего здоровья игроков отнимется по 1му очку
    expect(result.game.players[0].health.current).toEqual(9);
    expect(result.game.players[1].health.current).toEqual(7);
    // ожидаем, что карта-water обнулилась points == 0.
    expect(result.game.players[0].grave.key10.points).toEqual(0);
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
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4,
                        },
                        key1: { type: 'action', category: 'attack', points: 3 },
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
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, initialpoints: 4,
                        },
                    },
                    item: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 4, initialpoints: 4,
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
                        key1: { type: 'action', category: 'attack', points: 1 },
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
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
                        },
                        key8: {},
                        key13: {},
                        key1: { type: 'action', category: 'attack', points: 3 },
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
            id: 'shieldSmall', type: 'item', category: 'shield', points: 4,
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
