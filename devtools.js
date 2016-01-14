// -*- coding: utf-8 -*-
function getShipData(ship_id) {
  if (!ship_id) return;
  var api_ship     = JSON.parse(localStorage.api_ship);
  var api_mst_ship = JSON.parse(localStorage.api_mst_ship);

  for (var i = 0; i < api_ship.length; i++) {
    if (api_ship[i].api_id == ship_id) {
      for (var j = 0; j < api_mst_ship.length; j++) {
        if (api_mst_ship[j].api_id == api_ship[i].api_ship_id) {
          return api_mst_ship[j];
        }
      }
    }
  }
}

chrome.devtools.network.onRequestFinished.addListener(function (r) {
  var func = null;
  var api_name = r.request.url.replace(/^http:\/\/[^\/]+\/kcsapi\//, '/');
  if (api_name == r.request.url) return;

  // GET
  if (api_name == '/api_start2') {
    func = function(json) {
      if (!json.api_result) return;
      var ships = new Object;
      ships = json.api_data.api_mst_ship;
      if (!ships) return;
      localStorage.api_mst_ship = JSON.stringify(ships);
    };
  }
  // GET
  else if (api_name == '/api_port/port') {
    func = function(json) {
      if (!json.api_result) return;
      var ships = new Object;
      ships = json.api_data.api_ship;
      if (!ships) return;
      localStorage.api_ship = JSON.stringify(ships);
    }
  }
  // GET
  else if (api_name == '/api_get_member/ndock') {
    func = function(json) {
      if (!json.api_result) return;
      var require = ["access_token", "targets"];
      chrome.storage.sync.get(require, function(data) {
        var access_token = data["access_token"];
        var targets      = data["targets"];
        if (!access_token || !targets) return;
        var ndocks = json.api_data;
        for (var i = 0; i < ndocks.length; i++) {
          var out     = ndocks[i].api_complete_time;
          var out_str = ndocks[i].api_complete_time_str;
          if (!out) continue;
          var ship_id = ndocks[i].api_ship_id;
          var ship    = getShipData(ship_id);
          for (var j = 0; j < targets.length; j++) {
            var info = {when: out};
            var cube  = {
              access_token: access_token,
              target: targets[j],
              title: ship.api_name + "がお風呂からでました.",
              body: '出た時刻:' + out_str
            };
            console.log(cube,info);
            // なぜだろう...
            // chrome.alarms.create(JSON.stringify(cube), info);
            // 動いてないところ
            // chrome.alarms.get(JSON.stringify(cube), function(alarm) {
            //   if (alarm) return;
            //   console.log(cube,date);
            //   chrome.alarms.create(JSON.stringify(cube), date);
            // });
          }
        }
      });
    }
  }

  if (!func) return;
  r.getContent(function(content) {
    if (!content) return;
    var json = JSON.parse(content.replace(/^svdata=/, ''));
    if (!json || !json.api_data) return;
    func(json);
  });
});

