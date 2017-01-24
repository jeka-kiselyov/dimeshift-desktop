'use strict';

// import {
//   installNodeHeaders, rebuildNativeModules, shouldRebuildNativeModules
// }
// from 'electron-rebuild';


const electron = require('electron');
const rfr = require('rfr');
const path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

process.env['NODE_ENV'] = 'electron';

var startServer = require('dimeshift');

function initialize() {
  startServer({
    indexFile: 'index.html',
    indexDirectory: path.join(rfr.root, 'resources/')
  }, function(port) {
    createWindow(port);
  });
}

function createWindow(port) {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    "node-integration": false,
    icon: __dirname + "/resources/icon.png"
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:' + port + '?fd');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', initialize);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});