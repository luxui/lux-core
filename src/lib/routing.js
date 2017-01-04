/**
 * @module lib/routing
 * @memberof lux-lib
 */

import { isString, isRegExp, isFunction } from './is';

const cache = {};
const routeHandlers = [];

/**
 * @callback PathHandler
 * @global
 *
 * @description
 * PathHandlers are functions that run when a {@link PathMatcher} matches.
 */

/**
 * @typedef PathMatcher
 * @type {(PathMatcherFn|RegExp|string)}
 * @global
 *
 * @description
 * A PathMatcher will be evaluated against a {@link LuxPath}. If the given Path
 * is found to be a match the {@link PathHandler} will run; only the first
 * match will be run.
 */

/**
 * @callback PathMatcherFn
 * @global
 *
 * @param {LuxPath} path - The path to test against.
 *
 * @returns {boolean} - Returns `true` if the `path` parameter is a match; all
 * other return values are assumed to be falsey.
 */

function errorString(str) {

  return `${str} provided to routing API.`;
}

// Attempt to match the path with the matchers in routeHandlers.
function lookup(path) {
  if (!cache[path]) {
    const found = routeHandlers
      // eslint-disable-next-line no-unused-vars
      .filter(([_, matcherFn]) => matcherFn(path))[0];

    cache[path] = found
      ? found.pop()
      : cache['/error'];
  }

  return cache[path];
}

// Store the matcher in the list of routeHandlers checking for duplication or
// collision.
function register(matcher, handler) {
  if (!handler || !isFunction(handler)) {
    throw new Error(errorString('No "handler" function'));
  }

  if (!(isString(matcher) || isRegExp(matcher) || isFunction(matcher))) {
    const type = typeof matcher;
    throw new Error(errorString(`Invalid "PathMatcher" type (${type})`));
  }

  if (matcher === '/error') {
    cache['/error'] = handler;

    return;
  }

  const matcherID = matcher.toString();
  const found = routeHandlers
    .filter(([id]) => id === matcherID)[0];

  if (found) {
    // eslint-disable-next-line max-len
    throw new Error(`Routing API already has a handler registerd for PathMatcher: ${matcherID}.`);
  }

  let check;

  if (isString(matcher)) {
    check = path => matcher === path;
  } else if (isRegExp(matcher)) {
    check = path => matcher.test(path);
  } else {
    check = matcher;
  }

  routeHandlers
    .push([matcherID, check, handler]);
}

/**
 * The `routing()` API will schedule callbacks as handlers for configured URIs.
 *
 * @param  {(LuxPath|PathMatcher|PathMatcher[])}   matcher - The matching
 * criteria for a route.
 *
 * @param  {PathHandler} handler - The handler for a given URI.
 *
 * @return {PathHandler} - The handler for a matched URI.
 *
 * @example
 * import routing from './routing';
 *
 * // register a handler for a route
 * routing('/home', awesomeRouteHandler);
 * // returns undefined
 *
 * @example
 * import routing from './routing';
 *
 * // look for a handler
 * routing('/home');
 * // returns awesomeRouteHandler
 *
 * routing('/non-existent-route');
 * // returns undefined
 */
function routing(matcher, handler) {
  if (!matcher) {
    throw new Error(errorString('No "PathMatcher" function'));
  }

  switch (arguments.length) {
    case 1: // getter

      return lookup(matcher);
    case 2: // setter

      return register(matcher, handler);
    default:
      throw new Error('Too many arguments provided to routing API.');
  }

}

export default routing;
