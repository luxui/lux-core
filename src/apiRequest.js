/**
 * @module apiRequest
 * @memberof lux
 */

// TODO: document dependecy on whatwg-fetch so it can be included by
// implmentors and not bundled in with core-lux
import 'whatwg-fetch';

import model from './responseModel';
import storage from './storage';

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
 * @param  {String} [URI='/'] - The URI of the resource to retrieve.
 * @param  {Object} [options={}] - Additional options for the request; this
 * object is transparently (mostly) passed to the fetch API. Augmentations:
 *
 *   1. HTTP methods are upper-cased
 *   2. Request body is stringified
 *   3. A sesion token is added to `headers.authorization`
 *
 * @return {Promise} - The returned Promise object will have the resulting json
 * response resolved so that callers will not need to repeatedly call
 * `.then(response => response.json())`.
 *
 * @example
 * apiRequest('http://example.com/')
 *   .then(response => doSomethingWith(response));
 *
 * @example
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
    .then(response => response.json())
    .then(model);
}

function retryFactory(URI, options) {
  function retry(resp) {
    // the request returned with "unauthorized" and an authToken is stored;
    // try again without the authToken to try and show a non-error-page
    if (resp && +resp.status === 403 && options.headers.authorization) {
      delete options.headers.authorization;

      return fetch(URI, options)
        .then((response) => {
          // reset the authToken only if a retry succeeds without it
          storage({ reset: 'authToken' });

          return response;
        });
    }

    // return the "error" resp
    return resp;
  }

  return retry;
}

export default apiRequest;
