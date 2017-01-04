/**
 * @module lib/urlParse
 * @memberof lux-lib
 */

import { isString } from './is';

const rURLStart = /^(?:http[s]?:)|\/{1,2}|\?|#/;

// FIXME: this module is probably a bad idea long-term but for the short-term
// it'll have to be Ok.

function queryObject(search) {

  return search
    ? search
      .split('&')
      .reduce(queryToObjectReduce, {})
    : {};
}

function queryToObjectReduce(acc, p) {
  const [key, val] = p.split('=');

  acc[key] = /,/.test(val)
    ? val.split(',').map(toValue)
    : toValue(val);

  return acc;
}

function toValue(valueInQuestion) {
  switch (true) {
    case valueInQuestion === 'false':
      return false;
    case valueInQuestion === 'true':
      return true;
    default:
      return valueInQuestion;
  }
}

/**
 * Parse the parts of a URL into an object for use.
 * ```
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │                                  href                                     │
 * ├──────────┬┬─────────┬─────────────────┬───────────────────────────┬───────┤
 * │ protocol ││  auth   │      host       │           path            │ hash  │
 * │          ││         ├──────────┬──────┼──────────┬────────────────┤       │
 * │          ││         │ hostname │ port │ pathname │     search     │       │
 * │          ││         │          │      │          ├─┬──────────────┤       │
 * │          ││         │          │      │          │ │    query     │       │
 * "  http:   // usr:pwd @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
 * │          ││         │          │      │          │ │              │       │
 * └──────────┴┴─────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
 * (all spaces in the "" are purely for formatting)
 * ```
 *
 * @param  {string} url - The URL to parse.
 *
 * @return {object} - The parsed URL represented as an object conforming to the
 * diagram in the description; and from https://nodejs.org/dist/latest-v7.x/docs/api/url.html
 * (Source).
 *
 * @example
 * import urlParse from './urlParse';
 *
 * const { pathname } = urlParse('http://foo.bar/baz/boo?fizz=buzz');
 * // pathname === '/baz/boo'
 *
 * @example
 * import { queryObject } from './urlParse';
 *
 * const { foo } = queryObject('?foo=bar');
 * // foo === 'bar'
 */
function urlParse(url) {
  if (!isString(url)) {
    throw new Error(`URLs must be strings: "${typeof url}" provided.`);
  }

  if (url && !rURLStart.test(url)) {
    throw new Error(`Unparsable URL: (${typeof url}) "${url}".`);
  }

  const firstGroup = result => (result && result[1] ? result[1] : '');

  const str = `${url}`;

  const auth = firstGroup(str.match(/\/\/([^@]*?)@/));
  const hash = firstGroup(str.match(/(#.*)?$/));
  const protocol = firstGroup(str.match(/^([^:]+:)/));

  const hostAndPath = str
    .replace(RegExp(`^${protocol}//${auth}${auth ? '@' : ''}`), '')
    .replace(hash, '');

  const host = firstGroup(hostAndPath.match(/(.*?)(?:[?/#]|$)/));
  const path = hostAndPath.replace(host, '');

  const [pathname, query = ''] = path.split('?');
  const [hostname, port = ''] = host.split(':');

  return {
    auth,
    hash,
    host,
    hostname,
    param: queryObject(query),
    path,
    pathname,
    port,
    protocol,
    query,
    search: query ? `?${query}` : '',
  };
}

export default urlParse;

export { queryObject };
