const got = require('got');

async function fetchUserDetail() {
  const options = {
    method: 'GET',
    url: 'https://restapi.ele.me/eus/v5/user_detail',
    headers: {
      Cookie: 'SID=MTI0M2E4Nzg2NWM4NzYzYTBlNTJkZjFmMGE3NzdiZGT1kgTFAEkiQGSw57oGiQnD;cookie2=1243a87865c8763a0e52df1f0a777bdd;',
      'user-agent': 'iPhone;3.7.0;14.4;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone11,6;addressid/138164461;hasOCPay/0;appBuild/1017;supportBestPay/0;pv/7.8;apprpd/;ref/JDLTSubMainPageViewController;psq/7;ads/;psn/d40e5d4a33c100e8527f779557c347569b49c304|7;jdv/0|kong|t_1001226363_|jingfen|3bf5372cb9cd445bbb270b8bc9a34f00|1608439066693|1608439068;adk/;app_device/IOS;pap/JA2020_3112531|3.7.0|IOS 14.4;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      host: 'restapi.ele.me',
    
    },
  };

  try {
    const response = await got(options);
    // Response body is accessible via `response.body`
    console.log(response.body);
  } catch (error) {
    console.log(error.response.body);
  }
}

fetchUserDetail();
