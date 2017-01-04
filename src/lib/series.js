/**
 * @module lib/series
 * @memberof lux-lib
 */

import { isFunction } from './is';

/**
 * Compose a list of functions into a single function which will call all of
 * the functions in the series.
 *
 * @param  {function} [allFunctions] - All functions in the series.
 *
 * @return {function} - The composed function.
 *
 * @example
 * import series from './series';
 *
 * const fnA = () => console.log('Hello, ');
 * const fnB = () => console.log('world.');
 * const functions = series(fnA, fnB);
 * functions();
 * // both fnA and fnB are called
 */
function series(...allFunctions) {
  function composition(...args) {
    allFunctions
      .forEach(fn => isFunction(fn) && fn(...args));

    return allFunctions.length;
  }

  return composition;
}

export default series;
