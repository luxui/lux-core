/**
 * @module lib/flattenArray
 * @memberof lux-lib
 */

import { isArray } from './is';

/**
 * Return a "flattened" array from a multi-dimensional array.
 *
 * @param  {array} list - the multi-dimensional array to "flatten".
 *
 * @return {array} - the "flattened" representation of the array.
 *
 * @example
 * import flattenArray from './flattenArray';
 *
 * const flattened = flattenArray([1, [2, 3], 4, 5, [6, [7, 8, [9]]]]);
 * // returns [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
function flattenArray(list) {
  if (!isArray(list)) {
    throw new Error('Only an array makes sense to `flattenArray`.');
  }

  return list
    .reduce((a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), []);
}

export default flattenArray;
