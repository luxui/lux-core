/**
 * @module luxPath
 * @memberof lux
 */

import urlParse from 'url-parse';

import { isString } from './is';

/**
 * @typedef LuxPath
 * @type {String}
 * @global
 *
 * @description
 * Path string should always start with '/', but can include querystring
 * parameters; the pathname and querystring parameters will be passed along in
 * the API calls.
 */

/**
 * Consistent LuxPath factory - path(name) and querystring - should be
 * considered when retrieving the current LuxPath; since this is not included
 * in common APIs this function aims to provide the utility.
 *
 * @param  {String} loc - The URL to parse.
 *
 * @return {LuxPath} - The standardized luxPath value for the given URL.
 */
function luxPath(loc) {
  const url = isString(loc) ? urlParse(loc) : loc;
  const path = url.pathname.replace(/\/+$/, '');
  const query = url.query || '';

  return path + query;
}

export default luxPath;
