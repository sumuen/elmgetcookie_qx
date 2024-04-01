/*
[rewrite_local]
https://rmt.hhl1916.com/api/gateway/shop/mall/getAd url script-request-header https://raw.githubusercontent.com/sumuen/elmgetcookie_qx/master/1916.js
*/
//脚本目前只能获取并更新一个账号的Authorization
const CookieName = "1916";
const CookieKey = "cookie_1916";
const sy = init();
GetCookie();

function GetCookie() {
  if ($request.headers) {
    var AuthorizationValue = $request.headers["Authorization"];
    var Authorization = sy.setdata(AuthorizationValue, CookieKey);
    sy.msg("1916账号", AuthorizationValue);
  }
}


function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true;
  };
  isQuanX = () => {
    return undefined === this.$task ? false : true;
  };
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key);
    if (isQuanX()) return $prefs.valueForKey(key);
  };
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val);
    if (isQuanX()) return $prefs.setValueForKey(key, val);
  };
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body);
    if (isQuanX()) $notify(title, subtitle, body);
  };
  log = (message) => console.log(message);
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb);
    }
    if (isQuanX()) {
      url.method = "GET";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb);
    }
    if (isQuanX()) {
      url.method = "POST";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  done = (value = {}) => {
    $done(value);
  };
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done };
}
sy.done();
