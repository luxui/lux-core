/**
 * @module lib/broker
 * @memberof lux-lib
 */

import { isObject } from './is';

const options = {
  __proto__: null,
  configurable: true,
  enumerable: true,
};

/**
 * @typedef {object} BrokeredObject
 * @global
 *
 * @description
 * A BrokeredObject is an object with its properties set and accessible as
 * normal properties - `obj.prop;` - but those properties will not allow for
 * assignment.
 *
 * Updated property values are always returned even if retrieving them after
 * object reference is obtained; due to using `Object.defineProperty`.
 */

/**
 * Create a BrokeredObject from an example object.
 *
 * @param  {Object} values - the example object to use for properties to broker
 * in the new object.
 * @param  {Object} [result={}] - the object to "broker"; lock down the
 * properties so they are "read-able" and not "writeable".
 * @param  {Object} [custom] - options for `Object.defineProperty`.
 *
 * @return {BrokeredObject} - the resulting BrokeredObject.
 *
 * @example
 * import broker from './broker';
 *
 * const appConfig = broker({
 *   api: 'http://foo.bar',
 *   dom: '#renderRoot',
 * });
 *
 * console.log(appConfig.api); // 'http://foo.bar'
 * appConfig.api = 'http://example.com'; // throws an error
 */
function brokerFactory(values, result = {}, custom) {
  if (!isObject(values)) {
    // eslint-disable-next-line max-len
    throw new Error(`An object is required to create a BrokeredObject; ${typeof values} provided.`);
  }

  Object.keys(values)
    .forEach((key) => {
      Object.defineProperty(result, key, {
        ...options,
        ...custom,
        get() { return values[key]; },
      });
    });

  return result;
}

export default brokerFactory;
