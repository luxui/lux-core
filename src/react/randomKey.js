/**
 * @module react/randomKey
 * @memberof react
 */

// For use when the react element key doesn't matter at all.
function randomKey() {

  return `randomKey_${Math.random().toString(32).slice(2)}`;
}

export default randomKey;
