/**
 * @module lux
 */

import apiRequest from './apiRequest';
import { isString } from './lib/is';
import luxPath from './luxPath';
import { responseModelFormat } from './responseModel';

let apiRoot;
const errorInvalidConfig = new Error('Lux must be configured before routing.');
const errorInvalidPath = new Error('Paths must be strings.');
const format = responseModelFormat;

function configRequired() {
  throw new Error('Lux requires an API root URI.');
}

function errorStr(prop, problem) {

  return `Configuration property \`${prop}\` ${problem}.`;
}

/**
 * Lux requires some configuration before routing will be possible; until valid
 * configuration is provided routing will not work.
 *
 * @param  {String} api - The API root URI.
 *
 * @return {Promise} - The first Promise handler will receive the ResponseModel
 * representation of the resource from the API; or an error.
 *
 * @example
 * import { init } from '@luxui/core';
 *
 * init({
 *   api: 'http://example.com',
 * });
 */
function init({ api } = configRequired()) {
  apiRoot = null;

  if (!isString(api)) {
    throw new Error(errorStr('api', 'is not a string'));
  }

  apiRoot = api;
}

/**
 * The `lux` function is for routing to - and retrieving API resource - pages.
 *
 * @param  {LuxPath} path - The route to load. The `path` will default to the
 * current `window.location` if none is provided.
 *
 * @return {Promise}
 *
 * @example
 * import lux from '@luxui/core';
 *
 * // after `init(config)`; start the application.
 * lux();
 *
 * @example
 * import lux from '@luxui/core';
 *
 * // route to the path given; if not already at that path
 * lux('/home');
 */
function lux(path) {
  let pending;

  if (!apiRoot) {
    pending = new Promise(resolve =>
      resolve(format({}, errorInvalidConfig)));
  } else if (!path || isString(path)) {
    pending = apiRequest(apiRoot + luxPath(path));
  } else {
    pending = new Promise(resolve =>
      resolve(format({}, errorInvalidPath)));
  }

  return pending;
}

export default lux;

export {
  init
};
