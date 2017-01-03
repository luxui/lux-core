jest.mock('../lib/routing');
import routingMock from '../lib/routing';

jest.mock('./render');
import render from './render';

import { configure, luxReact, routing } from './index';

describe('Luxui API', function () {
  it('`configure` should exist; and should be a function', function () {
    expect(typeof configure).toBe('function');
  });

  it('`luxReact` should exist; and should be a function', function () {
    expect(typeof luxReact).toBe('function');
  });

  it('`routing` should exist; and should be a function', function () {
    expect(typeof routing).toBe('function');
  });
});

describe('luxReact', function () {
  const config = {
    apiRoot: 'http://foo.bar',
    renderRoot: '#reactRoot',
  };

  configure(config);

  it('should render a page', function () {
    routingMock.mockImplementation(() => true);

    luxReact('/abc');

    expect(render).lastCalledWith(config.apiRoot);
  });

  it('should render a resource', function () {
    routingMock.mockImplementation(() => false);

    luxReact('/abc');

    expect(render).lastCalledWith(`${config.apiRoot}/abc`);
  });
});
