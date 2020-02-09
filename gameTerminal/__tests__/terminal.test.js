import nock from 'nock';
import {
    loadingState,
    loadedState,
    startscreenStateP1,
    startscreenStateP2,
} from '../__data__/states';

import { screen as scr, message } from '../../constants';

import testAccounts from '../__data__/accounts';
import { read } from '../../gameAccounts/index';

jest.mock('../../gameAccounts/index');

// import module for tests
const application = require('../application');

const address = 'http://localhost:5001/';

beforeEach(() => {
    application.reset();
});

test('msg INIT Game loaded - no profiles', async () => {
    read.mockImplementation(
        jest.fn(() => Promise.resolve({ records: testAccounts.accounts })),
    );

    // Create a messade that has type and may have additional data later.
    const msg = { type: message.INIT };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    await application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(2);
    expect(read.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(loadingState);
    expect(sendReply.mock.calls[1][0]).toMatchObject(loadedState);
});

// screen swtich to state LOGIN
test('msg LOGIN switches screen state to STARTSCREEN with Alice', async () => {
    // We only need type for this test.
    const msg = { type: message.LOGIN, account: testAccounts.alice.id };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    await application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenStateP1);
});

test('msg PLAY creates engine and handles the message', async () => {
    const msg = { type: message.PLAY };
    application.setApp({
        accounts: {
            records: testAccounts.accounts,
        },
        participants: {
            player: testAccounts.alice.id,
            guest: testAccounts.bob.id,
        },
        manager: {
            screen: scr.HEROSELECT,
        },
        engine: undefined,
    });
    // Mock sendReply function
    const sendReply = jest.fn();
    const engineState = {
        screen: scr.HEROSELECT,
        // innerState: { a: 1 },
    };
    nock.disableNetConnect();
    const scope = nock(address)
        .post('/', {
            message: {
                type: 'PLAY',
                participants: { player: testAccounts.alice, guest: testAccounts.bob },
            },
        })
        .reply(200)
        .get('/')
        .reply(200, engineState);
    await application.msgReceived(msg, sendReply);
    scope.isDone();
    expect(application.getApp().engine).toMatchObject(engineState);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenStateP2);
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
        getState() {
            return engineState;
        },
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
        account: testAccounts.alice,
        guest: testAccounts.bob,
        manager: { screen: scr.STARTSCREEN },
        innerState: engineState.innerState,
    };
    expect(sendReply.mock.calls.length).toBe(2);
    expect(sendReply.mock.calls[1][0]).toMatchObject(expectedState);
});
