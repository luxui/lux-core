/**
 * @module lib/luxPath
 * @memberof module:lux/lib
 */

import urlParse from 'url-parse';

import { isString } from './is';

/**
 * @typedef {string} LuxPath
 * @global
 *
 * @description
 * Path string should always start with '/', but can include querystring
 * parameters; the pathname and querystring parameters will be passed along in
 * the API calls.
 */

/**
 * Consistent luxPath function - path(name) and search - should be considered
 * when retrieving the current luxPath; since this is not included in common
 * APIs this function aims to provide the utility.
 *
 * @param  {string} loc - The URL to parse.
 *
 * @return {string} - The standardized luxPath value for the given URL.
 */
function luxPath(loc) {
  const url = isString(loc) ? urlParse(loc) : loc;
  const path = url.pathname.replace(/\/+$/, '');
  const search = url.search || '';

  return path + search;
}

export default luxPath;
