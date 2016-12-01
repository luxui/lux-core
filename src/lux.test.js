jest.mock('./apiRequest');
import apiRequest from './apiRequest';

import lux, { setAPI } from './lux';

describe('lux', function () {
  const random = Math.random().toString(32).slice(2);
  const mockResponse = {
    data: random,
    headers: {
      get: () => 'application/vnd.siren+json'
    },
    status: 200,
  };

  it('should throw an error when setting the API root to a non-string', function () {
    expect(setAPI).toThrow('Attempting to set `api` to non-string: undefined.');
  });

  it('should fail resolve to an error if configuration is invalid', function () {
    const error = new Error('Lux must be configured before routing.');

    return lux('/')
      .then(response => expect(response.error).toEqual(error));
  });

  it('should resolve to an Error ResponseModel', function () {
    const error = new Error('Paths must be strings.');

    return lux(1234)
      .then(({ error, status }) => {
        expect(error).toEqual(error);
        expect(status).toEqual(0);
      });
  });

  it('should resolve to an Error when attempting to re-configure', function () {
    const error = new Error('Attempting to reconfigure; not allowed.');

    return lux('/')
      .then(({ error }) => {
        expect(error).toEqual(error);
      });
  });

  it('should resolve to an Error when path is not a string', function () {
    const error = new Error('Paths must be strings.');
    setAPI('http://example.com');

    return lux(1234)
      .then(response => expect(response.error).toEqual(error));
  });

  it('should resolve with a ResponseModel', function () {
    apiRequest
      .mockReturnValueOnce(new Promise(resolve => resolve(mockResponse)));

    setAPI('http://example.com');

    return lux('/')
      .then(response => {
        expect(response.error).toBe(false);
      });
  });
});
