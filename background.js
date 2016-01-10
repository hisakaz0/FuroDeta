
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name != "access_token") return;
  port.onMessage.addListener(function(msg) {
    if (msg.body != "saved") return;
    window.open(chrome.runtime.getURL('options.html'));
  });
});

// プッシュバレットにﾒｯｾｰｼﾞを送る
chrome.alarms.onAlarm.addListener(function(alarm) {
  var cube = JSON.parse(alarm.name);
  console.log(alarm);
  sendNoteMessage(cube.access_token, cube.target, cube.title, cube.body);
});

