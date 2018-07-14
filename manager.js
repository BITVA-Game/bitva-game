const profile = require('./src/data/profile.json');

function msgReceived(arg) {
    console.log('Have profile');
    console.log(arg);
    return profile;
}

exports.msgReceived = msgReceived;
