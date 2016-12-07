/**
 * @module lux/lib/is
 * @memberof module:lux/lib
 * @private
 */

/**
 * Function that returns true if the parameter matches the type of object the
 * function is expecting.
 *
 * @typedef {function} IsFunction
 *
 * @param {any} - A variable reference to evaluate against its type:
 *
 *  - Array
 *  - Function
 *  - Object
 *  - String
 *  - etc.
 *
 * @return {bool} - The result of the test against the type the function is
 * expecting.
 */


const typeString = Function.prototype.call.bind(Object.prototype.toString);
const is = (type, q) => typeString(q) === type;

const factory = _ => is.bind(null, `[object ${_}]`);

const isArray = factory('Array');
const isFunction = factory('Function');
const isRegExp = factory('RegExp');
const isString = factory('String');

export {
  /** @type {IsFunction} */
  isArray,
  /** @type {IsFunction} */
  isFunction,
  /** @type {IsFunction} */
  isRegExp,
  /** @type {IsFunction} */
  isString,
  /**
   * Use the #toString() method of Object to get the true object type string.
   *
   * @param {*} - Any variable reference.
   *
   * @return {string} - The result of call Object.prototype.toString.call
   * passing in the parameter of the function.
   */
  typeString
};
