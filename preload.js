const { BrowserWindow } = require("@electron/remote");
const { ipcRenderer } 	= require('electron');



/*



*/

window.addEventListener("DOMContentLoaded", () => {
  // Print function add new contents
  ipcRenderer.send('app_version');
  
	const version = document.getElementById('version');
	const notification = document.getElementById('notification');
	const message = document.getElementById('message');
	const restartButton = document.getElementById('restart-button');


	ipcRenderer.on('app_version', (event, arg) => {
	  ipcRenderer.removeAllListeners('app_version');
	  version.innerText = 'Version ' + arg.version;	  
	});  
  
	ipcRenderer.on('app_version', (event, arg) => {
	  ipcRenderer.removeAllListeners('app_version');
	  version.innerText = 'Version ' + arg.version;
	});



	ipcRenderer.on('update_available', () => {
	  ipcRenderer.removeAllListeners('update_available');
	  message.innerText = 'A new update is available. Downloading now...';
	  notification.classList.remove('hidden');
	});

	ipcRenderer.on('update_downloaded', () => {
	  ipcRenderer.removeAllListeners('update_downloaded');
	  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
	  restartButton.classList.remove('hidden');
	  notification.classList.remove('hidden');
	});

	function closeNotification() 
	{
	  notification.classList.add('hidden');
	}
		
	function restartApp() 
	{
	  ipcRenderer.send('restart_app');
	}  
  
  document.getElementById("print_button").addEventListener("click", () => {
		const url = document.querySelector("webview").getAttribute("src");
		let printWindow = new BrowserWindow({ "auto-hide-menu-bar": true });
		printWindow.loadURL(url);
		printWindow.webContents.on("did-finish-load", () => {
		printWindow.webContents.print();
    });
  });
});
