
// EVENT: save targets list
function saveTargetsListener() {
  var inputs = document.getElementsByClassName('target');
  for (var i = 0; i< inputs.length; i++) {
    inputs[i].addEventListener('change', function () {
      var input = this;
      chrome.storage.sync.get("targets", function(data) {
        if (input.checked == true) {
          data["targets"].push(input.value);
        } else {
          data["targets"] = data["targets"].filter(function(id) {
            return (id != input.value);
          });
        }
        chrome.storage.sync.set(data);
      });
    });
  };
}

// EVENT: save devices list and show devices
var get_devices_btn = document.getElementById('get-device-list');
get_devices_btn.addEventListener('click', function() {
  chrome.storage.sync.get("access_token", function(data) {
    if (data["access_token"] == undefined || data["access_token"] == '') return;
    deleteTargetDevices();
    saveDeviceList(data["access_token"]);
    chrome.storage.sync.get("devices", function(data) {
      if (data["devices"] == undefined || data["devices"] == '') return;
      showDeviceList(data["devices"]);
      saveTargetsListener();
    });
  });
});

// EVENT: send test msg after 5 seconds
var test_btn = document.getElementById('test');
test_btn.addEventListener('click', function() {
  var require = ["access_token", "targets"];
  chrome.storage.sync.get(require, function(data) {
    if (data["access_token"] == undefined || data["access_token"] == '') return;
    if (data["targets"]      == undefined || data["targets"]      == '') return;
    for (var i = 0; i< data["targets"].length; i++) {
      var info = { when: Date.now() + 5000 };
      var cube = {
        access_token: data["access_token"],
        target: data["targets"][i],
        title: "Hello world!",
        body: "From " + info["when"]
      };
      chrome.alarms.create(JSON.stringify(cube), info);
      console.log('add alarm');
      console.log(cube);
      console.log(info);
    }
  });
});


// initialize devices list
chrome.storage.sync.get("devices", function(data) {
  if (data["devices"] == undefined) {
    data["devices"] = [];
    chrome.storage.sync.set(data);
  }
  // initialize targets list
  chrome.storage.sync.get("targets", function(data) {
    if (data["targets"] == undefined) {
      data["targets"] = [];
      chrome.storage.sync.set(data);
    }
    // show device list
    chrome.storage.sync.get("devices", function(data) {
      if (data["devices"] != undefined || data["devices"] != '') {
        showDeviceList(data["devices"]); // func.js have this
      }
      // check target devices
      chrome.storage.sync.get("targets", function(data) {
        if (data["targets"] != undefined || data["targets"] != '') {
          checkTargeDevices(data["targets"]);
        }
        saveTargetsListener();
      });
    });
  });
});
