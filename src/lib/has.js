/**
 * @module has
 * @memberof core-lux
 */

function hasAll(prop, search, obj) {

  return search.every(term => hasOne(prop, term, obj));
}

function hasAny(prop, search, obj) {

  return search.some(term => hasOne(prop, term, obj));
}

function hasOne(prop, search, obj) {

  return obj[prop] && obj[prop].indexOf(search) > -1;
}

export { hasAll, hasAny, hasOne };
