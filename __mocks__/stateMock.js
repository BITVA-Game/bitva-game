export const startscreenState = {
    profiles: [
        {
            id: 'player1',
        },
        {
            id: 'player2',
        },
    ],
    manager: {
        screen: 'STARTSCREEN',
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
    profiles: [
        {
            id: 'player1',
        },
        {
            id: 'player2',
        },
    ],
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
    manager: {
        screen: 'HEROSELECT',
    },
    game: {
        players: [],
    },
};

export const heroselectStateP2 = {
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
    profiles: [
        {
            id: 'player1',
        },
        {
            id: 'player2',
        },
    ],
    heroSelect: {
        allHeroes: {
            morevna: {},
            yaga: {},
            premudraya: {},
            hozyaika: {},
        },
        heroes: ['morevna', 'yaga'],
        activePlayer: 'player2',
        players: [{ hero: 'morevna', id: 'player1' }],
    },
    manager: {
        screen: 'HEROSELECT',
    },
    game: {
        players: [{ hero: 'morevna', id: 'player1' }],
    },
};

export const versusState = {
    profiles: [
        {
            id: 'player1',
        },
        {
            id: 'player2',
        },
    ],
    manager: {
        screen: 'VERSUS',
    },
    game: {
        active: 'player1',
        players: [
            { hero: 'morevna', id: 'player1' },
            { hero: 'yaga', id: 'player2' },
        ],
    },
};

export const profileState = {
    profile: {
        characters: ['morevna', 'yaga', 'premudraya', 'hozyaika'],
        deck: ['apple'],
        gold: 0,
    },
    manager: {
        screen: 'PROFILE',
    },
    game: { phase: 'ACTIVE' },
};
