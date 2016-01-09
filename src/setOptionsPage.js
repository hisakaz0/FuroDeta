
// initialize
chrome.storage.sync.get("targets", function(data) {
  if (!data["targets"]) return;
  data["targets"] = [];
  chrome.storage.sync.set(data);
});
chrome.storage.sync.get("devices", function(data) {
  if (!data["devices"]) return;
  data["devices"] = [];
  chrome.storage.sync.set(data);
});

chrome.storage.sync.get("devices", function(data) {
  if (data["devices"] == undefined || data["devices"] == '') return;
  console.log(data["devices"]);
  showDeviceList(data["devices"]); // func.js have this
});

chrome.storage.sync.get("targets", function(data) {
  if (data["targets"] == undefined || data["targets"] == '') return;
  checkTargeDevices(data["targets"]);
});


// var inputs = document.getElementsByTagName('input');
// for (var index = 0; index < inputs.length; index++) {
//   inputs[index].addEventListener('change', function () {
//     var input = this;
//     chrome.storage.sync.get("pushbullet", function(data) {
//       if (input.checked == true ) {
//         data['pushbullet']['targets'].push(input.value);
//       } else {
//         var targets = data['pushbullet']['targets'];
//         data['pushbullet']['targets'] = targets.filter(function(id) {
//           return (id != input.value);
//         });
//       }
//       chrome.storage.sync.set(data);
//       chrome.storage.sync.get('pushbullet', function(data) {
//       });
//     });
//   });
// });

var get_devices_btn = document.getElementById('get-device-list');
get_devices_btn.addEventListener('click', function() {
  chrome.storage.sync.get("access_token", function(data) {
    if (data["access_token"] == undefined || data["access_token"] == '') return;
    saveDeviceList(data["access_token"]);
    deleteTargetDevices();
    chrome.storage.sync.get("devices", function(data) {
      if (data["devices"] == undefined || data["devices"] == '') return;
      showDeviceList(data["devices"]);
    });
  });
});

document.getElementById('test').addEventListener('click', function() {
  chrome.storage.sync.get("pushbullet", function(data) {
    var access_token = data['pushbullet']['access_token'];
    var targets      = data['pushbullet']['targets'];
    var body         = 'This is test msg';
    var title        = 'Hello World!';
    for (var index = 0; index < targets.length; index++) {
      var target = targets[index];
      var cube = {
        access_token: access_token,
        target: target,
        title: title,
        body: body
      };
      var taped_cube = JSON.stringify(cube);
      var alarm_info = { when: Date.now() + 120000 };
      chrome.alarms.create(taped_cube, alarm_info);
      // テスト用
      // console.log(cube);
      // console.log(alarm_info);
      // chrome.alarms.getAll(function(alarms) {
      //   console.log(alarms);
      // });
    }
  });
});

// テスト用
// chrome.alarms.onAlarm.addListener(function(alarm) {
//   var cube = JSON.parse(alarm.name);
//   console.log("Alarm Fired! : " + alarm.name);
//   sendNoteMessage(cube.access_token, cube.target, cube.title, cube.body);
// });

