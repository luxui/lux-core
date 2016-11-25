jest.mock('./responseModel');
import responseModel from './responseModel';

jest.mock('../lib/storage');
import storage from '../lib/storage';

import apiClient from './index';

// this will have its own tests; no need to validate in these tests
responseModel.mockImplementation(_ => _);

describe('Lux - apiClient', function () {
  it('should exist; and should be a function', function () {
    expect(typeof apiClient).toMatch(/function/i);
  });

  it('should return a Promise', function () {
    fetch.mockResponseOnce(JSON.stringify({}));

    return apiClient()
      .then(() => expect(true).toBe(true))
      .catch(() => expect('thrown').toBe('caught'));
  });

  it('should call fetch with capitalized methods', function () {
    fetch.mockResponseOnce(JSON.stringify({}));

    return apiClient('/test-2', {method: 'post'})
      .then(() => expect(fetch).lastCalledWith('/test-2', {headers: {}, method: 'POST'}));
  });

  it('should stringify the body', function () {
    fetch.mockResponseOnce(JSON.stringify({}));

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
    fetch.mockResponseOnce(JSON.stringify({}));

    const token = 'abcde';

    storage.mockReturnValueOnce(token); // call to see if there is a value
    storage.mockReturnValueOnce(token); // call to use the value

    return apiClient('/test-4', {method: 'GET'})
      .then(() => expect(fetch).lastCalledWith('/test-4', {headers: {authorization: token}, method: 'GET'}));
  });

  it('should retry if authorization token might be expired', function () {
    storage.mockReturnValueOnce('abcde');
    fetch.mockResponses(
      [JSON.stringify({ error: 'auth token expired' }), { status: 403 }],
      [JSON.stringify({ retry: 'successful' }), { status: 200 }],
    );

    return apiClient('/retry')
      .then(response => expect(response.retry).toBe('successful'));
  });
});
