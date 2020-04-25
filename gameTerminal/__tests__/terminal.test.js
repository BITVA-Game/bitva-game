import {
    loadingState,
    loadedState,
    startscreenStateP1,
    startscreenStateP2,
} from '../__data__/states';

import { screen as scr, message } from '../../src/constants';

import testAccounts from '../__data__/accounts';
import { read } from '../../gameAccounts/index';
import { reset } from '../gameEngineManager';

jest.mock('../../gameAccounts/index');
jest.mock('electron', () => ({
    screen: { getPrimaryDisplay: () => ({ size: { height: 700 } }) },
}));
jest.mock('../gameEngineClient', () => ({
    createLocalEngine: jest.fn(),
    createNetworkEngine: jest.fn(),
}));

// import module for tests
const application = require('../application');

const {
    createLocalEngine,
    createNetworkEngine,
} = require('../gameEngineClient');

beforeEach(() => {
    application.reset();
});

test('msg INIT Game loaded - no profiles', async () => {
    // global.electron = { screen: { getPrimaryDisplay: jest.fn() } };
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
    // Mock engine internal state for this test
    const engineState = {
        screen: 'PLAY',
        innerState: { some: 1 },
    };
    const engine = {
        handle: jest.fn(),
        getState: () => engineState,
    };
    reset(engine);

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
    const sendReply = jest.fn();
    await application.msgReceived(msg, sendReply);
    expect(application.getApp().engine).toMatchObject(engineState);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenStateP2);
    expect(engine.handle.mock.calls.length).toBe(1);
    expect(engine.handle.mock.calls[0][0]).toMatchObject({
        type: message.PLAY,
        participants: {
            guest: testAccounts.bob,
            player: testAccounts.alice,
        },
    });
});

test('NetworkPlay creates GameEngineNetwork', async () => {
    const msg = { type: message.NETWORKPLAY, ip: '12345' };
    // Mock engine for this test
    const engineState = {
        screen: 'PLAY',
        innerState: { some: 1 },
    };
    const engine = {
        getState: () => engineState,
    };
    createNetworkEngine.mockReturnValue(engine);

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
    const sendReply = jest.fn();
    await application.msgReceived(msg, sendReply);
    expect(createNetworkEngine.mock.calls.length).toBe(1);
    expect(createNetworkEngine.mock.calls[0][0]).toBe('12345');
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject({
        manager: { screen: scr.SELECTOPPONENT },
    });
});

test('LocalPlay creates GameEngineLocal', async () => {
    const msg = { type: message.LOCALPLAY };
    // Mock engine for this test
    const engineState = {
        screen: 'PLAY',
        innerState: { some: 1 },
    };
    const engine = {
        getState: () => engineState,
    };
    createLocalEngine.mockReturnValue(engine);

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
    const sendReply = jest.fn();
    await application.msgReceived(msg, sendReply);
    expect(createLocalEngine.mock.calls.length).toBe(1);
    expect(createLocalEngine.mock.calls[0][0]).toBe(undefined);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject({
        manager: { screen: scr.SELECTOPPONENT },
    });
});
