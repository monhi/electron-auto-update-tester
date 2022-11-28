const { ipcRenderer } = require('electron');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');


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


/*
const version = document.getElementById('version');

ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  version.innerText = 'Version ' + arg.version;
  alert("1233");
});

ipcRenderer.send('app_version');
*/

function closeNotification() 
{
  const notification = document.getElementById('notification');
  notification.classList.add('hidden');  
}
    
function restartApp() 
{
  ipcRenderer.send('restart_app');
}


const getControlsHeight = () => {
  const controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
};

function calculateLayoutSize() {
  const webview = document.querySelector("webview");
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  const controlsHeight = getControlsHeight();
  const webviewHeight = windowHeight - controlsHeight-10;
	alert(webviewHeight);
  webview.style.width = windowWidth + "px";
  webview.style.height = webviewHeight + "px";
}

const homeButton = () => {
  document.querySelector("#home").onclick = () => {
    const home = document.getElementById("webview").getAttribute("data-home");
    document.querySelector("webview").src = home;
  };
};

window.onload = () => {

  calculateLayoutSize();
  homeButton();

};

window.onresize = calculateLayoutSize;
