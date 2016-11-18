import lib from './localStorage';

let cache;
const mockStorage = {
  getItem: (key) => cache,
  removeItem: (key) => cache = void 0,
  setItem: (key, value) => cache = value
};

describe('Library: storage', () => {
  it('should exist', () => {
    expect(lib).toBeDefined();
  });

  it('should innitialize with an undefined value', function () {
    expect(lib('key', false, {store: mockStorage})).not.toBeDefined();
  });

  it('should store and retrieve a value', function () {
    const expected = '1234';
    lib('key', expected, {store: mockStorage});

    expect(lib('key', false, {store: mockStorage})).toBe(expected);
  });

  it('should remove a set value', function () {
    lib({reset: 'key'}, false, {store: mockStorage});

    expect(lib('key', false, {store: mockStorage})).not.toBeDefined();
  });

  it('should throw errors', function () {
    expect(lib).toThrow(Error('No "key" provided to storage().'));
  });
});
