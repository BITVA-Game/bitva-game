/* eslint-disable import/prefer-default-export */
import {
    screen,
} from '../../constants';

import gameAccounts from '../../gameAccounts';

export const loginState = {
    accounts: {
        accounts: gameAccounts.accounts,
        account: null,
        guest: null,
    },
    manager: {
        screen: screen.LOGIN,
    },
};


export const startscreenState = {
    accounts: {
        accounts: gameAccounts.accounts,
        account: gameAccounts.alice.id,
        guest: null,
    },
    manager: {
        screen: screen.STARTSCREEN,
    },
};
