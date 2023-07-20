if ($response.body) {
    var body = $response.body;
    var savedCookies = $prefs.valueForKey('cookies');
    body = `<!DOCTYPE html><html><body><h1>${savedCookies}<h1></body></html>`;
    $done({body: body});
  }