/**
 * @module lib/componentRegistry
 * @memberof lux-lib
 */

import { isFunction, isString } from '../lib/is';

const registry = {};

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
  if (!isString(path) || path === '') {
    throw new Error('Component identifiers are required and must be strings.');
  }

  if (fn && !isFunction(fn)) {
    throw new Error('Components must be functions.');
  }

  if (arguments.length > 3) {
    throw new Error('Too many arguments provided to componentRegistry.');
  }

  const saveToRegistry = registry[path] ? overwrite : true;

  if (arguments.length > 1 && saveToRegistry) {
    registry[path] = () => fn;
  }

  return (registry[path] || (() => undefined))();
}

export default componentRegistry;
