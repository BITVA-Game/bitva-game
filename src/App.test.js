import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';

import electron from './electron-test';
import App from './App';

afterEach(cleanup);

test.only('renders without crashing', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(<App />);
    expect(getByTestId('app-screen')).toBeTruthy();
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];

    const state = {
        profile: {
            characters: ['morevna'],
            deck: ['apple'],
            gold: 0,
        },
        manager: {
            screen: 'STARTSCREEN',
        },
        game: {

        },
    };

    stateSaver('eventIDontKnowWhatItIs', state);
    const app = getByTestId('app-screen');
    expect(dom.getByTestId(app, 'start-screen')).toBeTruthy();
});
