/* eslint-disable global-require */

import request from 'supertest';
import app from '../server';

const { mockHandle, mockState } = require('../__mocks__/gameEngine.js');

jest.mock('../../gameEngine', () => require('../__mocks__/gameEngine.js'));

beforeEach(() => {
    mockHandle.mockReset();
});

test('Send get and receive the state', async () => {
    await request(app)
        .get('/')
        .expect(200)
        .expect({
            screen: 'RANDOM',
            innerState: { a: 1 },
        });
});

test('Send post and receive the state', async () => {
    const message = { type: 'DEALALL' };
    await request(app)
        .post('/')
        .send({ message })
        .expect(200)
        .expect(mockState);
    expect(mockHandle).toHaveBeenCalledWith(message);
});
