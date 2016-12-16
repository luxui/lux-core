/**
 * @module lib/debounce
 */

/**
 * Debounce user-entry events to prevent "spamming". The context of the initial
 * call to `debounce` will be preserved for the debounced function; this will
 * enable providing "pre-values" or a way to persist information between calls
 * to debounced functions, if desired otherwise it can be ignored.
 *
 * For a little more on debounce checkout [JavaScript Debounce Function](https://davidwalsh.name/javascript-debounce-function).
 *
 * @example
 * // Typical use-case - no context - to prevent unnecessary execution.
 * function usernameCheck(event) {
 *  // ... use AJAX to query the server if the username is taken
 * }
 *
 * const debouncedFn = debounce(usernameCheck, 400);
 *
 * $('.usernameField').on('change', debouncedFn);
 *
 * @example
 * // Contrived use-case - providing a context.
 * function otherFunctionality(event) {
 *  // ... use the context - this - is some interesting way
 * }
 *
 * const $element = $('..usernameField');
 * const debouncedFn = debounce.call($element, otherFunctionality, 400);
 *
 * $element.on('change', debouncedFn);
 *
 * @param  {function} fn - function to call once delay has elapsed
 *
 * @param  {number}   [delay=300] - time in miliseconds to delay
 *
 * @param  {window}   [global=window] - the global object with:
 * #clearTimeout(), and #setTimeout()
 *
 * @return {function}
 *         debounced function
 */
function debounce(fn, delay = 300, global = window) {
  const context = this;
  let pending;

  function debounced(...args) {
    if (pending) {
      global.clearTimeout(pending);
    }

    pending = global.setTimeout(fn.bind(context, ...args), delay);
  }

  return debounced;
}

export default debounce;
