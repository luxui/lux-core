import { handler } from './responseModel';

function mockResponse(body, status = 200, type = 'application/vnd.siren+json') {

  return {
    body,
    headers: {
      get: () => type
    },
    status,
  };
};

describe('responseModel', function () {
  it('should exist; and should be a function', function () {
    expect(typeof handler).toBe('function');
  });

  it('should resolve to an error if no `status`', function () {
    const expectedError = new Error('Invalid HTTP status code: undefined.');
    const model = handler();

    expect(model.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is not within status code classes', function () {
    const expectedError = new Error('Invalid HTTP status code: 999.');
    const model = handler(mockResponse('WAT!', 999));

    expect(model.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is 1xx', function () {
    const expectedError = new Error('Unexpected HTTP status code: 100.');
    const model = handler(mockResponse('Informational', 100));

    expect(model.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is 3xx', function () {
    const expectedError = new Error('Unexpected HTTP status code: 300.');
    const model = handler(mockResponse('Informational', 300));

    expect(model.error).toEqual(expectedError);
  });

  it('should resolve to an error if `content-type` is not Siren', function () {
    const expectedError = new Error('Invalid content-type, application/json, returned.');
    const model = handler(mockResponse('Just JSON.', 200, 'application/json'));

    expect(model.error).toEqual(expectedError);
  });

  it('should return proper shape', function () {
    const result = Object.keys(handler(mockResponse('Happy path.')));

    expect(result).toEqual(['data', 'error', 'status']);
  });

  it('should return client errors', function () {
    const error = 404;
    const model = handler(mockResponse('Client error.', error));

    expect(model.error).toEqual(new Error(`Received ${error}.`));
    expect(model.status).toBe(error);
  });

  it('should return server errors', function () {
    const error = 500;
    const model = handler(mockResponse('Whooops.', error));

    expect(model.error).toEqual(new Error(`Received ${error}.`));
    expect(model.status).toBe(error);
  });

  it('should handle "good" responses', function () {
    const message = 'Happy path.';
    const model = handler(mockResponse(message));

    expect(model.error).toBe(false);
    expect(model.data).toBe(message);
  });
});
