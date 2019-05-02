/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import {
    startscreenState, heroselectState, heroselectedState, versusState,
} from '../__mocks__/stateMock';
// import module for tests
const application = require('../backend/application');
const heroData = require('../backend/data/characters.json');

jest.mock('../backend/randomFunc');


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
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenState);
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
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectState);
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
    expect(heroSelect.morevna.cardsNumber).toEqual(heroData.morevna.cardsNumber);
    expect(heroSelect.morevna.health).toEqual(heroData.morevna.health);
    expect(Object.keys(heroSelect.morevna.cards).length).toEqual(Object.keys(heroData.morevna.cards).length);

    expect(heroSelect.yaga.cardsNumber).toEqual(heroData.yaga.cardsNumber);
    expect(heroSelect.yaga.health).toEqual(heroData.yaga.health);
    expect(Object.keys(heroSelect.yaga.cards).length).toEqual(Object.keys(heroData.yaga.cards).length);
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
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectedState);
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
    expect(sendReply.mock.calls[0][0]).toMatchObject(versusState);
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

// Test that both  players gets individual keyHero each. Game state VERSUS.
test('msg HEROSELECTED received: players  have individual keyHero each.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active and inactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }

    // Expect players to have keyHero
    expect(activePlayer.keyHero).toBeDefined();
    expect(inactivePlayer.keyHero).toBeDefined();
    // Expect each player's keyHero differs
    expect(activePlayer.keyHero).not.toEqual(inactivePlayer.keyHero);
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

// Test that players cards get points and health current points once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property initialpoints and health.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'hozyaika' };

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
        // and we expect active player to have points property in each card = initialpoints
        // and property healthCurrent = health
        const card = Object.values(activePlayer.cards)[i];
        if (card.initialpoints !== undefined) {
            expect(card).toHaveProperty('points', card.initialpoints);
        }
        if (card.type === 'item') {
            expect(card).toHaveProperty('healthCurrent', card.health);
        }
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have points property in each card = initialpoints
        // and property healthCurrent = health for each item card
        const card = Object.values(inactivePlayer.cards)[c];
        if (card.initialpoints !== undefined) {
            expect(card).toHaveProperty('points', card.initialpoints);
        }
        if (card.type === 'item') {
            expect(card).toHaveProperty('healthCurrent', card.health);
        }
    }
});

// Test that both  players gets individual keyHero each. Game state VERSUS.
test('msg HEROSELECTED received: players  have individual keyHero each.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active and inactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }

    // Expect players to have keyHero
    expect(activePlayer.keyHero).toBeDefined();
    expect(inactivePlayer.keyHero).toBeDefined();
    // Expect each player's keyHero differs
    expect(activePlayer.keyHero).not.toEqual(inactivePlayer.keyHero);
});

// Test that players cards get property categoryName once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property categoryName.', () => {
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
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('categoryName');
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have disabled: false property in each card
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('categoryName');
    }
});
