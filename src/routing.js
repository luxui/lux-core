/**
 * @module routing
 * @memberof core-lux
 */

import { isString, isRegExp, isFunction } from './is';

const cache = {};
let errorHandler = null;
const routes = [];

/**
 * @callback PathHandler
 * @global
 *
 * @description
 * PathHandlers are functions that run when a {@link PathMatcher} matches.
 */

/**
 * @typedef PathMatcher
 * @type {PathMatcherFn|RegExp|String}
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
 * @returns {Boolean} - Returns `true` if the `path` parameter is a match; all
 * other return values are assumed to be falsey.
 */

function errorString(str) {

  return `${str} provided to routing API.`;
}

function lookup(path) {
  if (!cache[path]) {
    const found = routes
      // eslint-disable-next-line no-unused-vars
      .filter(([_, matcherFn]) => matcherFn(path))[0];

    cache[path] = found
      ? found.pop()
      : errorHandler;
  }

  return cache[path];
}

function register(matcher, handler) {
  if (!handler || !isFunction(handler)) {
    throw new Error(errorString('No "handler" function'));
  }

  if (!(isString(matcher) || isRegExp(matcher) || isFunction(matcher))) {
    const type = typeof matcher;
    throw new Error(errorString(`Invalid "PathMatcher" type (${type})`));
  }

  if (matcher === '/error') {
    cache['/error'] = errorHandler = handler;

    return;
  }

  const found = routes
    .filter(([m]) => m === matcher.toString())[0];

  if (found) {
    // eslint-disable-next-line max-len
    throw new Error(`Routing API already has a handler registerd for PathMatcher: ${matcher.toString()}.`);
  } else if (isString(matcher)) {
    routes
      .push([matcher.toString(), path => matcher === path, handler]);
  } else if (isRegExp(matcher)) {
    routes
      .push([matcher.toString(), path => matcher.test(path), handler]);
  } else {
    routes
      .push([matcher.toString(), matcher, handler]);
  }
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
