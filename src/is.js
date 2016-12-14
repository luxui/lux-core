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

const isType = (type, q) => `[object ${type}]` === ({}).toString.call(q);

const isArray = q => isType('Array', q);
const isFunction = q => isType('Function', q);
const isRegExp = q => isType('RegExp', q);
const isNull = q => q === null || q === undefined;
const isObject = q => isType('Object', q);
const isString = q => isType('String', q);

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
};
