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
    HEALCATEGORY: 'heal',
    DAMAGECATEGORY: 'damage',
    ATTACKCATEGORY: 'attack',
    ATTACKITEMSCATEGORY: 'attackItems',
    ITEMCATEGORY: 'item',
    REFLECTCATEGORY: 'reflect',
    SHIELDCATEGORY: 'shield',
    HOLDCARDCATEGORY: 'holdCard',
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
};

const target = {
    HERO: 'hero',
    OPPONENT: 'opponent',
    GRAVE: 'graveyard',
    ITEMOPPONENT: 'itemOpponent',
    ITEMCARD: 'item',
};

const styles = {
    BOTTOM: 'bottom',
    TOP: 'top',
};

module.exports = {
    screen, message, phase, card, target, styles,
};
