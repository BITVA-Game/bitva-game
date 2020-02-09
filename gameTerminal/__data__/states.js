/* eslint-disable import/prefer-default-export */
import { screen } from '../../constants';

import testAccounts from './accounts';

export const loadingState = {
    accounts: {
        loading: true,
    },
    manager: {
        screen: screen.LOGIN,
    },
};

export const loadedState = {
    accounts: {
        loading: false,
        records: testAccounts.accounts,
    },
    manager: {
        screen: screen.LOGIN,
    },
};

export const startscreenStateP1 = {
    accounts: {
        records: testAccounts.accounts,
    },
    participants: {
        player: testAccounts.alice.id,
    },
    manager: {
        screen: screen.STARTSCREEN,
    },
};

export const startscreenStateP2 = {
    accounts: {
        records: testAccounts.accounts,
    },
    participants: {
        player: testAccounts.alice,
        guest: testAccounts.bob,
    },
    manager: {
        screen: screen.HEROSELECT,
    },
};
