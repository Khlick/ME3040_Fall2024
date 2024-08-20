const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle new window creation
    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
        event.preventDefault(); // Prevent the default behavior of opening the window
        options.width = mainWindow.getSize()[0]; // Set the width of the new window
        options.height = mainWindow.getSize()[1]; // Set the height of the new window
        event.newGuest = new BrowserWindow(options); // Create the new window with the same size as the main window
        event.newGuest.loadURL(url); // Load the URL in the new window
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

