// Modules to control application life and create native browser window
const { ipcMain } = require('electron');
const { app, BrowserWindow } = require('electron');
const { colors } = require('./src/core/colors/colors');
const { RastCore } = require('./src/core/core')
const rastCore = new RastCore();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    width: 800,
    height: 600,
    minHeight: 500,
    minWidth: 860,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  

  // and load the first page of the app.
  if (rastCore.tokenExists) mainWindow.loadFile('src/pages/main/main.html');
  else mainWindow.loadFile('src/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/* Events */
// this is the event listener that will respond when we will request it in the web page
ipcMain.on('event', async (event, arg) => {
  console.log(colors.FgYellow + "EVENT " + arg.name + colors.Reset);
  const response = await rastCore.processEvent(arg.name, arg.args);
  event.reply(`event-reply-${arg.name}`, response);
})