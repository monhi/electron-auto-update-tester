// Electron
const { app, Menu, ipcMain } = require("electron");
const { autoUpdater } 		 = require('electron-updater');
const remoteMain 			 = require("@electron/remote/main");

remoteMain.initialize();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.allowRendererProcessReuse = true;

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      console.log('block');
      //newWindowEvent.preventDefault();
      mainWindow.loadURL(url);
    });
  }
});

app.on("ready", () => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);
  
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });  
  
  remoteMain.enable(mainWindow.webContents);

  // Option 1: Uses Webtag and load a custom html file with external content
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Option 2: Load directly an URL if you don't need interface customization
  //mainWindow.loadURL("https://github.com");

  // Option 3: Uses BrowserView to load an URL
  //const view = require("./src/view");
  //view.createBrowserView(mainWindow);

  // Display Dev Tools
  //mainWindow.openDevTools();

  // Menu (for standard keyboard shortcuts)
  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);
  console.log(`Done`);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
  console.log(`version: ${app.getVersion()}`);
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
  console.log('update-available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
  console.log('update-downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
  console.log('restart_app');
});




