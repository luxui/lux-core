jest.mock('react-dom');
import ReactDOM from 'react-dom';

import { configure } from './index';

describe('configure', function () {
  const config = {
    api: 'http://foo.bar',
    root: '#root',
  };

  it('should exist; and should be a function', function () {
    expect(typeof configure).toBe('function');
  });

  it('should throw an error if API root is not provided', function () {
    expect(function () {
      const bad = { ...config };
      delete bad.api;

      configure(bad);
    }).toThrow('Configuration property `api` not provided in config object.');
  });

  it('should throw an error if API root is not a string', function () {
    expect(function () {
      const bad = { ...config };
      bad.api = 1234;

      configure(bad);
    }).toThrow('Configuration property `api` must be a string.');
  });

  it('should throw an error if "render" root is not provided', function () {
    expect(function () {
      const bad = { ...config };
      delete bad.root;

      configure(bad);
    }).toThrow('Configuration property `root` not provided in config object.');
  });

  it('should throw an error if "render" root is not a string', function () {
    expect(function () {
      const bad = { ...config };
      bad.root = 1234;

      configure(bad);
    }).toThrow('Configuration property `root` must be a string.');
  });

  it('should fully configure without error', function () {
    expect(function () {
      const render = configure(config);

      expect(typeof render).toBe('function');
      expect(typeof window.onpopstate).toBe('function');
    }).not.toThrow();
  });
});
