const electron = require('electron');
const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const ctxMenu = require('./src/ctxMenu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const application = require('./backend/application');

function sendMessage(received) {
    win.webContents.send('APP', received);
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1366, height: 768, show: false, icon: path.join(__dirname, 'src/icons/png/64x64.png'),
    });

    // and load the index.html of the app.
    if (process.env.REACT_URL) {
        // dev env
        win.loadURL(process.env.REACT_URL);
        // Open the DevTools.
        win.webContents.openDevTools();
    } else {
        // prod env
        win.loadURL(url.format({
            protocol: 'file:',
            slashes: true,
            pathname: path.join(__dirname, '/build/index.html'),
        }));
    }

    // When we are ready to show - display initial state
    win.once('ready-to-show', () => {
        win.show();

        // Send the message to show the first screen
        application.msgReceived({ type: 'INITIAL' }, sendMessage);
    });

    win.webContents.on('context-menu', (e) => {
        e.preventDefault();
        const temp = ctxMenu(app, win);
        const c = electron.Menu.buildFromTemplate(temp);
        c.popup(win);
    })

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

console.log(app);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('APP', (event, arg) => {
    // Send the request to game engine to get relevant data
    // Give it the sendMessage to send Messages on its own.
    application.msgReceived(arg, sendMessage);
});
