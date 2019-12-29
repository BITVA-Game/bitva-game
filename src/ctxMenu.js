const electron = require('electron');
const os = require('os');
const fs = require('fs');
const { setApp, getApp } = require('../gameTerminal/application');
const startScreen = require('../gameTerminal/data/app.json');
const morevnaStart = require('../gameTerminal/data/morevnaStart.json');
const selectCharacter = require('../gameTerminal/data/selectCharacter.json');
const hozyaikaStart = require('../gameTerminal/data/hozyaikaStart.json');

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
    dialog.showMessageBox(win, msg, e, (m) => {
        console.log(m);
    });
}

module.exports = function menu(app, win, e, x, y, sendMessage) {
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
                win.webContents.inspectElement(x, y);
            },
        },
        {
            label: 'reload (F5)',
            click() {
                console.log(e);
                win.reload();
            },
        },
        {
            label: 'about',
            click() {
                // const display = electron.screen.getPrimaryDisplay();
                const display = electron.screen.getDisplayNearestPoint({ x, y });
                about.message = `${app.getName()}: ${app.getVersion()}\n`;
                about.message += `chrome: ${process.versions.chrome}\n`;
                about.message += `electron: ${process.versions.electron}\n`;
                about.message += `node.js: ${process.versions.node}\n`;
                about.message += `process id: ${process.pid}\n`;
                about.message += `memory: ${(process.getProcessMemoryInfo().sharedBytes / 1024).toFixed(2)}K\n`;
                about.message += `screen: ${display.size.width}x${display.size.height}\n`;
                about.message += `window: ${win.getSize().join('x')}\n`;
                about.message += `${process.platform}-${process.arch}: ${os.release}`;
                showDialog(win, about, e);
            },
        },
        {
            label: 'to Start Screen',
            click() {
                setApp(startScreen);
                sendMessage(getApp());
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
            label: 'start game with Hozyaika',
            click() {
                console.log('Set app called for Hozyaika');
                // Set backend into correct state for the debug
                const newState = JSON.parse(JSON.stringify(hozyaikaStart));
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
            label: 'quit (F8)',
            click() {
                win.close();
            },
        }]
    );
};
