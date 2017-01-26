import configure, { settings } from './config';

describe('configure', function () {
  const config = {
    apiRoot: 'http://foo.bar',
    renderRoot: document.createElement('div'),
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

  it('should throw an error if `renderRoot` is not provided', function () {
    expect(function () {
      const bad = { ...config };
      delete bad.renderRoot;

      configure(bad);
    }).toThrow('Config property `renderRoot` not provided.');
  });

  it('should throw an error if `renderRoot` is not a DOM element', function () {
    expect(function () {
      const bad = { ...config };
      bad.renderRoot = 1234;

      configure(bad);
    }).toThrow('Config property `renderRoot` must be a DOM element; number provided.');
  });

  it('should fully configure without error', function () {
    expect(function () {
      configure(config);

      expect(typeof window.onpopstate).toBe('function');
    }).not.toThrow();
  });

  it('should throw an error when attempting to reassign properties; after successful configuration', function () {
    expect(function () {
      settings.apiRoot = 'http://foo.bar';
    }).toThrow(new TypeError('Cannot set property apiRoot of #<Object> which has only a getter'));
  });
});
