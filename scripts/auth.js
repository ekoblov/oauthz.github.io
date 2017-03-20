'use strict';

/**
 * Starts OAuth2 flow to get authorization code.
 */
function authorize() {
  var AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/auth';
  var params;

  // Extract parameters either from the query string or the hash fragment
  if (window.location.search.length > 1) {
    params = parseParams(window.location.search.substring(1));
  } else {
    params = parseParams(window.location.hash.substring(1));
  }
  if (!params.client_id || !params.scope) {
    console.error('Required OAuth2 params missing');
    return;
  }
  var new_params = {
    client_id: params.client_id,
    scope: params:scope,
    response_type: 'code',
    access_type: 'offline',
    immediate: 'false',
    approval_prompt: 'force'
  };

  var callbackUrl = location.origin + '/callback';
  if (params.redirect_url) {
    callbackUrl = callbackUrl + '?orig_url=' + params.redirect_url;
  }
  new_params.redirect_uri = callbackUrl;

  // Construct the target URL from the remaining parameters.
  var targetUrl = AUTHORIZE_URL + '?' + toQueryString(new_params);

  window.location = targetUrl;
}

authorize();
