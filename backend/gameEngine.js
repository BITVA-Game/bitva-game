/* eslint-disable default-case */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */

const allCharacters = require('./data/characters.json');
const allCards = require('./data/cards.json');

/**
* function to get Random Number Up To n
*
* @param {object} accept n - number, until that will be used as nearest integer
* @returns {function} Math.floor that rounds a number downward to its nearest integer - 2 multiplied functions
* @param {function} Math.random () that returns a random number between 0 (inclusive) and 1 (exclusive):
* @param {function} Math.floor that rounds a number downward to its nearest integer = n
}}
*/
function getRandomUpTo(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

/**
* function to get random Boolean
*
* @returns {function} to get Random Number Up To 2, put it into rand constant and then === 0
*
}}
*/
function getRandomBool() {
    const rand = getRandomUpTo(2);
    return rand === 0;
}

/**
* function to assign cards
*
* @param {object} deck - deck of cards belonged to the hero
@param {object} cardsNumber - cards number at each hero's deck
* @returns {function} Object.keys assigned to constant d, which returns enumerable properties (deck)  as an array and then sort it
* with Math.random () method creating mock - 0.5 and then applies slice method from 0 up to cards number for each hero
* @returns {object} cards
* @returns {function} method foreach that takes enumerable properties (d) and for each key object assigns cards key = deck key
* @param {function} Math.random () that returns a random number between 0 (inclusive) and 1 (exclusive):
* @returns {object} updated cards
}}
*/
function assignCards(deck, cardsNumber) {
    const d = Object.keys(deck).sort(() => Math.random() - 0.5).slice(0, cardsNumber);
    const cards = {};
    d.forEach((key) => {
        cards[key] = deck[key];
    });
    return cards;
}

/**
 * function to create deck of cards
 *
 * @param {object} heroName - name of the hero
 * @returns {object} constant cards = cards assinged to spicific hero from the list of all characters, choosen by heroName
 * @returns {object} deck = empty object
 * @returns {object} key = 0
 * @returns {function} for loop with parameter constant cardType in object cards
 * for loop returns inner for loop that takes count, create a new card for this cardtype
 * and then assigns key ID for each card in the deck, starting from 1
 *  @returns {object} updated deck of cards
 * */
function createDeck(heroName) {
    const cards = allCharacters[heroName].cards;
    const deck = {};
    let key = 0;
    for (const cardType in cards) {
        // take count, create a new card for this type
        for (let i = 0; i < cards[cardType].count; i += 1) {
            const keyId = `key${key}`;
            deck[keyId] = allCards[cardType];
            key += 1;
        }
    }

    return deck;
}

/**
 * function assigned to constant generatePlayers
 *
 * @param {object}  heroName - name of the chosen hero (character)
 * @returns {function} constant rand = function to get random Boolean
 * @returns {object} array of 2 players, where 1 player is active: true and another is active: false
 * @returns {object} array of all characters in the game with Object.values method and assigns them to constant allCharactersArray
 * @returns {function} to search for the second character -hero with parameters: hero Key ID and array with all characters
 * using for loop that seach within Characters array length and return if of the character other than choosen hero key
 * and then returns this character id
 * @returns {object} constant name of the 2nd character not taken from the list previoulsy
 * @returns {function} method forEach, that takes array with 2 players
 * and assigns for each player properties required for the game
 * for active player hero is the choosen character and her/his name, deck, cards, hand, item, graveyard, health
 * for inactive player is the other character and her/his name, deck, cards, hand, item, graveyard, health
 * and then returns players
 */
const generatePlayers = function (heroName) {
    const rand = getRandomBool();
    const players = [
        { active: rand },
        { active: !rand },

    ];
    // We create array from all characters objects.
    const allCharactersArray = Object.values(allCharacters);

    // we retrieve the name of the 2nd character not taken from the list previoulsy.
    function searchSecondHero(heroKey, CharacterArray) {
        for (let i = 0; i < CharacterArray.length; i += 1) {
            if (CharacterArray[i].id !== heroKey) {
                return CharacterArray[i].id;
            }
        }
        return true;
    }
    const heroSecondName = searchSecondHero(heroName, allCharactersArray);

    players.forEach((p) => {
        if (p.active) {
            p.hero = heroName;
            p.deck = createDeck(heroName);
            p.cards = assignCards(p.deck, allCharacters[heroName].cardsNumber);
            p.hand = {};
            p.item = {};
            p.grave = {};
            p.moveCounter = 0;
            p.health = {};
            p.health.current = allCharacters[heroName].health;
            p.health.maximum = allCharacters[heroName].health;
        }
        if (p.active === false) {
            p.hero = heroSecondName;
            p.deck = createDeck(heroSecondName);
            p.cards = assignCards(p.deck, allCharacters[heroSecondName].cardsNumber);
            p.hand = {};
            p.item = {};
            p.grave = {};
            p.moveCounter = 0;
            p.health = {};
            p.health.current = allCharacters[heroSecondName].health;
            p.health.maximum = allCharacters[heroSecondName].health;
        }
    });

    return { players };
};

// function randomKey(hashtable) {
//     const keys = Object.keys(hashtable);
//     return keys[Math.floor(keys.length * Math.random())];
// }

/**
 * function that give cards to player
 * @param {object} player
 * @returns {function} while loop loops through array (created with Object.keys method ) as long as player hand length is less than 6.
 * and if the same array > 0 assigning key to each card in player's hand from the key of player's card,
 * then delete this card by key from the cards and stops in any other condition
 * @returns {object} player specified
 *  */
function giveCardsTo(player) {
    while (Object.keys(player.hand).length < 5) {
        if (Object.keys(player.cards).length > 0) {
            // const key = randomKey(player.cards);
            const key = Object.keys(player.cards)[0];
            player.hand[key] = player.cards[key];
            delete player.cards[key];
        } else {
            break;
        }
    }

    return player;
}

/**
 * function that deal cards to all players
 *
 * @param {object} playersArray  - array of all players
 * @returns {function} method forEach that for each player from players array deal cards using giveCardsTo function
 * @returns {object} playersArray array with all players, that have now cards in hands
 */
function giveCardsToAll(playersArray) {
    playersArray.forEach((p) => {
        giveCardsTo(p);
    });

    return playersArray;
}

/**
 * function to move chosen card to graveyard
 *
 * @param {object} player - active player
 * @param {object} key - key for his active chosen card
 * @param {object} from  - from where player choses active card
 * @returns {function} if statement to assign card in gravyeard key of the card in item and then delete this card from item
 * if from === 'item' is true, in other cases it assigns card in gravyeard key of the card in hand and then delete this card from hand
 */
// This function takes the player and the key for his card
// And moves it so graveyard via deleting the key from array
function moveCardGraveyard(player, key, from) {
    if (from === 'item') {
        // console.log('moveCardGraveyard called for item ', player, key);
        player.grave[key] = player.item[key];
        delete player.item[key];
    } else {
        // console.log('moveCardGraveyard called ', player, key);
        player.grave[key] = player.hand[key];
        delete player.hand[key];
    }
}

/**
 * function that damage the player
 * @param {object} player - active player chosen
 * @param {object} points - points of damage
 * @returns {object} current health of the player minus points of damage
 */
function damagePlayer(player, points) {
    // console.log('damagePlayer');
    player.health.current -= points;
}

/**
 * function that creates an attack to the shield
 * @param {object} player - active player chosen
 * @param {object} itemKey  - key of the card chosen
 * @param {object} points - points of damage
 * @returns {function} if statement to assign points to the card in player's item minus points of damage
 * if condition - points of the card in player's item > points of damage is true
 * if condition - points of the card in player's item === points of damage is true, then card from item moves to graveyard
 * in other cases ( points of the card in player's item < points of damage) function to damage player is called 
 * and then function to move card from item to graveyard is called
 */
function attackShield(player, itemKey, points) {
    // console.log('attackShield');
    if (player.item[itemKey].points > points) {
        // console.log('item > points');
        player.item[itemKey].points -= points;
    } else if (player.item[itemKey].points === points) {
        // console.log('item == points');
        moveCardGraveyard(player, itemKey, 'item');
    } else {
        // console.log('item < points');
        damagePlayer(player, points - player.item[itemKey].points);
        moveCardGraveyard(player, itemKey, 'item');
    }
}

/**
 * function to attack opponent - inactive player
 *
 * @param {object} player - inactive player
 * @param {object} points - points of damage
 * @returns {object} category of item
 * @returns {function} method Object.keys that creates array from cards in player's item andassigns 1st card as itemKey constant
 * @returns {function} that assigns category of 1st card in item to constant itemCategory if there is such card, otherwise it is null
 * @returns {function} if statement to assign current health of the player minus damage points
 * if condition - length of the item === 0 and category of the card in item is not 'shield' is true
 * but if current health is less or equal 0 then player's current health = 0
 * in other cases where condition - length of the item === 1 and category of the card in item is equal to 'shield' is true
 * then function attackShield is called with paramters: player - inactive player, itemKey -key of the card chosen, points - damage points
 *  */
function attackOpponent(player, points) {
    // console.log('attackOpponent ', player, points);
    let itemCategory;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? itemCategory = player.item[itemKey].category : null;
    if (Object.keys(player.item).length === 0 || itemCategory !== 'shield') {
        player.health.current -= points;
        if (player.health.current <= 0) {
            player.health.current = 0;
        }
    } else if (Object.keys(player.item).length === 1 && itemCategory === 'shield') {
        // console.log('Were in attack shield');
        attackShield(player, itemKey, points);
    }
}

/**
 * function to heal the active player with heal ponts of his active chosed card
 *  @param {object} player - active player
 * @param {object} points - heal points
 * @returns {function} if statement to assign current health of the player = maximum health of the player
 * if condition - current health of the player + heal points > maximum health of the player is true
 * in other cases current health of the player is increased for heal points
 */
function healPlayer(player, points) {
    // console.log('healPlayer');
    if (player.health.current + points > player.health.maximum) {
        player.health.current = player.health.maximum;
    } else {
        player.health.current += points;
    }
}

// function moveItemGraveyard(player) {
//     const key = Object.keys(player.item)[0];
//     if (key !== undefined) {
//         player.grave[key] = player.item[key];
//         delete player.item[key];
//     }
// }

/**
 * function to move chosen card from item of the player
 *
 * @param {object} player - active player
 * @param {object} key - key of the chosen active card
 * @returns {object} key of the card in item = key of the chosen active card from player's hand
 * @returns {statement} delete statement is used to delete active card from player's hand by its key
 */
// we move item card from active player's hand to his item holder
function moveItem(player, key) {
    // active player's item get the active card's key from his hand
    player.item[key] = player.hand[key];
    // we delete the card with active key from player's hand
    delete player.hand[key];
}

/**
 * function that help player to act in the game
 * @param {object} game - our game
 * @param {object} player - active player
 * @param {object} opponent - inactive player
 * @param {object} active - chosen card
 * @param {object} target - where player wants to move the card to
 * @returns {object} constant activeCard equals to the chosen card in active player's hand
 * @returns {function} if statement that runs moveCardGraveyard function
 * with parameters: player - active player, active- chosen card, 'item' as target
 * if conditions: 1)  target === 'graveyard' and 2) chosen card key belongs to active player's item are true
 * if condition 1)  target === 'graveyard' is true only then it runs moveCardGraveyard function
 * with parameters: player - active player, active- chosen card,
 * if condition target === 'hero' is true then it activates switch with parameter - category of active card
 * and run case 'heal' - that executes healPlayer function with parameters: active player and points of heal card
 * plus function moveCardGraveyard with parameters player - active player and  active -key of chosen card
 * in case of attack switch breaks by deaffault ( very rare cases - a mistake happens) it returns error message
 * if target === 'opponent' is true then it runs if where type of chosen card === 'action' 
 * then it executes switch by category of the chosen card
 * in case of 'heal' it breaks
 * in case of 'attack' it attacks Opponent and then delete attacking card by key
 * and if opponent's current health === 0 then game phase is Over
 * and finally if any mistake occurs during game process, player gets error message by default
 * if conditions: 
 */
// function that allows active player to move his card from hand to misc. targets
function playerActs(game, player, opponent, active, target) {
    // console.log('playerActs called');
    const activeCard = player.hand[active];
    // If the key for the second card is graveyard
    // We send the card that has key1 to graveyard
    if (target === 'graveyard') {
        // if active card is in item holder
        if (Object.keys(player.item)[0] === active) {
            // We move active card from item holder to graveyard
            moveCardGraveyard(player, active, 'item');
        } else {
            // In other cases we move active card from hand to Graveyard
            moveCardGraveyard(player, active);
        }
    }
    // if target is active player's hero, player can only heal his hero
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (target === 'hero') {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                healPlayer(player, activeCard.points);
                moveCardGraveyard(player, active);
                break;
            case 'attack':
                break;
            // if any mistake occurs during game process, player gets error message by default
            default:
                return new Error('You are under spell. Wait for redemption!');
            }
        }
    }
    // if target is inactive player's hero - opponent, player can only attack opponent
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (target === 'opponent') {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                break;
            case 'attack':
                // console.log('attacking opponent');
                attackOpponent(opponent, activeCard.points);
                moveCardGraveyard(player, active);
                if (opponent.health.current <= 0) {
                    game.phase = 'OVER';
                }
                break;
                // if any mistake occurs during game process, player gets error message by default
            default:
                return new Error('You are under spell. Wait for redemption!');
            }
        }
    }
    if (target === 'item' && activeCard.type === 'item') {
        // console.log('We are in move item case');
        moveItem(player, active);
    }
    // after each move we increase active player's counter for 1
    player.moveCounter += 1;
    // once active player's counter ==2 we call function to give cards to players up to 5
    if (player.moveCounter === 2) {
        // console.log(game);
        giveCardsTo(player);
        // active player becomes inactive once active player's counter ==2
        player.active = false;
        // inactive player becomes active once active player's counter ==2
        opponent.active = true;
        // we check if there is special water cards in item holder of players
        // and run function water if any
        waterCard(game.players);
    }
    // we return the whole game to continue
    return game;
}

function makeMove(game, msg) {
    // console.log('makeMove called');
    let pActive;
    let pInactive;
    game.players.forEach((p) => {
        if (p.active) {
            pActive = p;
        } else {
            pInactive = p;
        }
    });

    // We expect the first card is always the selected card that acts
    if (pActive.moveCounter < 2) {
        game = playerActs(game, pActive, pInactive, msg.activeCard, msg.target);

        // switch (msg.category) {
        // case 'graveyard':
        //     moveHandGraveyard(pActive, msg.key);
        //     break;
        //
        // case 'heal':
        //     if (pActive.health.current < pActive.health.maximum) {
        //         pActive.health.current += pActive.hand[msg.key].points;
        //     } else {
        //         pActive.health.current = pActive.health.maximum;
        //     }
        //     moveHandGraveyard(pActive, msg.key);
        //     // p.grave[msg.key].points == 0;
        //     break;
        // // eslint-disable-next-line no-case-declarations
        // case 'attack':
        //     const itemInactive = Object.values(pInactive.item)[0];
        //     if ((itemInactive === undefined) || (itemInactive.category !== 'defense')) {
        //         if (pInactive.health.current > points) {
        //             pInactive.health.current -= pActive.hand[msg.key].points;
        //         } else {
        //             pInactive.health.current = 0;
        //         }
        //         moveHandGraveyard(pActive, msg.key);
        //     }
        //     if ((itemInactive !== undefined) && (itemInactive.category === 'defense')) {
        //         const pointsAttack = points - itemInactive.points;
        //         if (pointsAttack >= 0) {
        //             pInactive.health.current -= pointsAttack;
        //             moveItemGraveyard(pInactive, itemInactive);
        //         } else {
        //             itemInactive.points -= points;
        //         }
        //         moveHandGraveyard(pActive, msg.key);
        //     }
        //     break;
        // case 'item':
        //     if (Object.values(pActive.item).length === 0) {
        //         moveItem(pActive, msg.key);
        //     }
        //     break;
        //
        // default:
        //     return new Error('You are under spell. Wait for redemption!');
        // }
    }
    return game;
}

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL': {
        return app.game;
    }
    case 'HEROSELECTED': {
        const heroName = message.hero;
        return Object.assign({}, app.game, generatePlayers(heroName));
    }
    case 'DEALALL': {
        const playersArray = app.game.players;

        return Object.assign({}, app.game, giveCardsToAll(playersArray));
    }
    // All actions have the same action name as they all call the same function
    case 'ACTION': {
        return Object.assign({}, app.game, makeMove(app.game, message));
    }
    default: { return app.game; }
    }
}

exports.handle = handle;
