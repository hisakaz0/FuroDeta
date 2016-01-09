
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name != "access_token") return;
  port.onMessage.addListener(function(msg) {
    if (msg.body != "saved") return;
    window.open(chrome.runtime.getURL('options.html'));
  });
});

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.storage.sync.get('pushbullet', function(data) {
    data['pushbullet']['targets'] = [];
  });
});

// プッシュバレットにﾒｯｾｰｼﾞを送る
chrome.alarms.onAlarm.addListener(function(alarm) {
  var cube = JSON.parse(alarm.name);
  console.log("Alarm Fired! : " + alarm.name);
  sendNoteMessage(cube.access_token, cube.target, cube.title, cube.body);
});

