/**
 * @module lib/luxPath
 * @memberof lux-lib
 */

import urlParse from './urlParse';

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
 * Consistent LuxPath factory - path(name) and querystring - should be
 * considered when retrieving the current LuxPath; since this is not included
 * in common APIs this function aims to provide the utility.
 *
 * @param  {string} loc - The URL to parse.
 *
 * @return {LuxPath} - The standardized luxPath value for the given URL.
 *
 * @example
 * import luxPath from './luxPath';
 *
 * const { pathname } = luxPath('http://foo.bar/baz/boo?fizz=buzz');
 * // pathname === '/baz/boo'
 */
function luxPath(loc) {
  const url = urlParse(`${loc}`);
  const path = url.pathname
    .replace(/\/+$/, ''); // remove trailing slashes

  return `${path}${url.search}` || '/';
}

export default luxPath;
