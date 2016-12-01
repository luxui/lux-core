import { isString } from './lib/is';
import { setAPI } from './lux';

let isSet = false;

function configRequired() {
  throw new Error('A configuration object - LuxConfig - is required.');
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
  if (isSet) {
    throw new Error('Attempting to reconfigure; not allowed.');
  }

  if (!api) {
    throw new Error(errorStr('api', 'not provided in config object'));
  } else if (!isString(api)) {
    throw new Error(errorStr('api', 'is not a string'));
  }

  setAPI(api);
  isSet = true;
}

export default init;
