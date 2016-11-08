import {
  isArray,
  isFunction,
  isRegExp,
  isString,
  typeString
} from './is';

describe('Library: is', () => {
  [
    isArray,
    isFunction,
    isRegExp,
    isString,
    typeString
  ].forEach(fn => {
    describe(fn.name + ' - existential', () => {
      it(`should exist`, () => {
        expect(typeof fn).toMatch(/function/i);
      });
    });
  });

  describe(`isArray - functionality`, () => {
    it(`should return true for an Array`, () => {
      expect(isArray([])).toBe(true);
    });

    it(`should return false for anything not an Array`, () => {
      expect(isArray({})).toBe(false);
    });
  });

  describe(`isFunction - functionality`, () => {
    it(`should return true for Function`, () => {
      expect(isFunction(_ => _)).toBe(true);
    });

    it(`should return false for anything not a Function`, () => {
      expect(isFunction({})).toBe(false);
    });
  });

  describe(`isRegExp - functionality`, () => {
    it(`should return true for a RegExp`, () => {
      expect(isRegExp(/./)).toBe(true);
    });

    it(`should return false for anything not a RegExp`, () => {
      expect(isRegExp({})).toBe(false);
    });
  });

  describe(`isString - functionality`, () => {
    it(`should return true for a String`, () => {
      expect(isString('')).toBe(true);
    });

    it(`should return false for anything not a String`, () => {
      expect(isString({})).toBe(false);
    });
  });

  describe(`typeString - functionality`, () => {
    it(`should return '[object String]' for a String`, () => {
      expect(typeString('')).toBe('[object String]');
    });
  });
});
