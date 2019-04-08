import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';
import App from './App';


afterEach(cleanup);

test.only('renders without crashing', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = render(<App/>);
    expect(getByTestId("start-screen")).toBeTruthy();
});
