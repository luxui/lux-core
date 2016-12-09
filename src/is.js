/**
 * @module has
 * @memberof lib-lux
 */

/**
 * @typedef {function} IsFunction
 *
 * @description
 * A function that returns true if the parameter matches the type the function
 * is expecting.
 *
 * @param {any} - A variable reference to evaluate against its type:
 *
 *  - Array
 *  - Function
 *  - Object
 *  - RegExp
 *  - String
 *  - etc.
 *
 * @return {bool} - The result of the test against the type the function is
 * expecting.
 */


const typeString = Function.prototype.call.bind(Object.prototype.toString);
const isType = (type, q) => `[object ${type}]` === typeString(q);

const isArray = q => isType('Array', q);
const isFunction = q => isType('Function', q);
const isRegExp = q => isType('RegExp', q);
const isObject = q => isType('Object', q);
const isString = q => isType('String', q);
// eslint-disable-next-line no-void, `void 0` will always be `undefined`
const isNull = q => q === null || q === void 0;

export {
  /** @type {IsFunction} */
  isArray,
  /** @type {IsFunction} */
  isFunction,
  /** @type {IsFunction} */
  isNull,
  /** @type {IsFunction} */
  isObject,
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
