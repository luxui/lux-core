import { isArray } from './is';

function flatten(list) {
  if (!isArray(list)) {
    throw new Error('Only an array makes sense to `flattenArray`.');
  }

  return list
    .reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

export default flatten;
