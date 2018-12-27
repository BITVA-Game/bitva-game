const heroes = require('./data/characters.json');
const cards = require('./data/cards.json');

function getCards(heroes) {
	const heroArr = Object.values(heroes);
	const cardsArr = Object.keys(cards);
	heroArr.forEach((h) => {
		for(let i = 0; i < heroArr.length; i += 1) {
			const heroCards = Object.keys(heroArr[i]['cards']);
			console.log(heroCards);
			for(let j = 0; j < heroCards.length;  j += 1) {
				console.log(heroCards[j], cardsArr[j]);
				if(heroCards[j] == cardsArr[j]) {
					heroCards[j] = cardsArr[j];
				}
			}
		}
		console.log(heroCards);
		return heroArr;
	});
}

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.heroSelect;
    case 'PLAY':
    	console.log(getCards(heroes));
        return Object.assign({}, app.heroSelect, heroes);
    case 'HEROSELECTED':
        return Object.assign({});
    default: return app.heroSelect;
    }
}
exports.handle = handle;
