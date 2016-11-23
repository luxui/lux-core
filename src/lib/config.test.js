import config from './config';

describe('Lux - Configuration', function () {
  it('should exist; and should be a function', function () {
    expect(typeof config).toMatch(/function/i);
  });

  it('should return an empty object if no configuration has been set', function () {
    expect(config()).toEqual({});
  });

  it('should throw an error if the `api` is omitted', function () {
    expect(function () {
      config({});
    }).toThrow();
  });

  it('should throw an error if the `api` is not a string', function () {
    expect(function () {
      config({
        api: 1234,
      });
    }).toThrow();
  });

  it('should throw an error if the `initialPath` is not a string', function () {
    expect(function () {
      config({
        api: 'http://api.root',
        initialPath: 1234,
      });
    }).toThrow();
  });

  it('should throw an error if the `root` is not a string', function () {
    expect(function () {
      config({
        api: 'http://api.root',
        root: 1234,
      });
    }).toThrow();
  });

  it('should return a state object', function () {
    const keys = Object.keys(config({
      api: 'http://api.root',
    }));

    expect(keys.sort()).toEqual(['api', 'initialPath', 'isValid', 'root']);
  });

  it('should return the default initialPath', function () {
    const { initialPath } = config();

    expect(initialPath).toBe('/');
  });

  it('should throw an error if attempting to re-configure', function () {
    expect(function () {
      config({
        api: 'http://api.root',
      });
    }).toThrow();
  });
});
