
function saveDeviceList(access_token) {
  return $.ajax({
    type: 'GET',
    headers: {
      'Access-Token': access_token
    },
    url:  'https://api.pushbullet.com/v2/devices',
    success: function (pushbullet, dataType) {
      chrome.storage.sync.get("devices", function(data) {
        data["devices"] = pushbullet["devices"];
        chrome.storage.sync.set(data);
      });
    }
  });
}

function checkTargeDevices(targets) {
  for (var i = 0; i < targets.length; i++) {
    var el = document.getElementById(targets[i]);
    el.checked = true;
  }
}

function showDeviceList(devices) {
  // remove Device List
  var device_list_wrapper = document.getElementById('device-list-wrapper');
  while (device_list_wrapper.firstChild) {
    device_list_wrapper.removeChild(device_list_wrapper.firstChild);
  }

  // show Device List
  for (var index = 0; index < devices.length; index++) {
    if (!devices[index]['active']) return;
    var item     = document.createElement('li');
    var text     = document.createElement('span');
    var checkbox = document.createElement('input');
    text.innerText = devices[index]['nickname'];
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'target');
    checkbox.setAttribute('id', devices[index]['iden']);
    checkbox.setAttribute('value', devices[index]['iden']);
    item.appendChild(checkbox);
    item.appendChild(text);
    device_list_wrapper.appendChild(item);
  }
}


function sendNoteMessage(access_token, iden, title, body) {
  $.ajax({
    type: "POST",
    headers: {
      'Access-Token': access_token
    },
    url: 'https://api.pushbullet.com/v2/pushes',
    contentType: 'application/json',
    data: '{ "title": "' + title +'", "body": "' + body + '", "device_iden": "' + iden + '", "type": "note" }',
    success: function(data, dataType) {
      console.log(data);
    },
    error: function(a, b, c){
      console.log(a);
    }
  });
}

function deleteTargetDevices() {
  var data = {};
  data["targets"] = [];
  chrome.storage.sync.set(data);
}
