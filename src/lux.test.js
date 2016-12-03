jest.mock('./apiRequest');
import apiRequest from './apiRequest';

import lux, { init } from './lux';

describe('init', function () {
  it('should throw an Error when no API root URI is provided', function () {
    const error = new Error('Lux requires an API root URI.');

    expect(function () {
      init();
    }).toThrow(error);
  });

  it('should throw an Error when API root URI is not a string', function () {
    const error = new Error('Configuration property `api` is not a string.');

    expect(function () {
      init(1234);
    }).toThrow(error);
  });
});

describe('lux', function () {
  const random = Math.random().toString(32).slice(2);

  it('should fail resolve to an error if configuration is invalid', function () {
    const error = new Error('Lux must be configured before routing.');

    return lux('/')
      .then(response => expect(response.error).toEqual(error));
  });

  it('should resolve to an "Error" ResponseModel', function () {
    const error = new Error('Paths must be strings.');
    init({ api: 'http://example.com' });

    return lux(1234)
      .then(({ error }) => expect(error).toEqual(error));
  });

  it('should call apiRequest', function () {
    init({ api: 'http://example.com' });

    lux('/');

    expect(apiRequest.mock.calls.length).toBe(1);
  });
});
