/**
 * @module lux
 */

import init from './init';
import lux from './lux';

import apiRequest from './apiRequest';
import routing from './routing';
import luxPath from './luxPath';
import storage from './storage';

import { hasAll, hasAny, hasOne } from './lib/has';
import { isArray, isFunction, isRegExp, isString, typeString } from './lib/is';

const lib = {
  hasAll,
  hasAny,
  hasOne,
  isArray,
  isFunction,
  isRegExp,
  isString,
  typeString,
};

export default lux;

export {
  /** @see module:lux/apiRequest */
  apiRequest,
  init,
  lib,
  /** @see module:lux/luxPath */
  luxPath,
  /** @see module:lux/routing */
  routing,
  /** @see module:lux/storage */
  storage,
};
