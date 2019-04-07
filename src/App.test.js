import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';


afterEach(cleanup);

test('renders without crashing', () => {
    expect(true).toBeTruthy();
});
