/**
 * @module lib/is
 * @memberof lux-lib
 */

/**
 * @typedef {function} IsFunction
 *
 * @description
 * A function that returns true if the parameter matches the type the function
 * is expecting.
 *
 * @param {any} - A variable to evaluate against its type:
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
 *
 * @example
 * import { isString } from './is';
 *
 * isString('Hello');
 * // returns true
 */

const isType = (type, q) => `[object ${type}]` === ({}).toString.call(q);

const isArray = q => isType('Array', q);
const isFunction = q => isType('Function', q);
const isRegExp = q => isType('RegExp', q);
const isNull = q => q === null || q === undefined;
const isObject = q => isType('Object', q);
const isString = q => isType('String', q);

/**
 * Test `obj` to determine if it is a DOM node. A node is any DOM node which
 * could be anything including: document, text, comment, or element. A node is
 * not necessarily an element
 *
 * @param  {*}  obj - The test subject.
 *
 * @return {Boolean} - Result of the test.
 */
const isNode = obj =>
  (typeof Node === 'object'
    // istanbul ignore next line
    ? obj instanceof Node
    : !!obj &&
      typeof obj === 'object' &&
      typeof obj.nodeType === 'number' &&
      typeof obj.nodeName === 'string');

/**
 * Test `obj` to determine if it is a DOM element. An element is a specific
 * tag within the document. An element is a node.
 *
 * @param  {*}  obj - The test subject.
 *
 * @return {Boolean} - Result of the test.
 */
const isElement = obj =>
  (typeof HTMLElement === 'object'
    // istanbul ignore next line
    ? obj instanceof HTMLElement
    : !!obj &&
      typeof obj === 'object' &&
      obj !== null &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string');

export {
  /** @type {IsFunction} */
  isArray,
  /** @type {IsFunction} */
  isElement,
  /** @type {IsFunction} */
  isFunction,
  /** @type {IsFunction} */
  isNode,
  /** @type {IsFunction} */
  isNull,
  /** @type {IsFunction} */
  isObject,
  /** @type {IsFunction} */
  isRegExp,
  /** @type {IsFunction} */
  isString,
};
