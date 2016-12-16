import responseModel from './responseModel';

function mockResponse(data, status = 200, type = 'application/vnd.siren+json') {

  return {
    data,
    headers: {
      get: () => type
    },
    status,
  };
};

describe('responseModel', function () {
  it('should exist; and should be a function', function () {
    expect(typeof responseModel).toMatch(/function/i);
  });

  it('should resolve to an error if no `status`', function () {
    const expectedError = new Error('Invalid HTTP status code: undefined.');
    const model = responseModel();

    expect(model.data.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is not within status code classes', function () {
    const expectedError = new Error('Invalid HTTP status code: 999.');
    const model = responseModel(mockResponse('WAT!', 999));

    expect(model.data.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is 1xx', function () {
    const expectedError = new Error('Unexpected HTTP status code: 100.');
    const model = responseModel(mockResponse('Informational', 100));

    expect(model.data.error).toEqual(expectedError);
  });

  it('should resolve to an error if `status` is 3xx', function () {
    const expectedError = new Error('Unexpected HTTP status code: 300.');
    const model = responseModel(mockResponse('Informational', 300));

    expect(model.data.error).toEqual(expectedError);
  });

  it('should resolve to an error if `content-type` is not Siren', function () {
    const expectedError = new Error('Invalid content-type, application/json, returned.');
    const model = responseModel(mockResponse('Just JSON.', 200, 'application/json'));

    expect(model.data.error).toEqual(expectedError);
  });

  it('should return proper shape', function () {
    const result = Object.keys(responseModel(mockResponse('Happy path.')));

    expect(result).toEqual(['data', 'error', 'status']);
  });

  it('should return client errors', function () {
    const error = 404;
    const result = responseModel(mockResponse('Client error.', error));

    expect(result.data.error).toEqual(new Error(`Received ${error}.`));
    expect(result.status).toBe(error);
  });

  it('should return server errors', function () {
    const error = 500;
    const result = responseModel(mockResponse('Whooops.', error));

    expect(result.data.error).toEqual(new Error(`Received ${error}.`));
    expect(result.status).toBe(error);
  });

  it('should handle "good" responses', function () {
    const message = 'Happy path.';
    const result = responseModel(mockResponse(message));

    expect(result.data.error).toBeUndefined();
    expect(result.data).toBe(message);
  });
});
