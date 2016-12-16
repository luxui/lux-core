/**
 * @module lib/series
 */

import { isFunction } from './is';

/**
 * Compose a list of functions into a single function which will call all of
 * the functions in the series.
 *
 * @param  {function} [allFunctions] - All functions in the series.
 *
 * @return {function} - The composed function.
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
