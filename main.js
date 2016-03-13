var electron = require('electron'),
    path = require('path'),

    CambioApp = electron.app,
    AppWindow = electron.BrowserWindow,

    /* 
        Keep reference to main App window to prevent 
        automatic garbage collection.
    */
    mainAppWindow = null;


CambioApp.on('window-all-closed', function() {
    CambioApp.quit();
});

CambioApp.on('ready', function() {
    mainAppWindow = new AppWindow({
        width: 1200, 
        height: 1000,
        icon: path.join(__dirname, 'ui/app/images/cambioLogo.png')
    });
    mainAppWindow.loadURL('file://' + __dirname + '/ui/index.html');
    mainAppWindow.webContents.openDevTools();
    mainAppWindow.on('closed', function() {
        mainAppWindow = null;
    });
});