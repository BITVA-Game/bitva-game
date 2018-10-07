const dialog = require('electron').dialog;
// const shortcutsMsg = require('./')

const about = {
    type: 'info',
    title: 'about',
    buttons: ['ok'],
};

const shortcuts = {
    type: 'info',
    title: 'key shortcuts',
    message: '',
    buttons: ['ok'],
};

function showDialog(win, msg) {
    dialog.showMessageBox(win, msg, (m) => {
        console.log(m);
    });
}

module.exports = function menu(app, win) {
    return (
        [{
            label: 'devTools',
            click() {
                win.webContents.openDevTools();
            },
        },
        {
            label: 'shortcuts',
            click() {
                showDialog(shortcuts);
            },
        },
        {
            label: 'about',
            click() {
                about.message = `${app.getName()} ${app.getVersion()}`;
                showDialog(win, about);
            },
        },
        {
            label: 'quit',
            click() {
                win.close();
            },
        }]
    );
};
