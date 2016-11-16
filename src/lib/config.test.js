import configManager from './config';

describe('Lux - Configuration', function () {
  it('should exist; and should be a function', function () {
    expect(typeof configManager).toMatch(/function/i);
  });

  it('should throw an error if the `api` is omitted', function () {
    expect(function () {
      configManager();
    }).toThrow();
  });

  it('should throw an error if the `api` is not a string', function () {
    expect(function () {
      configManager({
        api: 1234
      });
    }).toThrow();
  });

  it('should throw an error if the `routing` is omitted', function () {
    expect(function () {
      configManager({
        api: 'http://api.root',
      });
    }).toThrow();
  });

  it('should throw an error if the `routing` is not a function', function () {
    expect(function () {
      configManager({
        api: 'http://api.root',
        routing: 1234,
      });
    }).toThrow();
  });

  it('should a state object', function () {
    configManager({
      api: 'http://api.root',
      routing() {},
    });

    expect(configManager().isValid).toBe(true);
  });

  it('should throw an error if attempting to re-configure', function () {
    expect(function () {
      configManager({
        api: 'http://api.root',
        routing() {},
      });
    }).toThrow();
  });
});
