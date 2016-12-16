/**
 * @module componentRegistry
 * @memberof lux-react
 */

import { isFunction, isString } from '../lib/is';

const registry = {};

function addToRegistry(obj, ...tail) {
  if (tail.length === 2) {
    obj[tail[0]] = tail[1];
  } else {
    const head = tail.shift();

    obj[head] = obj[head] || {};
    addToRegistry(obj[head], ...tail);
  }
}

function findInRegistry(obj, ...tail) {
  const head = tail.shift();

  return tail.length
    ? findInRegistry(obj[head], ...tail)
    : obj[head];
}

function register(path, fn) {
  if (!isString(path)) {
    throw new Error('Component identifiers are required and must be strings.');
  }

  if (fn && !isFunction(fn)) {
    throw new Error('React components must be functions.');
  }

  const parts = path.split(/[./]/);

  switch (arguments.length) {
    case 1:
      return findInRegistry(registry, ...parts);
    case 2:
      return addToRegistry(registry, ...parts, fn);
    default:
      throw new Error('Too many arguments provided to componentRegistry.');
  }
}

export default register;
