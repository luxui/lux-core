import { isFunction } from './is';

function series(...allFunctions) {
  function composition(...args) {
    allFunctions
      .forEach(fn => isFunction(fn) && fn(...args));

    return allFunctions.length;
  }

  return composition;
}

export default series;
