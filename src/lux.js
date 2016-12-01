import apiRequest from './apiRequest';
import { isString } from './lib/is';
import luxPath from './luxPath';
import responseModelHandler, { responseModelFormat } from './responseModel';

let api;
const errorInvalidConfig = new Error('Lux must be configured before routing.');
const errorInvalidPath = new Error('Paths must be strings.');
const format = responseModelFormat;

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
function luxCore(path) {
  let pending;

  if (!api) {
    pending = new Promise(resolve =>
      resolve(format({}, errorInvalidConfig)));
  } else if (!path || isString(path)) {
    pending = apiRequest(api + luxPath(path))
      .then(responseModelHandler);
  } else {
    pending = new Promise(resolve =>
      resolve(format({}, errorInvalidPath)));
  }

  return pending;
}

function setAPI(apiRoot) {
  if (isString(apiRoot)) {
    api = apiRoot;
  } else {
    const type = typeof apiRoot;
    throw new Error(`Attempting to set \`api\` to non-string: ${type}.`);
  }
}

export default luxCore;

export {
  setAPI
};
