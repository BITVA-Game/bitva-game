import {
    startscreenState,
} from '../__data__/states';

import {
    INIT, STARTSCREEN, PLAY, HEROSELECT, HEROSELECTED,
} from '../../constants';

// import module for tests
const application = require('../application');

beforeEach(() => {
    application.reset();
});

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
const Engine = require('../../gameEngine');

jest.mock('../../gameEngine');
test('msg PLAY creates engine and handles the message', () => {
    const msg = { type: PLAY };
    // Mock sendReply function
    const sendReply = jest.fn();
    const handleFunc = jest.fn();
    const engineState = {
        screen: HEROSELECT,
        innerState: { a: 1 },
    };

    const mockEngine = jest.fn().mockImplementation(() => ({
        handle: handleFunc,
        getState() { return engineState; },
    }));
    Engine.mockImplementation(mockEngine);

    application.msgReceived(msg, sendReply);

    // mockEngine must be called once to instantiate the engine
    expect(mockEngine.mock.calls.length).toBe(1);

    // handleFunc must have been called once with msg argument
    expect(handleFunc.mock.calls.length).toBe(1);
    expect(handleFunc.mock.calls[0]).toEqual([msg]);

    const expectedState = Object.assign(
        {},
        { manager: { screen: HEROSELECT } },
        { innerState: engineState.innerState },
    );
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(expectedState);
});

test('msg sent twice, we have one instance of engine', () => {
    const msg = { type: HEROSELECTED };
    // Mock sendReply function
    const sendReply = jest.fn();
    const handleFunc = jest.fn();
    const engineState = {
        screen: STARTSCREEN,
        innerState: { a: 1 },
    };

    const mockEngine = jest.fn().mockImplementation(() => ({
        handle: handleFunc,
        getState() { return engineState; },
    }));
    Engine.mockImplementation(mockEngine);

    application.msgReceived(msg, sendReply);
    application.msgReceived(msg, sendReply);

    // mockEngine must be called once to instantiate the engine
    expect(mockEngine.mock.calls.length).toBe(1);

    // handleFunc must have been called once with msg argument
    expect(handleFunc.mock.calls.length).toBe(2);
    expect(handleFunc.mock.calls[0]).toEqual([msg]);

    const expectedState = Object.assign(
        {},
        { manager: { screen: STARTSCREEN } },
        { innerState: engineState.innerState },
    );
    expect(sendReply.mock.calls.length).toBe(2);
    expect(sendReply.mock.calls[1][0]).toMatchObject(expectedState);
});

test('msg ACTION ANY, one of the players dies, state is OVER', () => {

});
