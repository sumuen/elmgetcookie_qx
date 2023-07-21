const delay = 3000;
const cookieName = "饿了么";
const cookieKey = "cookie_elem";
const sy = init();
var cookieVal = sy.getdata(cookieKey);
var headerscommon = {
  Cookie: cookieVal,
  host: "restapi.ele.me",
  "User-Agent": "iPhone;3.7.0;14.4;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone11,6;addressid/138164461;hasOCPay/0;appBuild/1017;supportBestPay/0;pv/7.8;apprpd/;ref/JDLTSubMainPageViewController;psq/7;ads/;psn/d40e5d4a33c100e8527f779557c347569b49c304|7;jdv/0|kong|t_1001226363_|jingfen|3bf5372cb9cd445bbb270b8bc9a34f00|1608439066693|1608439068;adk/;app_device/IOS;pap/JA2020_3112531|3.7.0|IOS 14.4;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
};
console.log(cookieVal);
getUserDetail();
function getUserDetail() {
  return new Promise((resolve) => {
    try {
      var url = {
        url: `https://restapi.ele.me/eus/v5/user_detail`,
        headers: headerscommon,
      };
      sy.get(url, (error, response, data) => {
        if (error) {
          console.log("获取用户信息失败: ", error);
          return;
        }
        var obj = JSON.parse(data);
        var username = obj.username;
        console.log(`获取用户信息成功: `, username);
        doNotify();
        sy.done();
        resolve("done");
      });
    } catch (erre) {
      resolve("done");
    }
  });
}

function doNotify() {
  sy.msg("饿了么");
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true;
  };
  isQuanX = () => {
    return undefined === this.$task ? false : true;
  };
  getdata = (key) => {
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
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == "string") options = { url: options };
      options["method"] = "POST";
      $task.fetch(options).then(
        (response) => {
          response["status"] = response.statusCode;
          callback(null, response, response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge()) $httpClient.post(options, callback);
  };
  done = (value = {}) => {
    $done(value);
  };
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done };
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
