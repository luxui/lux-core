import { isObject } from './is';
import broker from './broker';

describe('broker', function () {
  const brokered = broker({
    key: 'value'
  });

  it('should be defined and be a function', function () {
    expect(typeof broker).toBe('function');
  });

  it('throw an error if a non-object is provided', function () {
    expect(function () {
      broker();
    }).toThrow('An object is required to create a BrokeredObject; undefined provided.');
  });

  it('should return an object', function () {
    expect(typeof brokered).toBe('object');
  });

  it('should allow access to properties', function () {
    expect(brokered.key).toBe('value');
  });

  it('should throw an error when attempting to reassign properties', function () {
    expect(function () {
      brokered.key = 'something else';
    }).toThrow(new TypeError('Cannot set property key of #<Object> which has only a getter'));
  });
});
