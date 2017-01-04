/**
 * @module lib/componentRegistry
 * @memberof lux-lib
 */

import { isFunction, isString } from '../lib/is';

const registry = {};

function addToRegistry(obj, ...tail) {
  if (tail.length === 2) {
    obj[tail[0]] = tail[1];
  } else {
    const head = tail.shift();

    obj[head] = obj[head] || {};
    addToRegistry(obj[head], ...tail);
  }
}

function findInRegistry(obj, ...tail) {
  const head = tail.shift();

  return tail.length
    ? findInRegistry(obj[head], ...tail)
    : obj[head];
}

/**
 * Store a new component in the registry for later retrieval.
 *
 * @param  {String}   path - the identifier
 * @param  {Function} fn - the component definition
 * @param  {Boolean}  [overwrite=true] - option to overwrite an existing
 * registry component or not
 *
 * @return {any} - could be anything but typically would be a function or
 * framework component
 *
 * @example
 * import registry from './componentRegistry';
 *
 * // store a new component in the registry; overwrite if it already exists
 * registry('Home', HomeComponent);
 *
 * // retrieve a registered component if it exists
 * const Component = registry('Home');
 *
 * // store a new component in the registry; only if it doesn't already exist
 * registry('Footer', FooterComponent, false);
 */
function componentRegistry(path, fn, overwrite = true) {
  if (!isString(path)) {
    throw new Error('Component identifiers are required and must be strings.');
  }

  if (fn && !isFunction(fn)) {
    throw new Error('React components must be functions.');
  }

  const parts = path.split(/[./]/);

  switch (arguments.length) {
    case 1:
      return findInRegistry(registry, ...parts);
    case 2:
      // intentional switch case "fallthrough" because of default arg value
    case 3:
      if (!overwrite && findInRegistry(registry, ...parts)) {

        return undefined;
      }

      return addToRegistry(registry, ...parts, fn);
    default:
      throw new Error('Too many arguments provided to componentRegistry.');
  }
}

export default componentRegistry;
