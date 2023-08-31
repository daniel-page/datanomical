// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Queue } = require('./queue.js')
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const xp = express();
xp.use(bodyParser.json())
xp.use(bodyParser.urlencoded({ extended: false }))
const port = 3000;
const queue = new Queue();

xp.listen(port, () => {
	console.log(`Listening on port ${port}\n`);
})

xp.post('/data_ingest', (req, res) => {
	let data = req.body;
	console.log("Data received ext: " + JSON.stringify(data));
	queue.enqueue(data);
	writeCSVFile(data["name"], data["time"], data["value"]);
	res.sendStatus(200);
})

xp.get('/data_collect', (req, res) => {
	if (Object.keys(queue.items).length > 0) {
		var data = queue.dequeue();
		console.log("Data sent int: " + JSON.stringify(data));
		res.json(data);
	} else {
		res.sendStatus(204);
	}
})

// xp.get('/', (req, res) => {
// 	res.send('Hello World!');
// })

function writeCSVFile(name, time, value) {

	// Create a data directory if it does not already exist
	var dir = './data';
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const content = String(time) + "," + String(value) + "\n";
	fs.writeFile("data/" + name + ".csv", content, { encoding: "utf8", flag: "a" }
		, err => {
			if (err) {
				console.error(err);
			}
			// file written successfully
		});
}