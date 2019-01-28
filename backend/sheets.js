const gsjson = require('google-spreadsheet-to-json');
const fs = require('fs');

async function formatOriginalCards() {
    const cards = {};
    const cardsOrigin = await gsjson({
        spreadsheetId: '1o5JJRR8JY0TCUzoRR81ghhrhUhdDjTV81ANWCxTKgBA',
        worksheet: 'Cards'
    });

    const cardsUpdated = {};

    cardsOrigin.forEach((c) => {
        const name = c.id;
        cardsUpdated[name] = {};
        cardsUpdated[name].id = c.id;
        cardsUpdated[name].name = c.nameEn;
        cardsUpdated[name].type = c.typeEn;
        cardsUpdated[name].category = c.category;
        cardsUpdated[name].info = c.infoEn;
        cardsUpdated[name].description = c.descriptionEn;
        cardsUpdated[name].points = c.points;
        cardsUpdated[name].img = c.image;
        cards[name] = cardsUpdated[name];
    });

    return cards;
}

async function getCardsFor(name) {
    console.log(`Cards_${name}`);
    const cardsOrigin = await gsjson({
        spreadsheetId: '1o5JJRR8JY0TCUzoRR81ghhrhUhdDjTV81ANWCxTKgBA',
        worksheet: `Cards_${name}`,
    });
    const cards = {};

    cardsOrigin.forEach((c) => {
        const cardName = c.id;
        cards[cardName] = {};
        cards[cardName].id = c.id;
        cards[cardName].count = c.count;
    });
    return cards;
}

async function formatOriginalCharacters() {
    const charactersOrigin = await gsjson({
        spreadsheetId: '1o5JJRR8JY0TCUzoRR81ghhrhUhdDjTV81ANWCxTKgBA',
        worksheet: 'Heroes',
    });
    const characters = {};

    for (const c of charactersOrigin) {
        const name = c.id;
        characters[name] = {};
        characters[name].id = c.id;
        characters[name].name = c.nameEn;
        characters[name].description = c.descriptionEn;
        characters[name].health = c.health;
        characters[name].cardsNumber = c.cards;
        characters[name].img = c.image;
        characters[name].cards = await getCardsFor(name);
    }
    return characters;
}


async function getAllCards() {
    const cards = await formatOriginalCards();
    console.log('Getting all cards');
    fs.writeFileSync(__dirname+'/data/cards.json', JSON.stringify(cards), 'utf8', function write(err) {
        if(err){ throw err };
    });
    console.log("CARDS file has been saved.");

    const characters = await formatOriginalCharacters();
    console.log('Getting all characters');
    fs.writeFileSync(__dirname+'/data/characters.json', JSON.stringify(characters), 'utf8', function write(err) {
      if(err){ throw err };
    });

    console.log("CHARACTERS file has been saved.");
}




getAllCards();
//exports.getAllCards = getAllCards;
;