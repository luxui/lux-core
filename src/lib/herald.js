/**
 * @module lib/herald
 * @memberof lux-lib
 */

import { isFunction } from './is';

/**
 * @typedef {function} Herald
 *
 * @description
 * A simple pub/sub implementation for decoupled message passing between
 * disconnected components.
 *
 * @param  {function} arg - a function value will be accepted as a listener
 * ("subscriber") to all messages.
 *
 * @param {any} arg - any value - not a function - will send that as a message
 * to all listners.
 *
 * @param  {...any} [rest] - any additional arguments will be passed to each
 * listener function as arguments.
 *
 * @return {(function|true)} - a "remove" function will be returned when a
 * listener is registered to allow unregistering that function, the value
 * "true" will be returned after sending messages to listeners.
 *
 * @example
 * import herald from './herald';
 *
 * // log any, and all, messages to the console
 * herald(message => console.log(message));
 *
 * // log "Hello, world." to the console.
 * herald('Hello, world.');
 */

/**
 * Create an instance of {@link Herald}, with isolated "listeners" arrays.
 *
 * @return {module:lib/herald.Herald} - a "herald"ing function
 *
 * @example
 * import { heraldFactory } from './herald';
 *
 * const myHerald = heraldFactory();
 *
 * myHerald(message => doStuff(message));
 * myHerald('Something important happened');
 */
function heraldFactory() {
  let listeners = [];

  function herald(arg, ...rest) {
    if (!arg) {
      throw new Error('A herald requires either a "message" or a "listener" (function); neither was provided.'); // eslint-disable-line max-len
    }

    if (isFunction(arg)) {
      listeners.push(arg);

      update();

      return () => {
        listeners = listeners.filter(fn => fn !== arg);
        update();
      };
    }

    listeners.forEach(fn => fn(arg, ...rest));

    return true;
  }

  function update() {
    herald.listeners = listeners.slice(0);
  }

  update();

  return herald;
}

export default heraldFactory();

export {
  heraldFactory,
};
