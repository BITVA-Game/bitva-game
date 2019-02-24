const electron = require('electron');
const os = require('os');
const fs = require('fs');
const { setApp } = require('../backend/application');
const startScreen = require('../backend/data/app.json');
const morevnaStart = require('../backend/data/morevnaStart.json');
const selectCharacter = require('../backend/data/selectCharacter.json');

const dialog = electron.dialog;

const about = {
    type: 'info',
    title: 'about',
    message: '',
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

module.exports = function menu(app, win, e, sendMessage) {
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
                // const display = electron.screen.getPrimaryDisplay();
                const display = electron.screen.getDisplayNearestPoint({ x: e.x, y: e.y });
                about.message = `${app.getName()}:\t${app.getVersion()}\n`;
                about.message += `chrome:\t${process.versions.chrome}\n`;
                about.message += `electron:\t${process.versions.electron}\n`;
                about.message += `node.js:\t\t${process.versions.node}\n`;
                about.message += `process id:\t${process.pid}\n`;
                about.message += `memory:\t${(process.getProcessMemoryInfo().sharedBytes / 1024).toFixed(2)}K\n`;
                about.message += `screen:\t\t${display.size.width}x${display.size.height}\n`;
                about.message += `window:\t${win.getSize().join('x')}\n`;
                about.message += `${process.platform}-${process.arch}:\t${os.release}`;
                showDialog(win, about, e);
            },
        },
        {
            label: 'to Start Screen',
            click() {
                setApp(startScreen);
                sendMessage(startScreen);
            },
        },
        {
            label: 'start game with Morevna',
            click() {
                console.log('Set app called');
                // Set backend into correct state for the debug
                const newState = JSON.parse(JSON.stringify(morevnaStart));
                setApp(newState);
                // Send the game object to frontend
                sendMessage(newState);
            },
        },
        {
            label: 'select character',
            click() {
                const data = JSON.parse(JSON.stringify(selectCharacter));
                setApp(data);
                sendMessage(data);
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
