const dialog = require('electron').dialog;
const fs = require('fs');

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

function showDialog(win, msg, e) {
    dialog.showMessageBox(win, msg, e.x, e.y, (m) => {
        console.log(m);
    });
}

module.exports = function menu(app, win, e) {
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
                shortcuts.message = fs.readFileSync(`${app.getAppPath()}/src/shortcuts`).toString();
                showDialog(win, shortcuts, e);
            },
        },
        {
            label: 'inspect element',
            click() {
                console.log(e);
                win.webContents.inspectElement(e.x, e.y);
            },
        },
        {
            label: 'reload',
            click() {
                console.log(e);
                win.reload();
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
