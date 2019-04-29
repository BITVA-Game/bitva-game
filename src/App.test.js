import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';

import electron from './electron-test';
import App from './App';

import { startscreenState } from '../__mocks__/stateMock';

afterEach(cleanup);

test.only('renders without crashing', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(<App />);
    expect(getByTestId('app-screen')).toBeTruthy();
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];

    stateSaver('eventIDontKnowWhatItIs', startscreenState);
    const app = getByTestId('app-screen');
    expect(dom.getByTestId(app, 'start-screen')).toBeTruthy();
});
