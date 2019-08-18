const screen = {
    STARTSCREEN: 'STARTSCREEN',
    PROFILE: 'PROFILE',
    PLAY: 'PLAY',
    NETWORKPLAY: 'NETWORKPLAY',
    HEROSELECT: 'HEROSELECT',
    HEROSELECTED: 'HEROSELECTED',
    VERSUS: 'VERSUS',
    GAMESCREEN: 'GAMESCREEN',
    OVER: 'OVER',
};

const message = {
    STARTSCREEN: 'STARTSCREEN',
    PROFILE: 'PROFILE',
    PLAY: 'PLAY',
    NETWORKPLAY: 'NETWORKPLAY',
    INIT: 'INIT',
    DEALALL: 'DEALALL',
    ACTION: 'ACTION',
    HEROSELECTED: 'HEROSELECTED',
};

const phase = {
    ACTIVE: 'ACTIVE',
    OVER: 'OVER',
};

const card = {
    ACTIONCARD: 'action',
    ITEMCARD: 'item',
    ATTACKCATEGORY: 'attack',
    ITEMCATEGORY: 'item',
};

const target = {
    HERO: 'hero',
    OPPONENT: 'opponent',
    GRAVE: 'graveyard',
    ITEMOPPONENT: 'itemOpponent',
    ITEMCARD: 'item',
};

module.exports = {
    screen, message, phase, card, target,
};
