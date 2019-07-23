import {
    startscreenState, playState, heroselectStateP1, heroselectStateP2,
} from '../__mocks__/stateMock';

import {
    INIT, STARTSCREEN, PLAY, HEROSELECTED,
} from '../constants';

// import module for tests
const application = require('../gameTerminal/application');

jest.mock('../gameTerminal/randomFunc');

// If it's the first INITIAL message from frontend, return the app in it's initial state
test('msg INIT Game loaded. Send the app in its initial state', () => {
    // Create a messade that has type and may have additional data later.
    // We only need type for this test.
    const msg = { type: INIT };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenState);
});

// screen swtich to state STARTSCREEN after button TO START SCREEN is clicked
test('msg STARTSCREEN switches screen state to STARTSCREEN', () => {
    // We only need type for this test.
    const msg = { type: STARTSCREEN };

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

// Test that engineManager on PLAY creates engine
test('msg PLAY checks that PLAY creates engine and handles the message', () => {
    const msg = { type: PLAY };
    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(playState);
});

// // Test that engineManager on HEROSELECTED msg with player 1 creates engine - UNDER PROCESS
// test.only('msg HEROSELECTED msg with player 1 checks that HEROSELECTED creates engine and handles the message', () => {
//     const msg = { type: HEROSELECTED };
//     // Mock sendReply function
//     const sendReply = jest.fn();
//     application.setApp(playState);

//     // Call the message function from application with this message and mocked function.
//     application.msgReceived(msg, sendReply);
//     expect(sendReply.mock.calls.length).toBe(1);
//     expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectStateP1);
// });

// // Test that engineManager on HEROSELECTED msg with player 2 creates engine - UNDER PROCESS
// test.only('msg HEROSELECTED msg with player 2 checks that HEROSELECTED creates engine and handles the message', () => {
//     const msg = { type: HEROSELECTED, hero: 'yaga', player: 'player2' };
//     // Mock sendReply function
//     const sendReply = jest.fn();
//     application.setApp(heroselectStateP1);

//     // Call the message function from application with this message and mocked function.
//     application.msgReceived(msg, sendReply);
//     expect(sendReply.mock.calls.length).toBe(1);
//     expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectStateP2);
// });
