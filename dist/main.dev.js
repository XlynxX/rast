"use strict";

// Modules to control application life and create native browser window
var _require = require('electron'),
    ipcMain = _require.ipcMain;

var _require2 = require('electron'),
    app = _require2.app,
    BrowserWindow = _require2.BrowserWindow;

var _require3 = require('./src/core/colors/colors'),
    colors = _require3.colors;

var _require4 = require('./src/core/core'),
    RastCore = _require4.RastCore;

var rastCore = new RastCore();

function createWindow() {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  }); // and load the first page of the app.

  if (rastCore.tokenExists) mainWindow.loadFile('src/pages/main/main.html');else mainWindow.loadFile('src/index.html'); // Open the DevTools.
  // mainWindow.webContents.openDevTools()
} // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.whenReady().then(function () {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}); // Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); // In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/* Events */
// this is the event listener that will respond when we will request it in the web page

ipcMain.on('event', function _callee(event, arg) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(colors.FgYellow + "EVENT " + arg.name + colors.Reset);
          _context.next = 3;
          return regeneratorRuntime.awrap(rastCore.processEvent(arg.name, arg.args));

        case 3:
          response = _context.sent;
          event.reply('event-reply', response);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});