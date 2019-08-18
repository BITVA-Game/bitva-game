import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';

import electron from './electron-test';
import App from './App';
import StartScreen from './StartScreen';
import MainMenu from './MainMenu';

import { startscreenState } from '../gameTerminal/__data__/states';

afterEach(cleanup);

test.skip('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-screen')).toBeTruthy();
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];
    stateSaver('eventStartSceen', startscreenState);

    const app = getByTestId('app-screen');
    expect(app).toContainElement(getByTestId('start-screen'));
    const startScreen = getByTestId('start-screen');
    expect(startScreen).toContainElement(getByTestId('hollow-animation'));
    expect(startScreen).toContainElement(getByTestId('window-animation'));
    expect(startScreen).toContainElement(getByTestId('spider-animation'));
    expect(startScreen).toContainElement(getByTestId('mushroom-animation'));
    const menu = getByTestId('main-menu');
    expect(startScreen).toContainElement(menu);
});

test.skip('<MainMenu> looks as expected', () => {
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];
    stateSaver('eventStartSceen', startscreenState);
    const { getByTestId, getAllByTestId } = render(<MainMenu />);

    const mainMenu = getByTestId('main-menu');
    expect(mainMenu).toContainElement(getByTestId('logo-container'));
    expect(mainMenu).toContainElement(getByTestId('menu-buttons-container'));
    const toggleBtn = getByTestId('toggle-btn');
    expect(mainMenu).toContainElement(toggleBtn);

    expect(getByTestId('menu-buttons-container')).toContainElement(getByTestId('toggle-button'));
    const menuButtonsGroups = getAllByTestId('menu-buttons-group');
    expect(menuButtonsGroups).toHaveLength(2);

    const menuButtons = getAllByTestId('menu-button');
    expect(menuButtons).toHaveLength(8);
    expect(getByTestId('menu-buttons-group')).toContainElement(getByTestId('menu-button'));

    let opened = true;

    const toggle = jest.fn(() => opened = false);
    fireEvent.click(getByTestId('toggle-button'), toggle());
    expect(toggle).toHaveBeenCalledTimes(1);
    expect(opened).toEqual(false);
});
