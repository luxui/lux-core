/**
 * @module lib/storage
 * @memberof lux-lib
 */

/**
 * Abstraction over the browser's localStorage API adding the option to provide
 * an alternate solution.
 *
 * @param  {string|ResetConfig} key - The Primary controller of functionality;
 * as a String will indicate which key to interact with in localStorage, as an
 * Object will allow additional functionality.
 *
 * @param  {any} value - Any value localStorage will allow for storage.
 *
 * @param  {string} prefix - A value to prefix all storage keys.
 *
 * @param  {object} store - An API - which matches the browser's localStorage
 * API - to persist values to.
 *
 * @return {any} - The value in storage.
 *
 * @example
 * // set a value in the store
 * storage('name', 'Joshua');
 *
 * // retrieve a value from the store
 * storage('name');
 *
 * // remove the value from the store
 * storage({ reset: 'name' });
 */
function storage(key, value, config = {}) {
  if (!key) {
    const errorMessage = 'No "key" provided to storage().';
    throw new Error(errorMessage, 'luxui/lib/storage.js');
  }

  const { prefix, store } = {
    prefix: 'luxui--',
    store: window.localStorage,
    ...config
  };
  const { reset } = key;

  if (reset) {
    store.removeItem(`${prefix}${reset}`);
  } else if (value) {
    store.setItem(`${prefix}${key}`, value);
  }

  return store.getItem(`${prefix}${key}`);
}

export default storage;
