const screen = {
    LOGIN: 'LOGIN',
    STARTSCREEN: 'STARTSCREEN',
    PROFILE: 'PROFILE',
    PLAY: 'PLAY',
    NETWORKPLAY: 'NETWORKPLAY',
    HEROSELECT: 'HEROSELECT',
    HEROSELECTED: 'HEROSELECTED',
    VERSUS: 'VERSUS',
    GAMESCREEN: 'GAMESCREEN',
    OVER: 'OVER',
    VS: 'VS',
    NETWORKSCREEN: 'NETWORKSCREEN',
    SELECTOPPONENT: 'SELECTOPPONENT',
    LOADING: 'LOADING',
    WAITINGSTATE: 'waiting',
    SELECTIONSTATE: 'selection',
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
    SETTINGS: 'SETTINGS',
    QUIT: 'QUIT',
    READACCOUNTS: 'READACCOUNTS',
};

const phase = {
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
    SUPRESSCATEGORY: 'suppress',
    GENERATORCATEGORY: 'generator',
    SHUFFLINGCATEGORY: 'shuffling',
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

const animation = {
    CARDS: 'cards',
    POTION: 'potion',
    BAT: 'bat',
};

const sound = {
    HEARTBEAT: 'heartBeat',
    HEARTBEATFAST: 'heartBeatFast',
    CARD: 'card',
    BIRDS: 'birds',
    CARDSFROMGRAVE: 'cardsFromGrave',
    ATTACKOPPONENT: 'attackOpponent',
};

const dragging = {
    DRAGMODE: 'drag',
    CLICKMODE: 'click',
    FROMITEMFRAME: 'itemFrame',
};

const role = {
    HOST: 'host',
    CLIENT: 'client',
    GUEST: 'guest',
};


module.exports = {
    screen,
    message,
    phase,
    card,
    target,
    styles,
    action,
    animation,
    sound,
    dragging,
    role,
};
