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
    app: {
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
            players: [{ hero: 'yaga', id: 'player1' }],
        },
        manager: {
            screen: 'HEROSELECT',
        },
        game: {
            players: [{ hero: 'yaga', id: 'player1' }],
        },
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
        players: [{ hero: 'morevna', id: 'player2' }],
    },
    manager: {
        screen: 'HEROSELECT',
    },
    game: {
        players: [{ hero: 'morevna', id: 'player2' }],
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
            { hero: 'morevna', id: 'player1', turningHand: false },
            { hero: 'yaga', id: 'player2', turningHand: false },
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
                hand: {},
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 16, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                deck:
     {
         key0:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key1:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key2:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key3:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key4:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key5:
        {
            id: 'wolf',
            name: 'Grey Wolf',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
            initialpoints: 2,
        },
         key6:
        {
            id: 'wolf',
            name: 'Grey Wolf',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
            initialpoints: 2,
        },
         key7:
        {
            id: 'wolf',
            name: 'Grey Wolf',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key8:
        {
            id: 'wolf',
            name: 'Grey Wolf',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
            initialpoints: 2,
        },
         key9:
        {
            id: 'warhorse',
            name: 'War Horse',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
            initialpoints: 3,
            points: 3,
            disabled: false,
        },
         key10:
        {
            id: 'warhorse',
            name: 'War Horse',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
            initialpoints: 3,
        },
         key11:
        {
            id: 'warhorse',
            name: 'War Horse',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
            initialpoints: 3,
        },
         key12:
        {
            id: 'bogatyr',
            name: 'Bogatyr',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
            initialpoints: 4,
            points: 4,
            disabled: false,
        },
         key13:
        {
            id: 'bogatyr',
            name: 'Bogatyr',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
            initialpoints: 4,
        },
         key14:
        {
            id: 'apple',
            name: 'Apple',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key15:
        {
            id: 'apple',
            name: 'Apple',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key16:
        {
            id: 'bereginya',
            name: 'Bereginya',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
            initialpoints: 4,
            points: 4,
            disabled: false,
        },
         key17:
        {
            id: 'shieldLarge',
            name: 'Large Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
            health: 4,
        },
         key18:
        {
            id: 'shieldLarge',
            name: 'Large Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
            health: 4,
        },
         key19:
        {
            id: 'shieldSmall',
            name: 'Small Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
            health: 2,
            healthCurrent: 2,
            disabled: false,
        },
         key20:
        {
            id: 'shieldSmall',
            name: 'Small Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
            health: 2,
            healthCurrent: 2,
            disabled: false,
        },
         key21:
        {
            id: 'shieldSmall',
            name: 'Small Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
            health: 2,
        },
         key22:
        {
            id: 'waterLiving',
            name: 'Living Water',
            type: 'item',
            icon: 'heartRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
            health: 3,
            initialpoints: 1,
            healthCurrent: 3,
            points: 1,
            disabled: false,
        },
         key23:
        {
            id: 'waterLiving',
            name: 'Living Water',
            type: 'item',
            icon: 'heartRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
            health: 3,
            initialpoints: 1,
            healthCurrent: 3,
            points: 1,
            disabled: false,
        },
     },
                cards:
     {
         key7:
        {
            id: 'wolf',
            name: 'Grey Wolf',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key15:
        {
            id: 'apple',
            name: 'Apple',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key20:
        {
            id: 'shieldSmall',
            name: 'Small Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
            health: 2,
            healthCurrent: 2,
            disabled: false,
        },
         key22:
        {
            id: 'waterLiving',
            name: 'Living Water',
            type: 'item',
            icon: 'heartRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
            health: 3,
            initialpoints: 1,
            healthCurrent: 3,
            points: 1,
            disabled: false,
        },
         key23:
        {
            id: 'waterLiving',
            name: 'Living Water',
            type: 'item',
            icon: 'heartRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
            health: 3,
            initialpoints: 1,
            healthCurrent: 3,
            points: 1,
            disabled: false,
        },
         key4:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key16:
        {
            id: 'bereginya',
            name: 'Bereginya',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
            initialpoints: 4,
            points: 4,
            disabled: false,
        },
         key3:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key19:
        {
            id: 'shieldSmall',
            name: 'Small Shield',
            type: 'item',
            icon: 'shield',
            category: 'shield',
            categoryName: 'shield',
            description:
           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
            health: 2,
            healthCurrent: 2,
            disabled: false,
        },
         key2:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key1:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key0:
        {
            id: 'bulat',
            name: 'Bulat Sword',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
         key12:
        {
            id: 'bogatyr',
            name: 'Bogatyr',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
            initialpoints: 4,
            points: 4,
            disabled: false,
        },
         key9:
        {
            id: 'warhorse',
            name: 'War Horse',
            type: 'action',
            icon: 'skull',
            category: 'attack',
            categoryName: 'attack',
            description:
           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
            initialpoints: 3,
            points: 3,
            disabled: false,
        },
         key14:
        {
            id: 'apple',
            name: 'Apple',
            type: 'action',
            icon: 'dropRed',
            category: 'heal',
            categoryName: 'heal',
            description:
           'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
            initialpoints: 2,
            points: 2,
            disabled: false,
        },
     },
                keyHero: '19355969',
                position: 'bottom',
                turningHand: false,
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
                deck:
       {
           key0:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key1:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key2:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
          },
           key3:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
          },
           key4:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
          },
           key5:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
          },
           key6:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key7:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
          },
           key8:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key9:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key10:
          {
              id: 'kikimora',
              name: 'Kikimora',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
              initialpoints: 1,
          },
           key11:
          {
              id: 'kikimora',
              name: 'Kikimora',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key12:
          {
              id: 'kikimora',
              name: 'Kikimora',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key13:
          {
              id: 'bogatyr',
              name: 'Bogatyr',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
              initialpoints: 4,
          },
           key14:
          {
              id: 'bogatyr',
              name: 'Bogatyr',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
              initialpoints: 4,
          },
           key15:
          {
              id: 'bogatyr',
              name: 'Bogatyr',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
              initialpoints: 4,
              points: 4,
              disabled: false,
          },
           key16:
          {
              id: 'mortar',
              name: 'Flying Mortar',
              type: 'action',
              icon: 'dropRed',
              category: 'heal',
              categoryName: 'heal',
              description:
             'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key17:
          {
              id: 'mortar',
              name: 'Flying Mortar',
              type: 'action',
              icon: 'dropRed',
              category: 'heal',
              categoryName: 'heal',
              description:
             'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
              initialpoints: 2,
          },
           key18:
          {
              id: 'chickenLegsHut',
              name: 'Hut On Chicken Legs',
              type: 'action',
              icon: 'dropRed',
              category: 'heal',
              categoryName: 'heal',
              description:
             "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
              initialpoints: 5,
              points: 5,
              disabled: false,
          },
           key19:
          {
              id: 'shieldLarge',
              name: 'Large Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
              health: 4,
              healthCurrent: 4,
              disabled: false,
          },
           key20:
          {
              id: 'shieldLarge',
              name: 'Large Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
              health: 4,
          },
           key21:
          {
              id: 'shieldSmall',
              name: 'Small Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
              health: 2,
              healthCurrent: 2,
              disabled: false,
          },
           key22:
          {
              id: 'shieldSmall',
              name: 'Small Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
              health: 2,
          },
           key23:
          {
              id: 'shieldSmall',
              name: 'Small Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
              health: 2,
              healthCurrent: 2,
              disabled: false,
          },
           key24:
          {
              id: 'russianOven',
              name: 'Russian Oven',
              type: 'action',
              icon: 'ballChain',
              category: 'holdCard',
              categoryName: 'hold',
              description:
             'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key25:
          {
              id: 'russianOven',
              name: 'Russian Oven',
              type: 'action',
              icon: 'ballChain',
              category: 'holdCard',
              categoryName: 'hold',
              description:
             'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
       },
                cards:
       {
           key18:
          {
              id: 'chickenLegsHut',
              name: 'Hut On Chicken Legs',
              type: 'action',
              icon: 'dropRed',
              category: 'heal',
              categoryName: 'heal',
              description:
             "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
              initialpoints: 5,
              points: 5,
              disabled: false,
          },
           key21:
          {
              id: 'shieldSmall',
              name: 'Small Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
              health: 2,
              healthCurrent: 2,
              disabled: false,
          },
           key6:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key16:
          {
              id: 'mortar',
              name: 'Flying Mortar',
              type: 'action',
              icon: 'dropRed',
              category: 'heal',
              categoryName: 'heal',
              description:
             'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key0:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key24:
          {
              id: 'russianOven',
              name: 'Russian Oven',
              type: 'action',
              icon: 'ballChain',
              category: 'holdCard',
              categoryName: 'hold',
              description:
             'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key19:
          {
              id: 'shieldLarge',
              name: 'Large Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
              health: 4,
              healthCurrent: 4,
              disabled: false,
          },
           key23:
          {
              id: 'shieldSmall',
              name: 'Small Shield',
              type: 'item',
              icon: 'shield',
              category: 'shield',
              categoryName: 'shield',
              description:
             'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
              health: 2,
              healthCurrent: 2,
              disabled: false,
          },
           key8:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key1:
          {
              id: 'bajun',
              name: 'Cat-Bajun',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key25:
          {
              id: 'russianOven',
              name: 'Russian Oven',
              type: 'action',
              icon: 'ballChain',
              category: 'holdCard',
              categoryName: 'hold',
              description:
             'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
              initialpoints: 2,
              points: 2,
              disabled: false,
          },
           key11:
          {
              id: 'kikimora',
              name: 'Kikimora',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key12:
          {
              id: 'kikimora',
              name: 'Kikimora',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
           key15:
          {
              id: 'bogatyr',
              name: 'Bogatyr',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
              initialpoints: 4,
              points: 4,
              disabled: false,
          },
           key9:
          {
              id: 'gusiLebedi',
              name: 'The Magic Swan Geese',
              type: 'action',
              icon: 'skull',
              category: 'attack',
              categoryName: 'attack',
              description:
             "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
              initialpoints: 1,
              points: 1,
              disabled: false,
          },
       },
                keyHero: '62750748',
                position: 'top',
            },
        ],
    },
};

export const gameStartState = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 16, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
        ],
    },
};

export const gameP1DamagedState = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 10, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
        ],
    },
};

export const gameP2HasShieldState = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 10, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {
                    key23: {
                        id: 'shieldSmall',
                        name: 'Small Shield',
                        type: 'item',
                        icon: 'shield',
                        category: 'shield',
                        categoryName: 'shield',
                        description:
                 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                        health: 2,
                        healthCurrent: 2,
                        disabled: false,
                    },
                },
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
        ],
    },
};

export const gameP2HasSmallShieldState = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 10, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bulat',
                            name: 'Bulat Sword',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'warhorse',
                            name: 'War Horse',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                            initialpoints: 3,
                            points: 3,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {
                    key23: {
                        id: 'shieldSmall',
                        name: 'Small Shield',
                        type: 'item',
                        icon: 'shield',
                        category: 'shield',
                        categoryName: 'shield',
                        description:
                 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                        health: 2,
                        healthCurrent: 2,
                        disabled: false,
                    },
                },
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
        ],
    },
};

export const gameP1Action2 = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {
                },
                grave: {},
                moveCounter: 1,
                health: { current: 10, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bulat',
                            name: 'Bulat Sword',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'warhorse',
                            name: 'War Horse',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                            initialpoints: 3,
                            points: 3,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {
                    key23: {
                        id: 'shieldSmall',
                        name: 'Small Shield',
                        type: 'item',
                        icon: 'shield',
                        category: 'shield',
                        categoryName: 'shield',
                        description:
                 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                        health: 2,
                        healthCurrent: 2,
                        disabled: false,
                    },
                },
                grave: {},
                moveCounter: 0,
                health: { current: 15, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
        ],
    },
};

export const gameP2Dying = {
    game: {
        active: 'player1',
        phase: 'ACTIVE',
        players: [
            {
                id: 'player1',
                turningHand: false,
                item: {
                    key19:
                                        {
                                            id: 'shieldSmall',
                                            name: 'Small Shield',
                                            type: 'item',
                                            icon: 'shield',
                                            category: 'shield',
                                            categoryName: 'shield',
                                            description:
                                           'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                                            health: 2,
                                            healthCurrent: 2,
                                            disabled: false,
                                        },
                },
                grave: {},
                moveCounter: 0,
                health: { current: 10, maximum: 16 },
                deal: 0,
                background: 'ochre',
                hero: 'morevna',
                keyHero: '19355969',
                position: 'bottom',
                hand:
                  {
                      key7:
                        {
                            id: 'wolf',
                            name: 'Grey Wolf',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'apple',
                            name: 'Apple',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bulat',
                            name: 'Bulat Sword',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'warhorse',
                            name: 'War Horse',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description:
                           'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                            initialpoints: 3,
                            points: 3,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'waterLiving',
                            name: 'Living Water',
                            type: 'item',
                            icon: 'heartRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                            health: 3,
                            initialpoints: 1,
                            healthCurrent: 3,
                            points: 1,
                            disabled: false,
                        },
                  },
                deck:
            {
                key0:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key1:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key2:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key3:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key4:
                {
                    id: 'bulat',
                    name: 'Bulat Sword',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key5:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key6:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key7:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                    points: 2,
                    disabled: false,
                },
                key8:
                {
                    id: 'wolf',
                    name: 'Grey Wolf',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Strong and dangerous enemy. Lives in a deep forest, aggresive and unpredictable.',
                    initialpoints: 2,
                },
                key9:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                    points: 3,
                    disabled: false,
                },
                key10:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key11:
                {
                    id: 'warhorse',
                    name: 'War Horse',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                    initialpoints: 3,
                },
                key12:
                {
                    id: 'bogatyr',
                    name: 'Bogatyr',
                    type: 'action',
                    icon: 'skull',
                    category: 'attack',
                    categoryName: 'attack',
                    description:
                   'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                    initialpoints: 4,
                    points: 4,
                    disabled: false,
                },
                key13:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                  },
                key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key15:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                key17:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key18:
                  {
                      id: 'shieldLarge',
                      name: 'Large Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                      health: 4,
                  },
                key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key20:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                key21:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                  },
                key22:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
                key23:
                  {
                      id: 'waterLiving',
                      name: 'Living Water',
                      type: 'item',
                      icon: 'heartRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Water with magic specific properties. E.g. living water is able to reanimate. During long-time storage it looses its healing properties.',
                      health: 3,
                      initialpoints: 1,
                      healthCurrent: 3,
                      points: 1,
                      disabled: false,
                  },
            },
                cards:
               {
                   key4:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key16:
                  {
                      id: 'bereginya',
                      name: 'Bereginya',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'Plenty of Keepers live in our world, inhabiting the forests. Promised in marriage fiancees, gone before their wedding. Keepers appear from the other realm: come out from under ground, descend from the sky on the birch branches, emerge from the rivers and lakes.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key3:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key19:
                  {
                      id: 'shieldSmall',
                      name: 'Small Shield',
                      type: 'item',
                      icon: 'shield',
                      category: 'shield',
                      categoryName: 'shield',
                      description:
                     'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                      health: 2,
                      healthCurrent: 2,
                      disabled: false,
                  },
                   key2:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key1:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key0:
                  {
                      id: 'bulat',
                      name: 'Bulat Sword',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     "Damask steel dagger - sword with sorcery charmed blade. Its steel is quenched not by the water but the wind, possesses wind's power and force.",
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
                   key12:
                  {
                      id: 'bogatyr',
                      name: 'Bogatyr',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                      initialpoints: 4,
                      points: 4,
                      disabled: false,
                  },
                   key9:
                  {
                      id: 'warhorse',
                      name: 'War Horse',
                      type: 'action',
                      icon: 'skull',
                      category: 'attack',
                      categoryName: 'attack',
                      description:
                     'Loyal friend, warning his owner of the danger. Horse helps his Lady bogatyr both to slip her pursuers and joins the battle - hoofs the enemy warriors.',
                      initialpoints: 3,
                      points: 3,
                      disabled: false,
                  },
                   key14:
                  {
                      id: 'apple',
                      name: 'Apple',
                      type: 'action',
                      icon: 'dropRed',
                      category: 'heal',
                      categoryName: 'heal',
                      description:
                     'In far off lands there is a garden with magic youth-giving apples. If an elder eats such apple — gets younger, and an ill — gets his health back. ',
                      initialpoints: 2,
                      points: 2,
                      disabled: false,
                  },
               },
            },
            {
                id: 'player2',
                turningHand: false,
                item: {},
                grave: {},
                moveCounter: 0,
                health: { current: 2, maximum: 15 },
                deal: 0,
                background: 'red',
                hero: 'yaga',
                keyHero: '62750748',
                position: 'top',
                hand:
                  {
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                deck:
                  {
                      key0:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key2:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key3:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key4:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                        },
                      key5:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key6:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key7:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key10:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key13:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key14:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key16:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key17:
                        {
                            id: 'mortar',
                            name: 'Flying Mortar',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: 'Mortar possess magic powers and can, not only fly, but also grind the desease, pound an ill person into healthy.',
                            initialpoints: 2,
                        },
                      key18:
                        {
                            id: 'chickenLegsHut',
                            name: 'Hut On Chicken Legs',
                            type: 'action',
                            icon: 'dropRed',
                            category: 'heal',
                            categoryName: 'heal',
                            description: "Yaga's place of living. Once hut turns its front to a viator, back to the forest and then vice versa, the hut opens entrance to the living and then to the Nether world.",
                            initialpoints: 5,
                            points: 5,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key20:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                        },
                      key21:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key22:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                  },
                cards:
                  {
                      key24:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key19:
                        {
                            id: 'shieldLarge',
                            name: 'Large Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, forged by Svarog — divinity-blacksmith. After recognition of his owner, it can reflect the damage and ensure protection from witchcraft.',
                            health: 4,
                            healthCurrent: 4,
                            disabled: false,
                        },
                      key23:
                        {
                            id: 'shieldSmall',
                            name: 'Small Shield',
                            type: 'item',
                            icon: 'shield',
                            category: 'shield',
                            categoryName: 'shield',
                            description: 'The shield, begot by the tree nymph. The bark of a magic oak from curved sea-shore Lukomore helps in battle dealing with the damage and also can ward off an attacks.',
                            health: 2,
                            healthCurrent: 2,
                            disabled: false,
                        },
                      key8:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key1:
                        {
                            id: 'bajun',
                            name: 'Cat-Bajun',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "Magic were-cat. Can attack the enemy with his songs and spells. Lives at Yaga's hut.",
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key25:
                        {
                            id: 'russianOven',
                            name: 'Russian Oven',
                            type: 'action',
                            icon: 'ballChain',
                            category: 'holdCard',
                            categoryName: 'hold',
                            description: 'Being the fire keeper, Russian Oven possesses the fire power and can stop the enemies, helping Yaga in witchcraft.',
                            initialpoints: 2,
                            points: 2,
                            disabled: false,
                        },
                      key11:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key12:
                        {
                            id: 'kikimora',
                            name: 'Kikimora',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Kikimora -- a female swamp spirit who may inhabit a house too. She likes to harm or misdirect people. Kikimora is capable to put on human or animal shape.',
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                      key15:
                        {
                            id: 'bogatyr',
                            name: 'Bogatyr',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: 'Hero-warrior possessing great power, protector, distinguishes not only by courage, but also by diplomatic abilities.',
                            initialpoints: 4,
                            points: 4,
                            disabled: false,
                        },
                      key9:
                        {
                            id: 'gusiLebedi',
                            name: 'The Magic Swan Geese',
                            type: 'action',
                            icon: 'skull',
                            category: 'attack',
                            categoryName: 'attack',
                            description: "The Magic Swan Geese are Yaga's winged warriors. They help to capture and take an enemy to the other world.",
                            initialpoints: 1,
                            points: 1,
                            disabled: false,
                        },
                  },
            },
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
