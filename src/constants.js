const screen = {
    GAMESCREEN: 'GAMESCREEN',
    HEROSELECT: 'HEROSELECT',
    HEROSELECTED: 'HEROSELECTED',
    LOADING: 'LOADING',
    LOGIN: 'LOGIN',
    NETWORKPLAY: 'NETWORKPLAY',
    NETWORKSCREEN: 'NETWORKSCREEN',
    OVER: 'OVER',
    PLAY: 'PLAY',
    PROFILE: 'PROFILE',
    SELECTOPPONENT: 'SELECTOPPONENT',
    SELECTIONSTATE: 'selection',
    STARTSCREEN: 'STARTSCREEN',
    VERSUS: 'VERSUS',
    VS: 'VS',
    WAITINGSTATE: 'waiting',
    SETTINGS: 'SETTINGS',
};

const message = {
    ACTION: 'ACTION',
    CHANGEVOLUME: 'CHANGEVOLUME',
    CREATEACC: 'CREATEACC',
    DEALALL: 'DEALALL',
    DELETEACC: 'DELETEACC',
    HEROSELECTED: 'HEROSELECTED',
    INIT: 'INIT',
    LOCALPLAY: 'LOCALPLAY',
    LOGIN: 'LOGIN',
    NETWORKPLAY: 'NETWORKPLAY',
    NETWORKSCREEN: 'NETWORKSCREEN',
    OPPONENT: 'OPPONENT',
    PLAY: 'PLAY',
    PROFILE: 'PROFILE',
    QUIT: 'QUIT',
    READACCOUNTS: 'READACCOUNTS',
    SETTINGS: 'SETTINGS',
    START: 'START',
    STARTSCREEN: 'STARTSCREEN',
    TOGGLESOUND: 'TOGGLESOUND',
};

const phase = {
    ACTIVE: 'ACTIVE',
    OVER: 'OVER',
};

const card = {
    ACTIONCARD: 'action',
    ATTACKCATEGORY: 'attack',
    ATTACKITEMCATEGORY: 'attackItems',
    ATTACKITEMSCATEGORY: 'attackItems',
    BOWARROWCARD: 'bowArrow',
    DAMAGECATEGORY: 'damage',
    GENERATORCATEGORY: 'generator',
    HEALCATEGORY: 'heal',
    HOLDCARDCATEGORY: 'holdCard',
    HOLDTURNCATEGORY: 'holdTurn',
    ITEMCARD: 'item',
    ITEMCATEGORY: 'item',
    ITEMINACTIVE: 'itemInactive',
    MAGICMIRRORCARD: 'magicMirror',
    MAGICTREECARD: 'magicTree',
    MALACHITEBOXCARD: 'malachiteBox',
    MUSHROOMCARD: 'mushroom',
    OVENCARD: 'oven',
    PANICCATEGORY: 'panic',
    PLATEMAILCARD: 'plateMail',
    REFLECTCATEGORY: 'reflect',
    SHIELDCARD: 'shield',
    SHIELDCATEGORY: 'shield',
    SHOWCARDSCATEGORY: 'showCards',
    SHUFFLINGCATEGORY: 'shuffling',
    SUPRESSCATEGORY: 'suppress',
    TURNINGCATEGORY: 'turning',
    WATERLIVINGCARD: 'waterLiving',
    WATERDEADCARD: 'waterDead',
};

const target = {
    GRAVE: 'graveyard',
    HERO: 'hero',
    ITEMOPPONENT: 'itemOpponent',
    ITEMCARD: 'item',
    OPPONENT: 'opponent',
};

const action = {
    ATTACKITEMS: 'attackItems',
    ATTACKITEMOPPONENT: 'attackItemOpponent',
    ATACKOPPONENT: 'attackOpponent',
    CHAINS: 'chains',
    CLAIRVOYANCE: 'clairvoyance',
    GRAVEYARD: 'graveyard',
    HEAL: 'heal',
    ITEM: 'item',
    TURNINGPOTION: 'turningPotion',
};

const styles = {
    BOTTOM: 'bottom',
    TOP: 'top',
};

const animation = {
    BAT: 'bat',
    CARDS: 'cards',
    POTION: 'potion',
};

const sound = {
    ATTACKITEMS: 'attackItems',
    ATTACKOPPONENT: 'attackOpponent',
    HEARTBEAT: 'heartBeat',
    HEARTBEATFAST: 'heartBeatFast',
    HEARTBEATSINGLE: 'heartBeatSingle',
    BIRDS: 'birds',
    CARD: 'card',
    CARDSFROMGRAVE: 'cardsFromGrave',
    CHAINS: 'chains',
    CLICK: 'click',
    GRAVEYARD: 'graveyard',
};

const dragging = {
    CLICKMODE: 'click',
    DRAGMODE: 'drag',
    FROMITEMFRAME: 'itemFrame',
};

const role = {
    CLIENT: 'client',
    GUEST: 'guest',
    HOST: 'host',
};

module.exports = {
    action,
    animation,
    card,
    dragging,
    message,
    phase,
    role,
    screen,
    sound,
    styles,
    target,
};
