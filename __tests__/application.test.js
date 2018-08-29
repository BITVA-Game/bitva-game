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
                            count: 2,
                        },
                        bereginya: {
                            id: 'bereginya',
                            name: 'Bereginya',
                            count: 2,
                        },
                        sheetLarge: {
                            id: 'sheetLarge',
                            name: 'Large Shield',
                            count: 1,
                        },
                        sheetSmall: {
                            id: 'sheetSmall',
                            name: 'Living Water',
                            count: 1,
                        },
                    },
                },

                yaga: {
                    id: 'yaga',
                    name: 'Yaga',
                    description: 'Yaga can lead a person between realm of the dead and the living. She is a witch, Keeper of the living and dead water.',
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
                            count: 2,
                        },
                        bereginya: {
                            id: 'bereginya',
                            name: 'Bereginya',
                            count: 2,
                        },
                        sheetLarge: {
                            id: 'sheetLarge',
                            name: 'Large Shield',
                            count: 1,
                        },
                        sheetSmall: {
                            id: 'sheetSmall',
                            name: 'Living Water',
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

// Test that msg HEROSELECTED clears the characters list and turn state into HERO SELECTED
test('msg HEROSELECTED received. List with charactes cleared. State Hero Selected.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED' };

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
    const msg = { type: 'HEROSELECTED' };

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
    const msg = { type: 'HEROSELECTED' };

    // Mock sendReply function
    const sendReply = jest.fn();
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
                    { active: true },
                    { active: false },
                ],
            },
        },
    );
});
