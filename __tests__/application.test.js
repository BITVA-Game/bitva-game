/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import {
    startscreenState, heroselectStateP1, heroselectStateP2, versusState, dealAllstate,
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
test('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: 'PLAY' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectStateP1);
});

// Test that msg HEROSELECTED clears the characters list and turn state into HERO SELECTED
test('msg HEROSELECTED received from P1, P2 is active', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', player: 'player1' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectStateP2);
});

// screen swtich to state VERSUS after hero is selected
test('msg HEROSELECTED for 2 players switches screen state to VERSUS, Active players is set', () => {
    // We only need type for this test.
    const msg1 = { type: 'HEROSELECTED', hero: 'morevna', player: 'player1' };
    const msg2 = { type: 'HEROSELECTED', hero: 'yaga', player: 'player2' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Set the application into the previous state
    application.setApp(heroselectStateP1);
    // Call the message function from application with this message and mocked function.

    application.msgReceived(msg1, sendReply);
    application.msgReceived(msg2, sendReply);
    expect(sendReply.mock.calls.length).toBe(2);
    const newGame = sendReply.mock.calls[1][0];
    expect(newGame.game.players.length).toEqual(2);
    expect(newGame).toMatchObject(versusState);
});

// Test that active player gets all the data. Game state VERSUS.
test('msg HEROSSELECTED received: both players have relevant data.', () => {
    // We only need type for this test.
    const msg1 = { type: 'HEROSELECTED', hero: 'morevna', player: 'player1' };
    const msg2 = { type: 'HEROSELECTED', hero: 'yaga', player: 'player2' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // Set the application into the previous state
    application.setApp(heroselectStateP1);

    application.msgReceived(msg1, sendReply);
    application.msgReceived(msg2, sendReply);
    expect(sendReply.mock.calls.length).toBe(2);
    const newGame = sendReply.mock.calls[1][0];
    console.log(newGame);

    // Find active player
    const activePlayer = newGame.game.players.find(player => player.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(player => player.id !== newGame.game.active);

    // Expect player to have relevant data
    expect(activePlayer.hero).toBeDefined();
    expect(Object.keys(activePlayer.cards).length).toEqual(
        heroData[activePlayer.hero].cardsNumber,
    );
    expect(activePlayer.health.maximum).toEqual(heroData[activePlayer.hero].health);
    expect(activePlayer.hand).toEqual({});

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
    application.setApp(dealAllstate);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    const activePlayer = result.game.players.find(player => player.id === result.game.active);
    const inactivePlayer = result.game.players.find(player => player.id !== result.game.active);
    expect(result.game.players[1].hero).toEqual('yaga');
    expect(Object.keys(result.game.players[1].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[1].cards).length).toEqual(10);

    expect(result.game.players[0].hero).toEqual('morevna');
    expect(Object.keys(result.game.players[0].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[0].cards).length).toEqual(10);

    expect(result.manager.screen).toEqual('PLAYERACT');

    // Expect players to have keyHero
    expect(activePlayer.keyHero).toBeDefined();
    expect(inactivePlayer.keyHero).toBeDefined();
    // Expect each player's keyHero differs
    expect(activePlayer.keyHero).not.toEqual(inactivePlayer.keyHero);

    // both players cards get property disabled: fasle
    console.log(result.game.players);
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(activePlayer.cards).length; i++) {
        // and we expect active player to have disabled: false property in each card
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('disabled', false);
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('categoryName');
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
        // and we expect inactive player to have disabled: false property in each card
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('disabled', false);
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('categoryName');
        const card = Object.values(inactivePlayer.cards)[c];
        if (card.initialpoints !== undefined) {
            expect(card).toHaveProperty('points', card.initialpoints);
        }
        if (card.type === 'item') {
            expect(card).toHaveProperty('healthCurrent', card.health);
        }
    }
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
