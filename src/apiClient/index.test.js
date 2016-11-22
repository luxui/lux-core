jest.mock('../lib/localStorage');
import storage from '../lib/localStorage';

import apiClient from './index';

fetch.mockResponse(JSON.stringify({}));

describe('Lux - apiClient', function () {
  it('should exist; and should be a function', function () {
    expect(typeof apiClient).toMatch(/function/i);
  });

  it('should return a Promise', function () {

    return apiClient()
      .then(() => expect(true).toBe(true))
      .catch(() => expect('thrown').toBe('caught'));
  });

  it('should call fetch with capitalized methods', function () {

    return apiClient('/test-2', {method: 'post'})
      .then(() => expect(fetch).lastCalledWith('/test-2', {headers: {}, method: 'POST'}));
  });

  it('should stringify the body', function () {
    const options = {
      body: {name: 'lux'},
      // headers: {},
      method: 'POST',
    };

    return apiClient('/test-3', options)
      .then(() => expect(fetch).lastCalledWith('/test-3', options))
      .catch(() => expect('thrown').toBe('caught'));
  });

  it('should add a request token', function () {
    const token = 'abcde';

    storage.mockReturnValueOnce(token);
    storage.mockReturnValueOnce(token);

    return apiClient('/test-4', {method: 'GET'})
      .then(() => expect(fetch).lastCalledWith('/test-4', {headers: {authorization: token}, method: 'GET'}));
  });
});
