import nock from 'nock';
import {
    loginState,
} from '../__data__/states';

import {
    screen as scr, message,
} from '../../constants';

import gameAccounts from '../../gameAccounts';

// import module for tests
const application = require('../application');

beforeEach(() => {
    application.reset();
});

test.skip('msg INIT Game loaded - no profiles', async () => {

});

test.skip('msg INIT Game loaded - one profile', async () => {

});

// If it's the first INITIAL message from frontend, return the app in it's initial state
test('msg INIT Game loaded. Send the app in its initial state', async () => {
    // Create a messade that has type and may have additional data later.
    const msg = { type: message.INIT };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    await application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(loginState);
});

// screen swtich to state STARTSCREEN after button TO START SCREEN is clicked
test('msg STARTSCREEN switches screen state to STARTSCREEN with Alice', async () => {
    // We only need type for this test.
    const msg = { type: message.STARTSCREEN, account: gameAccounts.alice.id };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    await application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            accounts: {
                accounts: gameAccounts.accounts,
                account: gameAccounts.alice.id,
                guest: null,
            },
            manager: {
                screen: scr.STARTSCREEN,
            },

        },
    );
});

// screen swtich to state STARTSCREEN after button TO START SCREEN is clicked
test('msg STARTSCREEN switches screen state to STARTSCREEN with Bob', async () => {
    // We only need type for this test.
    const msg = { type: message.STARTSCREEN, account: gameAccounts.bob.id };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    await application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            accounts: {
                accounts: gameAccounts.accounts,
                account: gameAccounts.bob.id,
                guest: null,
            },
            manager: {
                screen: scr.STARTSCREEN,
            },

        },
    );
});

const address = 'http://localhost:5001/';

test('msg PLAY creates engine and handles the message', async () => {
    const msg = { type: message.PLAY };
    // Mock sendReply function
    const sendReply = jest.fn();
    const engineState = {
        screen: scr.HEROSELECT,
        accounts: {
            accounts: gameAccounts.accounts,
            account: gameAccounts.alice.id,
            guest: null,
        },
        innerState: { a: 1 },
    };
    nock.disableNetConnect();
    const scope = nock(address)
        .post(
            '/',
            { message: { type: 'PLAY' }, accounts: [gameAccounts.alice, gameAccounts.bob] },
        )
        .reply(200)
        .get('/')
        .reply(200, engineState);
    await application.msgReceived(msg, sendReply);
    scope.isDone();

    const expectedState = {
        accounts: {
            accounts: gameAccounts.accounts,
            account: gameAccounts.alice.id,
            guest: gameAccounts.bob.id,
        },
        manager: { screen: scr.HEROSELECT },
        innerState: engineState.innerState,
    };
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(expectedState);
});


test.skip('msg sent twice, we have one instance of engine', async () => {
    const msg = { type: message.HEROSELECTED };
    // Mock sendReply function
    const sendReply = jest.fn();
    const handleFunc = jest.fn();
    const engineState = {
        screen: scr.STARTSCREEN,
        innerState: { a: 1 },
    };

    const mockEngine = jest.fn().mockImplementation(() => ({
        handle: handleFunc,
        getState() { return engineState; },
    }));
    // Engine.mockImplementation(mockEngine);

    await application.msgReceived(msg, sendReply);
    await application.msgReceived(msg, sendReply);

    // mockEngine must be called once to instantiate the engine
    expect(mockEngine.mock.calls.length).toBe(1);

    // handleFunc must have been called once with msg argument
    expect(handleFunc.mock.calls.length).toBe(2);
    expect(handleFunc.mock.calls[0]).toEqual([msg]);

    const expectedState = {
        account: gameAccounts.alice,
        guest: gameAccounts.bob,
        manager: { screen: scr.STARTSCREEN },
        innerState: engineState.innerState,
    };
    expect(sendReply.mock.calls.length).toBe(2);
    expect(sendReply.mock.calls[1][0]).toMatchObject(expectedState);
});
