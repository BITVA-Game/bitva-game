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
    stateSaver('eventStartSceen', startscreenState);

    const app = getByTestId('app-screen');
    expect(dom.getByTestId(app, 'start-screen')).toBeTruthy();
    const startScreen = getByTestId('start-screen');
    expect(dom.getByTestId(startScreen, 'hollow-animation')).toBeTruthy();
    expect(dom.getByTestId(startScreen, 'window-animation')).toBeTruthy();
    expect(dom.getByTestId(startScreen, 'spider-animation')).toBeTruthy();
    // expect(startScreen.contains(getByTestId('mushroom-animation'))).toBeTruthy();
    // same as line below
    expect(dom.getByTestId(startScreen, 'mushroom-animation')).toBeTruthy();
    const menu = getByTestId('main-menu');
    expect(startScreen.contains(menu)).toBeTruthy();
});

test('main menu works as expected', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(<App />);
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];
    stateSaver('eventStartSceen', startscreenState);
    
    const startScreen = getByTestId('start-screen');
    const menu = getByTestId('main-menu');
    const toggleBtn = getByTestId("toggle-btn");
    expect(startScreen.contains(menu)).toBeTruthy();
    expect(menu.contains(toggleBtn)).toBeTruthy();
    fireEvent.click(toggleBtn);
});
