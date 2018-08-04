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
    expect(sendReply.mock.calls[0][0]).toEqual(
        {
            profile: {
                characters: ['Morevna', 'Yaga'],
                deck: ['Apple', 'Mirror'],
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
test('Hero Select screen, the Player can select any of the characters he has', () => {
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
                characters: ['Morevna', 'Yaga'],
                deck: ['Apple', 'Mirror'],
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


// Test that msg PLAY returns list with characters
test('list with all characters added when PLAY msg received', () => {
// We only need type for this test.
    const msg = { type: 'PLAY' };

    const sendReply = jest.fn();

    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toEqual(
        {
            profile: {
                characters: ['Morevna', 'Yaga'],
                deck: ['Apple', 'Mirror'],
                silver: 5,
                gold: 0,
            },
            heroSelect: {
                Morevna: {
                    name: 'Мarya Мorevna',
                    description: 'Lady bogatyr of steppe, crown queen possesing great sorcerous powers, who enchained Koschei the Deathless.',
                    cards: {
                        'Cat-Bajun': {
                            count: 2,
                        },
                        'Sivka-Burka': {
                            count: 1,
                        },
                        Bogatyr: {
                            count: 3,
                        },
                        Apple: {
                            count: 2,
                        },
                        Bereginya: {
                            count: 2,
                        },
                        'Large Shield': {
                            count: 1,
                        },
                        Mirror: {
                            count: 1,
                        },
                        'Living Water': {
                            count: 1,
                        },
                        Firebird: {
                            count: 1,
                        },
                        Kladenets: {
                            count: 1,
                        },
                    },
                },

                Yaga: {
                    name: 'Yaga',
                    description: 'Yaga can lead a person between realm of the dead and the living. She is a witch, Keeper of the living and dead water.',
                    cards: {
                        'Grey Wolf': {
                            count: 2,
                        },
                        'Cat-Bajun': {
                            count: 3,
                        },
                        Apple: {
                            count: 2,
                        },
                        Bereginya: {
                            count: 2,
                        },
                        Bogatyr: {
                            count: 1,
                        },
                        'Small Shield': {
                            count: 1,
                        },
                        Mirror: {
                            count: 1,

                        },
                        'Dead Water': {
                            count: 1,
                        },
                        Firebird: {
                            count: 1,
                        },
                        Kladenets: {
                            count: 1,
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

// Test that msg HEROSELECTED clear the characters list
test('msg HEROSELECTED clears list with charactes', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toEqual(
        {
            profile: {
                characters: ['Morevna', 'Yaga'],
                deck: ['Apple', 'Mirror'],
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
