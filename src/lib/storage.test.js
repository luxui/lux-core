import storage from './storage';

let cache;
const mockStorage = {
  getItem: (key) => cache,
  removeItem: (key) => cache = void 0,
  setItem: (key, value) => cache = value
};

describe('Library: storage', () => {
  it('should exist', () => {
    expect(storage).toBeDefined();
  });

  it('should innitialize with an undefined value', function () {
    expect(storage('key', false, {store: mockStorage})).not.toBeDefined();
  });

  it('should store and retrieve a value', function () {
    const expected = '1234';
    storage('key', expected, {store: mockStorage});

    expect(storage('key', false, {store: mockStorage})).toBe(expected);
  });

  it('should remove a set value', function () {
    storage({reset: 'key'}, false, {store: mockStorage});

    expect(storage('key', false, {store: mockStorage})).not.toBeDefined();
  });

  it('should throw errors', function () {
    expect(storage).toThrow(Error('No "key" provided to storage().'));
  });
});
