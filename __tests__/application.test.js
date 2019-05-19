/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import {
    startscreenState, heroselectState, heroselectedState, versusState, profileState,
} from '../__mocks__/stateMock';

// import module for tests
const application = require('../backend/application');
const heroData = require('../backend/data/characters.json');

jest.mock('../backend/randomFunc');

// If it's the first INITIAL message from frontend, return the app in it's initial state
test('Game loaded. Send the app in its initial state', () => {
    // Create a messade that has type and may have additional data later.
    // We only need type for this test.
    const msg = { type: 'INITIAL' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(startscreenState);
});

// Test the first game state Play, returns the available characters
test('First game state Play. The Player can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: 'PLAY' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectState);
});


// Test msg PLAY returns list with all available characters.game state  Hero Select.
test('PLAY msg received. List with all characters added - HERO SELECT state.', () => {
    // We only need type for this test.
    const msg = { type: 'PLAY' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);

    expect(sendReply.mock.calls.length).toBe(1);

    // Save the data into variable for checks
    const heroSelect = sendReply.mock.calls[0][0].heroSelect;
    expect(heroSelect.morevna.cardsNumber).toEqual(heroData.morevna.cardsNumber);
    expect(heroSelect.morevna.health).toEqual(heroData.morevna.health);
    expect(Object.keys(heroSelect.morevna.cards).length).toEqual(Object.keys(heroData.morevna.cards).length);

    expect(heroSelect.yaga.cardsNumber).toEqual(heroData.yaga.cardsNumber);
    expect(heroSelect.yaga.health).toEqual(heroData.yaga.health);
    expect(Object.keys(heroSelect.yaga.cards).length).toEqual(Object.keys(heroData.yaga.cards).length);
});

// Test that msg HEROSELECTED clears the characters list and turn state into HERO SELECTED
test('msg HEROSELECTED received. List with charactes cleared. State Hero Selected.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(heroselectedState);
});

// screen swtich to state VERSUS after hero is selected
test('msg HEROSELECTED switches screen state to VERSUS', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(versusState);
});

// Test that one player has become active. Game state VERSUS.
test('msg HEROSELECTED received: active player is set.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();
    // we save normal random here before mock it
    const oldRandom = Math.random;
    // Mock will rewrite all math.random and set it to 1
    Math.random = jest.fn();
    Math.random.mockReturnValue(1);

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            game: {
                players: [
                    { active: false },
                    { active: true },
                ],
            },
            heroSelect: {},
        },
    );
    // We return random to initial value, so it is not always set to 1
    Math.random = oldRandom;
});

// Test that active player gets all the data. Game state VERSUS.
test('msg HEROSELECTED received: active player has all the data.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active player
    let activePlayer = result.game.players[0];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
    }

    // Expect player to have relevant data
    expect(activePlayer.hero).toBeDefined();
    expect(Object.keys(activePlayer.cards).length).toEqual(
        heroData[activePlayer.hero].cardsNumber,
    );
    expect(activePlayer.health.maximum).toEqual(heroData[activePlayer.hero].health);
    expect(activePlayer.hand).toEqual({});
});

// Test that inactive player gets its character and it's deck. Game state VERSUS.
test('msg HEROSELECTED received: inactive player gets relevant data.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    let inactivePlayer = result.game.players[0];
    if (result.game.players[0].active === true) {
        inactivePlayer = result.game.players[1];
    }
    expect(inactivePlayer.hero).toBeDefined();
    expect(Object.keys(inactivePlayer.cards).length).toEqual(
        heroData[inactivePlayer.hero].cardsNumber,
    );
    expect(inactivePlayer.health.maximum).toEqual(heroData[inactivePlayer.hero].health);
    expect(inactivePlayer.hand).toEqual({});
});

// Test that both players get 5 cards from deck to their hands. Game state Deal All.
test('msg DEALALL received: Players hands have 5 cards each. Players cards have 5 cards less. State Deal All.', () => {
    const msg = { type: 'DEALALL' };
    // Mock sendReply function
    const sendReply = jest.fn();


    // Mock will rewrite all game state and set it to DealAll case
    application.setApp({
        game: {
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    cards: {
                        key1: {},
                        key15: {},
                        key18: {},
                        key3: {},
                        key7: {},
                        key9: {},
                        key2: {},
                        key6: {},
                        key14: {},
                        key0: {},
                    },
                    hand: {
                        key4: {}, key11: {}, key10: {}, key16: {}, key5: {},
                    },
                    health: 15,
                    grave: {},
                },
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    hand: {
                        key11: {}, key10: {}, key1: {}, key8: {}, key13: {},
                    },
                    health: 13,
                    grave: {},
                },
            ],
        },
    });


    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    expect(result.game.players[0].hero).toEqual('yaga');
    expect(Object.keys(result.game.players[0].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[0].cards).length).toEqual(10);

    expect(result.game.players[1].hero).toEqual('morevna');
    expect(Object.keys(result.game.players[1].hand).length).toEqual(5);
    expect(Object.keys(result.game.players[1].cards).length).toEqual(10);

    expect(result.manager.screen).toEqual('PLAYERACT');
});

// screen swtich to state STARTSCREEN after button TO START SCREEN is clicked
test('msg STARTSCREEN switches screen state to STARTSCREEN', () => {
    // We only need type for this test.
    const msg = { type: 'STARTSCREEN' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);
    expect(sendReply.mock.calls[0][0]).toMatchObject(
        {
            manager: {
                screen: 'STARTSCREEN',
            },

        },
    );
});

// Test that both  players gets individual keyHero each. Game state VERSUS.
test('msg HEROSELECTED received: players  have individual keyHero each.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active and inactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }

    // Expect players to have keyHero
    expect(activePlayer.keyHero).toBeDefined();
    expect(inactivePlayer.keyHero).toBeDefined();
    // Expect each player's keyHero differs
    expect(activePlayer.keyHero).not.toEqual(inactivePlayer.keyHero);
});

// Test that players cards get property disabled: false once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property disabled: fasle.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active andinactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(activePlayer.cards).length; i++) {
        // and we expect active player to have disabled: false property in each card
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('disabled', false);
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have disabled: false property in each card
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('disabled', false);
    }
});

// Test that players cards get points and health current points once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property initialpoints and health.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'hozyaika' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active andinactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(activePlayer.cards).length; i++) {
        // and we expect active player to have points property in each card = initialpoints
        // and property healthCurrent = health
        const card = Object.values(activePlayer.cards)[i];
        if (card.initialpoints !== undefined) {
            expect(card).toHaveProperty('points', card.initialpoints);
        }
        if (card.type === 'item') {
            expect(card).toHaveProperty('healthCurrent', card.health);
        }
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have points property in each card = initialpoints
        // and property healthCurrent = health for each item card
        const card = Object.values(inactivePlayer.cards)[c];
        if (card.initialpoints !== undefined) {
            expect(card).toHaveProperty('points', card.initialpoints);
        }
        if (card.type === 'item') {
            expect(card).toHaveProperty('healthCurrent', card.health);
        }
    }
});

// Test that both  players gets individual keyHero each. Game state VERSUS.
test('msg HEROSELECTED received: players  have individual keyHero each.', () => {
// We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'morevna' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active and inactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }

    // Expect players to have keyHero
    expect(activePlayer.keyHero).toBeDefined();
    expect(inactivePlayer.keyHero).toBeDefined();
    // Expect each player's keyHero differs
    expect(activePlayer.keyHero).not.toEqual(inactivePlayer.keyHero);
});

// Test that players cards get property categoryName once they are dealt to players.
test('msg HEROSELECTED received: both players cards get property categoryName.', () => {
    // We only need type for this test.
    const msg = { type: 'HEROSELECTED', hero: 'morevna', opponent: 'yaga' };

    // Mock sendReply function
    const sendReply = jest.fn();

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // Find active andinactive players
    let activePlayer = result.game.players[0];
    let inactivePlayer = result.game.players[1];
    if (result.game.players[0].active === false) {
        activePlayer = result.game.players[1];
        inactivePlayer = result.game.players[0];
    }
    // we check every card dealt to active player
    for (let i = 0; i < Object.keys(activePlayer.cards).length; i++) {
        // and we expect active player to have disabled: false property in each card
        expect(Object.values(activePlayer.cards)[i]).toHaveProperty('categoryName');
    }
    // we check every card dealt to inactive player
    for (let c = 0; c < Object.keys(inactivePlayer.cards).length; c++) {
        // and we expect inactive player to have disabled: false property in each card
        expect(Object.values(inactivePlayer.cards)[c]).toHaveProperty('categoryName');
    }
});

// Test, that when inactive player has  magicTree item in  item holder,
// then active player can make only one action in 1 turn (turn changes once moveCounter == 1 not 2 as usual)
test('msg ACTION received: active can make only 1 action in 1 turn if inactive player has magicTree in item holder', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 15, maximum: 15 },
                    item: {
                        key10: {
                            id: 'magicTree', type: 'item', category: 'holdTurn', healthCurrent: 2, health: 2, disabled: false,
                        },
                    },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key7: { type: 'item', disabled: false },
                        key9: { type: 'action', disabled: false },
                        key2: { type: 'action', disabled: false },
                        key4: { type: 'action', disabled: false },
                    },
                    grave: {},
                },
                {
                    active: true,
                    hero: 'premudraya',
                    cards: {
                        key0: {},
                        key2: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key11: { type: 'action', disabled: false },
                        key8: { type: 'item', disabled: false },
                        key13: { type: 'action', disabled: false },
                        key10: { type: 'action', disabled: false },
                        key1: {
                            id: 'horsemanRed', type: 'action', category: 'attack', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {
                        key3: {
                            id: 'shieldsmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что ход сменился и Yaga стала активным игроком
    expect(result.game.players[0].active).toEqual(true);
    // а Premudraya стала неактивным игроком и ее счетчик хода снова обнулился
    expect(result.game.players[1].active).toEqual(false);
    expect(result.game.players[1].moveCounter).toEqual(0);

    // ожидаем, что карта magicTree лежит в item holder активного игрока Yaga
    expect(result.game.players[0].item.key10.id).toEqual('magicTree');
    // ожидаем, что карта magicTree активного игрока имеет категорию holdTurn
    expect(result.game.players[0].item.key10.category).toEqual('holdTurn');
});

// Test that player can put  Bow and Arrows card in item holder, and opponent's
// cards with > 1 point have 60%  chance to loose 1 point at the beggining of every turn ( move counter +1)
test.only('msg ACTION received: player put Bow&Arrow card in item, 60% that opponent 2 cards can loose 1 point at next turn.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key4',
        target: 'item',
    };
    const sendReply = jest.fn();
    // we set app game in needed state for testing
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                        key1: {
                            id: 'horsemanBlack', category: 'attack', points: 3, initialpoints: 3, disabled: false,
                        },
                        key5: {
                            id: 'bogatyr', category: 'attack', points: 4, initialpoints: 4, disabled: false,
                        },
                        key7: {
                            id: 'horsemanWhite', category: 'attack', points: 1, initialpoints: 1, disabled: false,
                        },
                        key9: {
                            id: 'chemise', category: 'heal', points: 5, initialpoints: 5, disabled: false,
                        },
                    },
                    item: {},
                    moveCounter: 0,
                },
                {
                    active: true,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    hand: {
                        key11: {},
                        key8: {},
                        key3: {},
                        key4: {
                            id: 'bowArrow', type: 'item', category: 'supress', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                    cards: {
                        key0: {},
                        key2: {},
                        key13: {},
                        key5: {},
                        key7: {},
                        key6: {},
                        key10: {},
                        key14: {},
                        key12: {},
                        key9: {},
                        key15: {},
                    },
                    moveCounter: 1,
                },
            ],
        },
    });

    // we save normal random here before mock it
    const oldRandom = Math.random;
    // Mock will rewrite all math.random and set it to 1 to 1st call
    // then set it to 1 at 2nd call, to 3 at 3rd call and to 2 by default
    Math.random = jest.fn();
    Math.random.mockReturnValueOnce(0.4).mockReturnValueOnce(0.3).mockReturnValueOnce(0.9);

    application.msgReceived(msg, sendReply);
    // We return random to initial value, so it is not always set to 1
    Math.random = oldRandom;
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карт лук и стрелы лежат в item активного игрока
    expect(Object.values(result.game.players[1].item)[0].id).toEqual('bowArrow');

    // ожидаем, c 60% вероятностью 2 карты из руки оппонента потеряют по 1 очку в начале хода
    expect(result.game.players[0].hand.key1.points).toEqual(2);
    expect(result.game.players[0].hand.key9.points).toEqual(4);
});

// Test that once Bow and Arrows card is at opponent item holder, 2 player's
// cards with > 1 point have 60%  chance to loose 1 point at the beggining of every turn ( move counter +1)
test('msg ACTION received: if Bow&Arrow card is at opponent item, then with 60% 2 cards in player hand can loose 1 point at next acttion.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'opponent',
    };
    const sendReply = jest.fn();
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'premudraya',
                    health: { current: 10, maximum: 14 },
                    hand: {
                        key10: {
                            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                    item: {},
                },
                {
                    active: false,
                    hero: 'morevna',
                    health: { current: 13, maximum: 16 },
                    item: {
                        key4: {
                            id: 'bowArrow', type: 'item', category: 'supress', points: 2, initialpoints: 2, disabled: false,
                        },
                    },
                },
            ],
        },
    });
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    const result = sendReply.mock.calls[0][0];
    // ожидаем, что карт лук и стрелы лежат в item неактивного игрока
    expect(result.game.players[1].item[0].id).toEqual('bowArrow');
});
