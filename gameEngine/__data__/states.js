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
        players: [{
            hero: 'morevna',
            id: 'player1',
        }],
    },
    game: {
        players: [{
            id: 'player1',
            hand: {},
            item: {},
            grave: {},
            moveCounter: 0,
            health: {
                current: 16,
                maximum: 16,
            },
            deal: 0,
            background: 'ochre',
            hero: 'morevna',
            cards: {},
            deck: {},
            turningHand: false,
        }],
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
    heroSelect: null,
    manager: {
        screen: 'VERSUS',
    },
    game: {
        active: 'player1',
        players: [
            {
                id: 'player1',
                hand: {},
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 16, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                turningHand: false,
                deck: {
                    key0: {},
                    key1: {},
                    key2: {},
                    key3: {},
                    key4: {},
                    key5: {},
                    key6: {},
                    key7: {},
                    key8: {},
                    key9: {},
                    key10: {},
                    key11: {},
                    key12: {},
                    key13: {},
                    key14: {},
                    key15: {},
                    key16: {},
                    key17: {},
                    key18: {},
                    key19: {},
                    key20: {},
                    key21: {},
                    key22: {},
                    key23: {},
                    key24: {},
                    key25: {},
                },
                cards: {
                    key1: {},
                    key2: {},
                    key4: {},
                    key15: {},
                    key17: {},
                    key7: {},
                    key6: {},
                    key12: {},
                    key14: {},
                    key19: {},
                    key3: {},
                    key8: {},
                    key10: {},
                    key25: {},
                    key20: {},
                },
            },
            {
                id: 'player2',
                hand: {},
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                turningHand: false,
                hero: 'yaga',
                deck: {
                    key0: {},
                    key1: {},
                    key2: {},
                    key3: {},
                    key4: {},
                    key5: {},
                    key6: {},
                    key7: {},
                    key8: {},
                    key9: {},
                    key10: {},
                    key11: {},
                    key12: {},
                    key13: {},
                    key14: {},
                    key15: {},
                    key16: {},
                    key17: {},
                    key18: {},
                    key19: {},
                    key20: {},
                    key21: {},
                    key22: {},
                    key23: {},
                    key24: {},
                    key25: {},
                },
                cards: {
                    key1: {},
                    key2: {},
                    key4: {},
                    key15: {},
                    key17: {},
                    key7: {},
                    key6: {},
                    key12: {},
                    key14: {},
                    key19: {},
                    key3: {},
                    key8: {},
                    key10: {},
                    key25: {},
                    key20: {},
                },
            },
        ],
    },
};

export const dealAllState = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 16, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                hand: {
                    key20: {},
                    key21: {},
                    key22: {},
                    key0: {},
                    key18: {},
                },
                deck: {
                    key0: {},
                    key1: {},
                    key2: {},
                    key3: {},
                    key4: {},
                    key5: {},
                    key6: {},
                    key7: {},
                    key8: {},
                    key9: {},
                    key10: {},
                    key11: {},
                    key12: {},
                    key13: {},
                    key14: {},
                    key15: {},
                    key16: {},
                    key17: {},
                    key18: {},
                    key19: {},
                    key20: {},
                    key21: {},
                    key22: {},
                    key23: {},
                    key24: {},
                    key25: {},
                },
                cards: {
                    key1: {},
                    key2: {},
                    key4: {},
                    key15: {},
                    key17: {},
                    key7: {},
                    key6: {},
                    key12: {},
                    key14: {},
                    key19: {},
                    key3: {},
                    key8: {},
                    key10: {},
                    key25: {},
                },
                keyHero: '19355969',
                position: 'bottom',
                turningHand: false,
            },
            {
                id: 'player2',
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                turningHand: false,
                hero: 'yaga',
                hand: {
                    key20: {},
                    key21: {},
                    key22: {},
                    key0: {},
                    key18: {},
                },
                deck: {
                    key0: {},
                    key1: {},
                    key2: {},
                    key3: {},
                    key4: {},
                    key5: {},
                    key6: {},
                    key7: {},
                    key8: {},
                    key9: {},
                    key10: {},
                    key11: {},
                    key12: {},
                    key13: {},
                    key14: {},
                    key15: {},
                    key16: {},
                    key17: {},
                    key18: {},
                    key19: {},
                    key20: {},
                    key21: {},
                    key22: {},
                    key23: {},
                    key24: {},
                    key25: {},
                },
                cards: {
                    key1: {},
                    key2: {},
                    key4: {},
                    key15: {},
                    key17: {},
                    key7: {},
                    key6: {},
                    key12: {},
                    key14: {},
                    key19: {},
                    key3: {},
                    key8: {},
                    key10: {},
                    key25: {},
                },
                keyHero: '62750748',
                position: 'top',
            },
        ],
    },
};
