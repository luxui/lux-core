import React from 'react';
import renderer from 'react-test-renderer';

import { addType, getType } from './';

describe('Form Field Types', function () {
  it('should expose get and set functions', function () {
    expect(typeof addType).toBe('function');
    expect(typeof getType).toBe('function');
  });

  it('should throw an error if "type" is not a string', function () {
    expect(function () {
      addType();
    }).toThrow('The "type" must be a string; undefined provided (undefined).');
  });

  it('should throw an error if "id" is not a string', function () {
    expect(function () {
      addType('valid');
    }).toThrow('The "id" must be a string; undefined provided (undefined).');
  });

  it('should return default field type', function () {
    expect(getType('undefined')).toBe('Lux.Form.Field.Default');
  });

  it('should allow for adding a type', function () {
    const name = 'myType';

    addType(name.toLowerCase(), name);
    expect(getType(name.toLowerCase())).toBe(name);
  });
});
