
chrome.devtools.network.onRequestFinished.addListener(function (r) {
  // refs https://github.com/hkuno9000/KanColle-YPS
  // thank you,hkuno9000 and contributors
  var api_name = r.request.url.replace(/^http:\/\/[^\/]+\/kcsapi\//, '/');
  if (api_name == r.request.url) return; // カエレ for NOT api request

  var func = null;
  if (api_name == '/api_start2') {
    func = function(json) {
      console.log(json);
    }
  }
  else if (api_name == '/api_req_nyukyo/start') {
    // var params = decode_postdata_params(r.request.postData.params);
    // var ship   =
  }
  request.getContent(function(content) {
    if (!content) return;
    var json = JSON.parse(content.replace(/^svdata=/, ''));
    if (!json || !json.api_data) return;
    func(json);
  });
});

