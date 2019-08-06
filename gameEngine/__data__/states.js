/* eslint-disable import/prefer-default-export */

export const playState = {
    accounts: [{
        id: 'player1',
        heroes: ['morevna', 'yaga', 'premudraya'],
    },
    {
        id: 'player2',
        heroes: ['morevna', 'yaga'],
    },
    ],
    terminals: [{
        players: ['player1', 'player2'],
    }],
    heroSelect: {
        allHeroes: {
            morevna: {},
            yaga: {},
            premudraya: {},
            hozyaika: {},
        },
        heroes: ['morevna', 'yaga', 'premudraya'],
        activePlayer: 'player1',
        players: [],
    },
    screen: 'HEROSELECT',
    game: {
        players: [],
    },
};


export const heroselectStateP1 = {
    accounts: [{
        id: 'player1',
        heroes: ['morevna', 'yaga', 'premudraya'],
    },
    {
        id: 'player2',
        heroes: ['morevna', 'yaga'],
    },
    ],
    terminals: [{
        players: ['player1', 'player2'],
    }],
    heroSelect: {
        allHeroes: {
            morevna: {},
            yaga: {},
            premudraya: {},
            hozyaika: {},
        },
        heroes: ['morevna', 'yaga'],
        activePlayer: 'player2',
        players: [{ hero: 'premudraya', id: 'player1' }],
    },
    game: {
        players: [{ hero: 'premudraya', id: 'player1' }],
    },
};

export const versus = {
    accounts: [{
        id: 'player1',
        heroes: ['morevna', 'yaga', 'premudraya'],
    },
    {
        id: 'player2',
        heroes: ['morevna', 'yaga'],
    },
    ],
    terminals: [{
        players: ['player1', 'player2'],
    }],
    heroSelect: {
        allHeroes: {
            morevna: {},
            yaga: {},
            premudraya: {},
            hozyaika: {},
        },
        heroes: [],
        activePlayer: '',
        players: [],
    },
    game: {
        active: 'player1',
        players: [{ hero: 'premudraya', id: 'player1' }, { hero: 'yaga', id: 'player2' }],
    },
};
