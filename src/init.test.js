import init from './init';

describe('init', function () {
  it('should throw an Error when required a configuration object is omitted', function () {
    const error = new Error('A configuration object - LuxConfig - is required.');
    // const config = {}; // intentionally removed

    expect(init).toThrow(error);
  });

  it('should throw an Error when required property `api` is omitted from configuration', function () {
    const error = new Error('Configuration property `api` not provided in config object.');
    const config = {};

    expect(function () {
      init(config);
    }).toThrow(error);
  });

  it('should throw an Error when required property `api` is not a String', function () {
    const error = new Error('Configuration property `api` is not a string.');
    const config = {
      api: 1234
    };

    expect(function () {
      init(config);
    }).toThrow(error);
  });

  it('should throw an Error if config is set', function () {
    const error = new Error('Attempting to reconfigure; not allowed.');
    const config = {
      api: 'http://example.com',
    };
    init(config);

    expect(function () {
      init(config);
    }).toThrow(error);
  });
});
