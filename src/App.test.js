import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import electron from './electron-test';
import App from './App';

import { startscreenState } from '../gameTerminal/__data__/states';

afterEach(cleanup);

test.only('renders startScreen and menu', () => {
    const { getByTestId, getByAltText, getAllByTestId, getByText } = render(<App />);
    const stateSaver = electron.ipcRenderer.on.mock.calls[0][1];
    stateSaver('eventStartScreen', startscreenState);

    expect(getByTestId('main-menu')).toBeTruthy();
    expect(getByTestId('main-menu')).toHaveClass('sidebar-opened');
    expect(getByTestId('close-menu-btn')).toBeTruthy();

    fireEvent.click(getByTestId('close-menu-btn'));
    expect(getByTestId('main-menu')).not.toHaveClass('sidebar-opened');
    expect(getByTestId('open-menu-btn')).toBeTruthy();

    fireEvent.click(getByTestId('open-menu-btn'));
    expect(getByTestId('main-menu')).toHaveClass('sidebar-opened');
    expect(getByTestId('close-menu-btn')).toBeTruthy();

    expect(getByAltText('logo')).toBeTruthy();
    expect(getAllByTestId('menu-button')).toHaveLength(8);
    expect(getByText('Player vs Player')).toBeTruthy();
});
