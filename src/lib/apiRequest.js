/**
 * @module lib/apiRequest
 * @memberof lux-lib
 */

import herald from './herald';

import { handler as responseModelRequestHandler } from './responseModel';
import storage from './storage';

const responseProperties = [
  'bodyUsed',
  'headers',
  'ok',
  'redirected',
  'status',
  'statusText',
  'type',
  'url',
];

// Make Response properties available beyond Promise-chain; after .json().
function resolvedResponse(response) {
  function format(body) {

    return {
      body,
      ...responseProperties
        .reduce(props, {}),
    };
  }

  function props(acc, prop) {
    acc[prop] = response[prop];

    return acc;
  }

  return response.json()
    .then(format);
}

/**
 * The API Client (`apiRequest`) provides a simple and consistent interface for
 * making requests to the API. All arguments are optional and will use "sane"
 * defaults; as indicated below. This function is an abstraction of the fetch
 * API with one addition, adding the `authorization` header value for supplying
 * a session token for each request.
 *
 * A single simple retry logic is employed where if a request results in an 403
 * error from the server the request will be retried if the first request
 * included a session token.
 *
 * #NOTE: `apiRequest()` relies on the fetch API to be globally available; if
 * needed make sure to polyfill with `whatwg-fetch`.
 *
 * @param  {string} [URI='/'] - The URI of the resource to retrieve.
 * @param  {object} [options={}] - Additional options for the request; this
 * object is transparently (mostly) passed to the fetch API. Augmentations:
 *
 *   1. HTTP methods are upper-cased
 *   2. Request body is stringified
 *   3. A sesion token is added to `headers.authorization`
 *
 * @return {promise} - The returned Promise object will have the resulting json
 * response resolved so that callers will not need to repeatedly call
 * `.then(response => response.json())`.
 *
 * @example
 * import apiRequest from './apiRequest';
 *
 * apiRequest('http://example.com/')
 *   .then(response => doSomethingWith(response));
 *
 * @example
 * import apiRequest from './apiRequest';
 *
 * const options = {
 *   body: {property: 'Update'},
 *   method: 'POST',
 * };
 *
 * apiRequest('http://example.com/rest/resource', options)
 *   .then(response => doSomethingWith(response));
 */
function apiRequest(URI = '/', options = {}) {
  options.method = (options.method || 'GET').toUpperCase();

  const authToken = storage('authToken');

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  /* istanbul ignore else */
  if (!options.headers) {
    options.headers = {};
  }

  if (authToken) {
    options.headers.authorization = authToken;
  }

  return fetch(URI, options)
    .then(retryFactory(URI, options))
    .then(resolvedResponse)
    .then(responseModelRequestHandler);
}

function retryFactory(URI, options) {
  function retry(firstResponse) {
    const retryConditions =
      // the request returned with 403 "unauthorized"
      +firstResponse.status === 403 &&
      // and an authToken was included in the request
      options.headers.authorization;

    // try again without the authorization header;
    // to try and render a non-error-page
    if (retryConditions) {
      delete options.headers.authorization;

      return fetch(URI, options)
        .then((secondResponse) => {
          herald('logout');

          return secondResponse;
        });
    }

    // return the "error" response
    return firstResponse;
  }

  return retry;
}

export default apiRequest;
