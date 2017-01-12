jest.mock('../lib/routing');
import routingMock from '../lib/routing';

jest.mock('../lib/herald');
import herald from '../lib/herald';

import luxReact from './index';

describe('Luxui API', function () {
  it('`luxReact` should exist; and should be a function', function () {
    expect(typeof luxReact).toBe('function');
  });
});

describe('luxReact', function () {
  const config = {
    apiRoot: 'http://foo.bar',
    renderRoot: '#reactRoot',
  };

  const app = luxReact(config);

  it('should return false if config is not valid', function () {
    const badApp = luxReact({});

    expect(badApp).toBe(false);
  });

  it('should "herald" a page render', function () {
    routingMock.mockImplementation(() => true);

    app.render('/abc');

    expect(herald).lastCalledWith('render', config.apiRoot);
  });

  it('should "herald" a resource render', function () {
    routingMock.mockImplementation(() => false);

    app.render('/abc');

    expect(herald).lastCalledWith('render', `${config.apiRoot}/abc`);
  });

  it('should have a `.page` method on a configured application', function () {
    expect(typeof app.page).toBe('function');
  });

  it('should register a page route with routing API', function () {
    app.page('/foo', 'bar');

    expect(routingMock).lastCalledWith('/foo', 'bar');
  });

  it('should use a fluent API style', function () {
    expect(app.page()).toBe(app);
  });
});
