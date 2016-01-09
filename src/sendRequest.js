
chrome.devtools.network.onRequestFinished.addListener(function (request) {
  chrome.runtime.sendMessage('get request');
  // var api_name = request.request.url.replace(/^http:\/\/[^\/]+\/kcsapi\//, '/');
  // if (api_name == request.request.url) {
  //   return;
  // }

  // var cube = { message: 'get request' };
  // if (api_name == '/api_start2') {
  // }
});

