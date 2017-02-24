import React from 'react'; // `React` must be in scope when using JSX

jest.mock('react-dom');
import ReactDOM from 'react-dom';

jest.mock('../lib/apiRequest');
import apiRequest from '../lib/apiRequest';

jest.mock('../lib/routing');
import routingMock from '../lib/routing';

jest.mock('../lib/herald');
import herald from '../lib/herald';

import registry from '../lib/componentRegistry';

import luxReact from './index';

describe('Luxui API', function () {
  it('`luxReact` should exist; and should be a function', function () {
    expect(typeof luxReact).toBe('function');
  });

  it('should have a `luxPath` static method', function () {
    expect(typeof luxReact.luxPath).toBe('function');
    expect(luxReact.luxPath('/home')).toBe('/home');
  });
});

describe('luxReact', function () {
  beforeEach(function () {
    spyOn(console, 'error');
    spyOn(console, 'log');
  });

  const config = {
    apiRoot: 'http://foo.bar',
    renderRoot: document.createElement('div'),
  };

  const app = luxReact(config);

  it('should throw an error if config is not valid', function () {
    expect(function () {
      luxReact({});
    }).toThrow('Config property `apiRoot` not provided.');
  });

  it('should have a specific API', function () {
    expect(Object.keys(app).sort()).toEqual([
      'component',
      'config',
      'page',
      'request',
      'state',
      'visit',
    ]);
  });

  describe('.component()', function () {
    it('should throw an error if too few arguments are provided', function () {
      expect(function () {
        app.component('abc');
      }).toThrow('Registering a component requires at least an "identifier" (string) and an "implementation" (function).');
    });

    it('should throw an error if the "identifier" is not a string', function () {
      expect(function () {
        app.component(1, 'abc');
      }).toThrow('Component "identifiers" must be strings; number provided (1)');
    });

    it('should throw an error if the "implementation" is not a function', function () {
      expect(function () {
        app.component('abc', 1);
      }).toThrow('Component "implementations" must be functions; number provided (1).');
    });

    it('should enable registering/replacing components', function () {
      const component = () => <div />;
      app.component('Testing', component);

      expect(registry('Testing')).toBe(component);
    });

    it('should enable registering/replacing Form Field components', function () {
      const component = () => <div />;
      app.component('testing', 'Testing', component);

      expect(registry('Testing')).toBe(component);
    });
  });

  describe('.page()', function () {
    it('should have a `.page` method on a configured application', function () {
      expect(typeof app.page).toBe('function');
    });

    it('should register a page route with routing API', function () {
      app.page('/foo', 'bar');

      expect(routingMock).lastCalledWith('/foo', 'bar');
    });

    it('should return itself to enable "method chaining" (fluent API)', function () {
      expect(app.page()).toBe(app);
    });
  });

  describe('.request()', function () {
    const testingURL = '/window-dot-location';

    Object.defineProperty(window.location, 'toString', {
      writable: true,
      value: () => testingURL,
    });

    it('should enable making API requests', function () {
      const path = '/test-path';
      apiRequest.mockReturnValueOnce(new Promise(res => res({})));

      // API call: __resource__
      app.request(path);
      expect(apiRequest).lastCalledWith(`${config.apiRoot}${path}`);

      // return true to indicate that the path is a page, not a resource
      routingMock.mockReturnValueOnce(true);
      apiRequest.mockReturnValueOnce(new Promise(res => res({})));

      // API call: __root__
      app.request(path);
      expect(apiRequest).lastCalledWith(`${config.apiRoot}`);
    });

    it('should use `window.location` as a default when no path is provided', function () {
      apiRequest.mockReturnValueOnce(new Promise(res => res({})));

      return app.request()
        .then(function () {
          expect(apiRequest).lastCalledWith(`${config.apiRoot}${testingURL}`);
        });
    });
  });

  describe('.visit()', function () {
    it('should call the API and then render with a model; without error', function () {
      const model = { foo: 'bar' };

      apiRequest.mockReturnValueOnce(new Promise((resolve, reject) => {
        resolve(model);
      }));

      return app.visit('/anything')
        .then(res => {
          const [ { props } ] = ReactDOM.render.mock.calls.pop();

          expect(props.children.type.name).toBe('LayoutComponent');
        });
    });

    it('should render an error page', function () {
      ReactDOM.render.mockReset();
      ReactDOM.render.mockImplementationOnce(function () {
        throw new Error('Fatal error');
      });
      apiRequest.mockReturnValueOnce(new Promise(resolve => resolve({})));

      return app.visit()
        .then(res => {
          expect(ReactDOM.render.mock.calls.length).toBe(2);
          const [ lastCall ] = ReactDOM.render.mock.calls.pop();

          expect(lastCall.type.name).toEqual('FatalErrorComponent');
        });
    });

    it('should resolve to an Error page', function () {
      const error = 'Testing error';

      apiRequest.mockImplementationOnce(() => {
        throw new Error(error);
      });

      return app.visit()
        .then(res => {
          expect(res.error).toEqual(new Error(error));
        });
    });
  });
});
