import {
    startscreenState,
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
    //
});

// Test that engineManager on PLAY creates engine
test('msg HEROSELECTED checks that HEROSELECTED creates engine and handles the message', () => {
    const msg = { type: HEROSELECTED };
    //
});
