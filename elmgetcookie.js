/*
[rewrite_local]
https://h5.ele.me/crossdomainstorage.html url script-request-header https://raw.githubusercontent.com/sumuen/elmgetcookie_qx/master/elmgetcookie.js
*/
//脚本目前只能获取并更新一个账号的cookie，多账号的话，可以通过定义CookieKey2，CookieKey3...CookieKeyN来实现，并且
const CookieName = "饿了么";
const CookieKey = "cookie_elem";
// const UserId = "user_id_elem";
// const matchid = /USERID=(\d+);/;
const sy = init();
GetCookie();

function GetCookie() {
  if ($request.headers) {
    var CookieValue = $request.headers["Cookie"];
    var sidMatch = CookieValue.match(/SID=[^;]*/);
    var cookie2Match = CookieValue.match(/cookie2=[^;]*/);
    var finalcookie = "";
    var name = "";
    if (sidMatch != null) {
      finalcookie = sidMatch[0] + ";";
    } else {
      sy.msg("写入" + CookieName + "Cookie失败‼️" + "缺少sid", "", "");
    }
    if (cookie2Match != null) {
      finalcookie = finalcookie + cookie2Match[0] + ";";
    } else {
      sy.msg("写入" + CookieName + "Cookie失败‼️" + "缺少cookie2", "", "");
    }
    var cookie = sy.setdata(finalcookie, CookieKey);
    sy.msg("Cookie成功🎉，开始查询用户名", "", "");
    getUserDetail(finalcookie, CookieName)
      .then((name) => {
        // 在这里处理用户名
        sy.msg("elm账号" + name + "刷新Cookie成功🎉", "", "");
      })
      .catch((err) => {
        sy.msg("getUserDetail失败", "", "");
      });
  }
}
function getUserDetail(finalcookie, cookieName) {
  // 添加参数finalcookie和cookieName
  return new Promise((resolve) => {
    try {
      var url = {
        url: `https://restapi.ele.me/eus/v5/user_detail`,
        headers: {
          Cookie: finalcookie,
          "user-agent":
            "iPhone;3.7.0;14.4;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone11,6;addressid/138164461;hasOCPay/0;appBuild/1017;supportBestPay/0;pv/7.8;apprpd/;ref/JDLTSubMainPageViewController;psq/7;ads/;psn/d40e5d4a33c100e8527f779557c347569b49c304|7;jdv/0|kong|t_1001226363_|jingfen|3bf5372cb9cd445bbb270b8bc9a34f00|1608439066693|1608439068;adk/;app_device/IOS;pap/JA2020_3112531|3.7.0|IOS 14.4;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
          host: "restapi.ele.me",
          Connection: "close",
        },
      };
      sy.get(url, (error, response, data) => {
        // 使用sy.get发送GET请求
        var obj = JSON.parse(data);
        if (response.status == 200) {
          // 处理返回的用户信息
          var username = obj.username;
          sy.msg(username, "", "");
          sy.msg(`获取用户信息成功: `, obj);
          resolve(obj.username); // 解析用户名
        } else {
          // 处理错误状态
          sy.msg(`获取用户信息失败，状态码: `, response.status);
          reject(`获取用户信息失败，状态码: ${response.status}`);
        }
      });
    } catch (err) {
      sy.msg(`Error: ${err}`);
      reject(err); // 当捕获到错误时，reject这个Promise
    }
  });
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
