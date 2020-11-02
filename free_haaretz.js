
// Reference: https://support.google.com/webmasters/answer/1061943?hl=en
var USER_AGENTS = {
  DESKTOP: 'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  MOBILE: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
};

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url_parts = details.url.split('?');
    if (url_parts[1]) {
      return {
        redirectUrl: url_parts[0]
      }
    }
  },
  {
    urls: [
      '*://*.haaretz.co.il/*',
      '*://*.haaretz.com/*',
      '*://*.themarker.com/*',
    ]
  },
  [
    'blocking',
  ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name.toLowerCase() === 'user-agent') {
        if (typeof window.orientation !== 'undefined') {
          details.requestHeaders[i].value = USER_AGENTS.MOBILE;
        } else {
          details.requestHeaders[i].value = USER_AGENTS.DESKTOP;
        }
        break;
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  },
  {
    urls: [
      '*://*.haaretz.co.il/*',
      '*://*.haaretz.com/*',
      '*://*.themarker.com/*',
    ]
  },
  [
    'blocking',
    'requestHeaders'
  ]
);


