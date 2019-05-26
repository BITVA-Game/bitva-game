/* eslint-disable max-len */
/* eslint-disable no-plusplus */

import {
    profileState,
} from '../__mocks__/stateMock';

// import module for tests
const application = require('../backend/application');

// Test that screen swtichs to PROFILE when Profile message received
test('msg PROFILE switches screen state to PROFILE', () => {
    // We only need type for this test.
    const msg = { type: 'PROFILE' };

    // Mock sendReply function
    const sendReply = jest.fn();
    application.setApp({
        profileState,
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
