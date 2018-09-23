/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */

const allCharacters = require('./data/characters.json');
const allCards = require('./data/cards.json');


function getRandomUpTo(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

function getRandomBool() {
    const rand = getRandomUpTo(2);
    return rand === 0;
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getCardID(id) {
  var now = new Date();
  /*id = now.getFullYear().toString(); 
  // JS months are 0-based, so +1 and pad with 0's
  id += (now.getFullMonth < 9 ? '0' : '') + now.getFullMonth().toString(); 
  id += (now.getDate < 10 ? '0' : '') + now.getDate().toString();
  id = now.getHours().toString();
  id += now.getMinutes().toString();
  id += now.getSeconds().toString();
  id += now.getMilliseconds().toString(); */
  id += '-' + id.hashCode(id + now.toString());
  
  return id;
}

function assignCards(heroName) {
// const cards = {};
// find all cardTypes for this heroName
    const heroCardTypes = allCharacters[heroName].cards;
    // for each cardType in all CardTypes take count
    const cardsArray = [];

    for (const cardType in heroCardTypes) {
        // take count, create a new card for this type
        for (let i = 0; i < heroCardTypes[cardType].count; i += 1) {
            const newCard = allCards[cardType];
            // cards[newCard.id] = newCard;
            cardsArray.push(newCard);
        }
    }
    const deck = cardsArray.sort(() => Math.random() - 0.5);
    const deckHero = deck.slice(0, 15);
    deckHero.forEach((c) => {
        c.id = getCardID(c.id);
    });
    console.log(deckHero.length);
    return deckHero;
}


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
            p.cards = assignCards(heroName);
            p.health = allCharacters[heroName].health;
            p.playerHand = {};
        }
        if (p.active === false) {
            p.hero = heroSecondName;
            p.cards = assignCards(heroSecondName);
            p.health = allCharacters[heroSecondName].health;
            p.playerHand = {};
        }
    });

    return { players };
};


function giveCardsTo(player) {
    const x = player.playerHand.length >= 0 ? 5 - player.playerHand.length : 5;
    player.playerHand = player.cards.splice(0, x);
    
    return player;
}

function giveCardsToAll(playersArray) {
    playersArray.forEach((p) => {
        giveCardsTo(p);
    });
    return playersArray;
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
    default: { return app.game; }
    }
}

exports.handle = handle;
