import configure from './config';

describe('configure', function () {
  const config = {
    apiRoot: 'http://foo.bar',
    renderRoot: '#renderRoot',
  };

  it('should exist; and should be a function', function () {
    expect(typeof configure).toBe('function');
  });

  it('should throw an error if API renderRoot is not provided', function () {
    expect(function () {
      const bad = { ...config };
      delete bad.apiRoot;

      configure(bad);
    }).toThrow('Config property `apiRoot` not provided.');
  });

  it('should throw an error if API renderRoot is not a string', function () {
    expect(function () {
      const bad = { ...config };
      bad.apiRoot = 1234;

      configure(bad);
    }).toThrow('Config property `apiRoot` must be a string; number provided.');
  });

  it('should throw an error if "render" renderRoot is not provided', function () {
    expect(function () {
      const bad = { ...config };
      delete bad.renderRoot;

      configure(bad);
    }).toThrow('Config property `renderRoot` not provided.');
  });

  it('should throw an error if "render" renderRoot is not a string', function () {
    expect(function () {
      const bad = { ...config };
      bad.renderRoot = 1234;

      configure(bad);
    }).toThrow('Config property `renderRoot` must be a string; number provided.');
  });

  it('should fully configure without error', function () {
    expect(function () {
      const render = configure(config);

      expect(typeof render).toBe('function');
      expect(typeof window.onpopstate).toBe('function');
    }).not.toThrow();
  });

  it('return an error when attempting to get a configuration property that doesn\'t exist', function () {
    expect(configure('non-existent-key')).toEqual(new Error('Configuration key "non-existent-key" not found.'));
  });
});
