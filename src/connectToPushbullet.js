
// function setOauthToPushbulletUri()
var url = 'https://www.pushbullet.com/authorize?';
var params = {
  'client_id': 'iD8u4007YQubhIETdXC9QZWaPTrKrihy',
  'response_type': 'token',
  'redirect_url': chrome.extension.getURL('pages/oauth/redirect.html')
};

for (val in params) {
  url = url + val + '=' + params[val] + '&';
}
url = url.slice(0, -1);

var btn = document.getElementById('connect-to-pushbullet');
btn.setAttribute('href', encodeURI(url));
