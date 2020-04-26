/* eslint-disable default-case */
const { message } = require('../constants');

function switchActive(app) {
    const participants = { ...app.participants };
    const opponent = Object.values(participants).find((p) => p !== app.activeAccount);
    return opponent;
}

function handle(app, msg, process) {
    switch (msg.type) {
    case message.LOGIN:
        return msg.account;
    case message.OPPONENT:
        process({ type: message.JOIN });
        return msg.account;
    case message.SWITCHACTIVE:
        // eslint-disable-next-line no-case-declarations
        const opponent = switchActive(app);
        if (!opponent) {
            process({ type: message.SELECTOPPONENT });
        } else {
            process({ type: message.JOIN });
        }
        return opponent;
    }
    return app.activeAccount;
}

exports.handle = handle;
