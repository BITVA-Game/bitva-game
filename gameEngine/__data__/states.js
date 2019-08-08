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
        players: [{ id: 'player1', hero: 'premudraya' }, { hero: 'yaga', id: 'player2' }],
    },
};

export const versusWithCards = {
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
        players: [
            {
                id: 'player1',
                hero: 'premudraya',
                hand: {},
                cards: {
                    key0: {}, key1: {}, key2: {}, key3: {}, key4: {}, key10: {}, key11: {}, key12: {}, key13: {}, key14: {}, key5: {}, key6: {}, key7: {}, key8: {}, key9: {}, key15: {}, key16: {}, key17: {}, key18: {},
                },
            },
            {
                hero: 'yaga',
                id: 'player2',
                hand: {},
                cards: {
                    key0: {}, key1: {}, key2: {}, key3: {}, key4: {}, key10: {}, key11: {}, key12: {}, key13: {}, key14: {}, key5: {}, key6: {}, key7: {}, key8: {}, key9: {},
                },
            },
        ],
    },
};

export const game = {
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
    heroSelect: null,
    game: {
        active: 'player1',
        players: [
            {
                id: 'player1',
                hero: 'premudraya',
                hand: {
                    key0: {}, key1: {}, key2: {}, key3: {}, key4: {},
                },
                cards: {
                    key10: {}, key11: {}, key12: {}, key13: {}, key14: {}, key5: {}, key6: {}, key7: {}, key8: {}, key9: {}, key15: {}, key16: {}, key17: {}, key18: {},
                },
            },
            {
                hero: 'yaga',
                id: 'player2',
                hand: {
                    key0: {}, key1: {}, key2: {}, key3: {}, key4: {},
                },
                cards: {
                    key10: {}, key11: {}, key12: {}, key13: {}, key14: {}, key5: {}, key6: {}, key7: {}, key8: {}, key9: {},
                },
            },
        ],
    },
};
