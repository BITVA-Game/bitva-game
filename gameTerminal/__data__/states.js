/* eslint-disable import/prefer-default-export */
import {
    screen,
} from '../../constants';

import gameAccounts from '../../gameAccounts';

export const startscreenState = {
    account: gameAccounts.alice,
    manager: {
        screen: screen.STARTSCREEN,
    },
};
