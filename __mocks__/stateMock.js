export const startscreenState = {
    profiles: [
        {
            id: 'player1',
            characters: ['morevna', 'yaga', 'premudraya'],
        },
        {
            id: 'player2',
            characters: ['morevna', 'yaga'],
        },
    ],
    manager: {
        screen: 'STARTSCREEN',
    },
    game: {

    },
};

export const heroselectState = {
    profiles: [
        {
            id: 'player1',
            characters: ['morevna', 'yaga', 'premudraya'],
        },
        {
            id: 'player2',
            characters: ['morevna', 'yaga'],
        },
    ],
    heroSelect: {
        morevna: {},
        yaga: {},
        premudraya: {},
        hozyaika: {},
    },
    manager: {
        screen: 'HEROSELECT',
    },
    game: {
        activePlayer: 'player1',
    },
};

export const heroselectedState = {
    profiles: {
        characters: ['morevna', 'yaga', 'premudraya', 'hozyaika'],
        deck: ['apple'],
        gold: 0,
    },
    heroSelect: {},
    game: {

    },
};

export const versusState = {
    profile: {
        characters: ['morevna', 'yaga', 'premudraya', 'hozyaika'],
        deck: ['apple'],
        gold: 0,
    },
    heroSelect: {
    },
    manager: {
        screen: 'VERSUS',
    },
    game: {

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
