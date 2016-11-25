/**
 * @module lib/has
 * @memberof module:lux/lib
 * @private
 */

function all(prop, search, obj) {

  return search.every(term => one(prop, term, obj));
}

function any(prop, search, obj) {

  return search.some(term => one(prop, term, obj));
}

function one(prop, search, obj) {

  return obj[prop] && obj[prop].indexOf(search) > -1;
}

export {
  all as hasAll,
  any as hasAny,
  one as hasOne
};
