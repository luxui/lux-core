/**
 * @module lux
 */

import { isString } from './lib/is';
import responseModelHandler, { responseModelFormat } from './responseModel';

import apiRequest from './apiRequest';
import routing from './routing';
import luxPath from './luxPath';
import storage from './storage';

const config = {};
const errorInvalidConfig = new Error('Lux must be configured before routing.');
const errorInvalidPath = new Error('Paths must be strings.');

function configRequired() {
  throw new Error('A configuration object - LuxConfig - is required.');
}

/**
 * Lux requires some configuration before routing will be possible; until valid
 * configuration is provided routing will not work.
 *
 * @param  {String} api - The API root URI.
 * @param  {Function} render - The rendering function which will interpret the
 * API responses and display a UI.
 *
 * @return {Promise} - The resolve function will receive the ResponseModel
 * representation of the resource from the API. The render function will need
 * to be able to build a UI based on that format.
 *
 * @example
 * import { init } from '@luxui/core';
 *
 * init({
 *   api: 'http://example.com',
 *   render: () => {}, // left to the the implementations: ReactJS, Riot, etc.
 * });
 */
function init({ api, initialPath, render } = configRequired()) {
  function errorStr(prop, problem) {

    return `Configuration property \`${prop}\` ${problem}.`;
  }

  config.isValid = false;

  if (!api) {
    throw new Error(errorStr('api', 'not provided in config object'));
  } else if (!isString(api)) {
    throw new Error(errorStr('api', 'is not a string'));
  }

  if (initialPath && !isString(initialPath)) {
    throw new Error(errorStr('initialPath', 'is not a string'));
  }

  config.api = api;
  config.initialPath = initialPath || '/';
  config.isValid = true;
  config.render = render;
}

/**
 * The `lux` function is for routing to - and retrieving API resource - pages.
 *
 * @param  {LuxPath} [path] - The route to load. The `path` will default to the
 * current `window.location` if none is provided.
 *
 * @param  {LuxConfig} [configObj] - If provided will allow for application
 * "initialization/configuration" (`init()`) and "start" (`lux()`) in a single
 * call (`lux('/', config)`) rather than the two individual invocations.
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
function lux(path, configObj) {
  const format = responseModelFormat;
  let pending;

  /* istanbul ignore else */
  if (configObj) {
    init(configObj);
  }

  if (!config.isValid) {
    pending = new Promise(resolve => resolve(format({}, errorInvalidConfig)));
  } else if (!path || isString(path)) {
    pending = apiRequest(config.api + luxPath(path))
      .then(responseModelHandler);
  } else {
    pending = new Promise(resolve => resolve(format({}, errorInvalidPath)));
  }

  return pending;
}

export default lux;

export {
  /** @see module:lux/apiRequest */
  apiRequest,
  /** @see module:lux~init */
  init,
  /** @see module:lux/luxPath */
  luxPath,
  /** @see module:lux/routing */
  routing,
  /** @see module:lux/storage */
  storage,
};
