
var access_token = location.href.split('#')[1].split('=')[1];
chrome.storage.sync.get("access_token", function(data) {
  data["access_token"] = access_token;
  chrome.storage.sync.set(data);

  var port = chrome.runtime.connect({name: "access_token"});
  console.log("send msg");
  console.log(port);
  port.postMessage({body: "saved"});
});

