/**
 * @module lib/has
 * @memberof lux-lib
 */

/**
 * @typedef {function} HasFunction
 *
 * @description
 * Check that the `obj` (object) `prop` (array) contains the `term` (element).
 * Variations - hasAll, hasAny, hasOne - allow for different use-cases with a
 * similar and consistent syntax for searching.
 *
 * @return {bool} - returns the result as a boolean rather than an index.
 *
 * @example
 * import { hasOne } from './has';
 *
 * const link = {
 *   rel: ['index', 'collection'],
 *   href: 'http://foo.bar',
 * };
 *
 * hasOne('rel', 'index', link);
 * // returns true
 */

function hasAll(prop, terms, obj) {

  return terms
    .every(term => hasOne(prop, term, obj));
}

function hasAny(prop, terms, obj) {

  return terms
    .some(term => hasOne(prop, term, obj));
}

function hasOne(prop, term, obj) {

  return obj[prop] && obj[prop].indexOf(term) > -1;
}

export {
  /** @type {HasFunction} */
  hasAll,
  /** @type {HasFunction} */
  hasAny,
  /** @type {HasFunction} */
  hasOne,
};
