
// open options page
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
  sendNoteMessage(cube.access_token, cube.target, cube.title, cube.body);
});


// recieve msg from devtools.js
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name != "kancolle") return;
  port.onMessage.addListener(function(msg) {
    if (msg.api_name == 'ndock') {
      chrome.alarms.create(JSON.stringify(msg.alarm), msg.alarm_info);
    }
    return;
  });
});
