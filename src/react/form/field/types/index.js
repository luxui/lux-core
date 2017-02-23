import { isString } from '../../../../lib/is';

import './default';

const types = {};

function addType(type, id) {
  if (!isString(type)) {
    // eslint-disable-next-line max-len
    throw new Error(`The "type" must be a string; ${typeof type} provided (${type}).`);
  }

  if (!isString(id)) {
    // eslint-disable-next-line max-len
    throw new Error(`The "id" must be a string; ${typeof id} provided (${id}).`);
  }

  types[type] = id;
}

function getType(type) {

  return types[type] || 'Form.Field.Default';
}

export {
  addType,
  getType,
};
