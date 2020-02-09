const electron = require('electron');

function handle() {
    const display = electron.screen.getPrimaryDisplay();
    const displayHeight = display.size.height;
    return displayHeight;
}

exports.handle = handle;
