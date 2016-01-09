
chrome.runtime.onMessage.addListener(function(message) {
  console.log(message);
  console.log('get request');
});
