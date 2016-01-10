
chrome.devtools.network.onRequestFinished.addListener(function (r) {
  // refs https://github.com/hkuno9000/KanColle-YPS
  // thank you,hkuno9000 and contributors
  var api_name =  r.request.url.replace(/^http:\/\/[^\/]+\/kcsapi\//, '/');
  if (api_name == r.request.url) return; // カエレ for NOT api request

  var func = null;
  if (api_name == '/api_start2') {
    console.log('start');
    func = function(json) {
      console.log(json);
      if (!json.api_result) return;
      var ship = json.api_data.api_mst_ship;
      chrome.storage.sync.set(ship);
    }
  }
  else if (api_name == '/api_req_nyukyo/start') {
    console.log('bath');
    func = function(json) {
      // var params = decode_postdata_params(r.request.postData.params);
      // if (params.api_highspeed) return; // use バケツ
      var params = r.request.portData.params;
      console.log(params);
      return;
      var require = ["access_token", "targets", "api_mst_ship"];
      chrome.storage.sync.get(require, function(data) {
        if (data["access_token"] == undefined || data["access_token"] == '') return;
        if (data["api_mst_ship"] == undefined || data["api_mst_ship"] == '') return;
        if (data["targets"]      == undefined || data["targets"]      == '') return;
        var ship         = data["api_mst_ship"][params.api_ship_id];
        var access_token = data["access_token"];
        var targets      = data["targets"];
        for (var i = 0; i < targets.length; i++) {
          // var time = { when: . } // 風呂が出る時間
          // var cube = {
          //   access_token: access_token,
          //   target: targets[i],
          //   title: ship.api_name + 'がお風呂から出ました',
          //   body: '入った時刻: ' + json.
          //     + "\n" + '出た時刻: ' + json.
          //     + "\n" + '入浴時間: ' + json.
          // };
          // chrome.alarms.create(JSON.stringify(cube), time);
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

