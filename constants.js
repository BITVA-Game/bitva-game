const screen = {
    LOGIN: 'LOGIN',
    STARTSCREEN: 'STARTSCREEN',
    PROFILE: 'PROFILE',
    PLAY: 'PLAY',
    PAIRING: 'PAIRING',
    NETWORKPLAY: 'NETWORKPLAY',
    HEROSELECT: 'HEROSELECT',
    HEROSELECTED: 'HEROSELECTED',
    VERSUS: 'VERSUS',
    GAMESCREEN: 'GAMESCREEN',
    OVER: 'OVER',
    VS: 'VS',
    NETWORKSCREEN: 'NETWORKSCREEN',
    SELECTOPPONENT: 'SELECTOPPONENT',
};

const message = {
    LOGIN: 'LOGIN',
    STARTSCREEN: 'STARTSCREEN',
    PROFILE: 'PROFILE',
    PLAY: 'PLAY',
    NETWORKPLAY: 'NETWORKPLAY',
    LOCALPLAY: 'LOCALPLAY',
    INIT: 'INIT',
    DEALALL: 'DEALALL',
    ACTION: 'ACTION',
    HEROSELECTED: 'HEROSELECTED',
    NETWORKSCREEN: 'NETWORKSCREEN',
    CREATEACC: 'CREATEACC',
    DELETEACC: 'DELETEACC',
    START: 'START',
    OPPONENT: 'OPPONENT',
    JOIN: 'JOIN',
    SWITCHACTIVE: 'SWITCHACTIVE',
};

const phase = {
    SELECTION: 'SELECTION',
    ACTIVE: 'ACTIVE',
    OVER: 'OVER',
};

const card = {
    ACTIONCARD: 'action',
    ITEMCARD: 'item',
    HEALCATEGORY: 'heal',
    DAMAGECATEGORY: 'damage',
    ATTACKCATEGORY: 'attack',
    ATTACKITEMSCATEGORY: 'attackItems',
    ITEMCATEGORY: 'item',
    REFLECTCATEGORY: 'reflect',
    SHIELDCATEGORY: 'shield',
    HOLDCARDCATEGORY: 'holdCard',
    HOLDTURNCATEGORY: 'holdTurn',
    ATTACKITEMCATEGORY: 'attackItems',
    SHOWCARDSCATEGORY: 'showCards',
    TURNINGCATEGORY: 'turning',
    PANICCATEGORY: 'panic',
    ITEMINACTIVE: 'itemInactive',
    MAGICMIRRORCARD: 'magicMirror',
    PLATEMAILCARD: 'plateMail',
    SHIELDCARD: 'shield',
    WATERLIVINGCARD: 'waterLiving',
    WATERDEADCARD: 'waterDead',
    BOWARROWCARD: 'bowArrow',
    MAGICTREECARD: 'magicTree',
    MALACHITEBOXCARD: 'malachiteBox',
    OVENCARD: 'oven',
    MUSHROOMCARD: 'mushroom',
};

const target = {
    HERO: 'hero',
    OPPONENT: 'opponent',
    GRAVE: 'graveyard',
    ITEMOPPONENT: 'itemOpponent',
    ITEMCARD: 'item',
};

const action = {
    HEAL: 'heal',
    ATACKOPPONENT: 'attackOpponent',
    GRAVEYARD: 'graveyard',
    ATTACKITEMOPPONENT: 'attackItemOpponent',
    CHAINS: 'chains',
    ITEM: 'item',
    CLAIRVOYANCE: 'clairvoyance',
    TURNINGPOTION: 'turningPotion',
};

const styles = {
    BOTTOM: 'bottom',
    TOP: 'top',
};

module.exports = {
    screen,
    message,
    phase,
    card,
    target,
    styles,
    action,
};
