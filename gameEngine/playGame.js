const { screen } = require('../constants');

function show(app, activeAccount) {
    return {
        screen: screen.VERSUS,
        ...app,
    };
}

exports.show = show;
