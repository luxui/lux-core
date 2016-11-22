import urlParse from 'url-parse';

import { isString } from './is';

/**
 * Consistent endpoint function - path(name) and search - should be considered
 * when retrieving the current endpoint; since this is not included in common
 * APIs this function aims to provide the utility.
 *
 * @param  {string} loc
 *         The URL to parse.
 *
 * @return {string}
 *         The standardized endpoint value for the given URL.
 */
function endpoint(loc) {
  const url = isString(loc) ? urlParse(loc) : loc;
  const path = url.pathname.replace(/\/+$/, '');
  const search = url.search || '';

  return path + search;
}

export default endpoint;
