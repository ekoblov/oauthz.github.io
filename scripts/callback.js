'use strict';

/**
 * OAuth2 callback that receives authorization code and posts it to the
 * parent window.
 */
function authorizeCallback() {
  var queryParams = parseParams(window.location.search.substring(1));
  if (!queryParams.orig_url || queryParams.orig_url == 'post_message') {
    window.opener.postMessage(queryParams.code, '*');
    window.close();
  } else if (queryParams.orig_url == 'urn:ietf:wg:oauth:2.0:oob') {
    // Manual copy/paste
    document.body.innerHTML = 'Please copy this code, ' +
        'switch to your application and paste it there:<br>' +
        '<input id="code" type="text" readonly="readonly" value="' +
        queryParams.code + '" style="width:300px" ' +
        'onclick="this.focus();this.select();">';
  } else {
    var callbackUrl = queryParams.orig_url + '?code=' + queryParams.code;
    window.location.href = callbackUrl;
  }
}

authorizeCallback();
