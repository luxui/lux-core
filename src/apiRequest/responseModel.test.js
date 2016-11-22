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

describe('Lux - responseModel', function () {
  it('should exist; and should be a function', function () {
    expect(typeof responseModel).toMatch(/function/i);
  });

  it('should throw if no `status`', function () {
    expect(responseModel).toThrow('Invalid HTTP status code: undefined.');
  });

  it('should throw if invalid `status`; NOT precise', function () {
    expect(function () {
      responseModel(mockResponse('WAT!', 999));
    }).toThrow('Invalid HTTP status code: 999.');
  });

  it('should throw on 1xx response statuses', function () {
    expect(function () {
      responseModel(mockResponse('Informational.', 100));
    }).toThrow('Unexpected API response status: 100.');
  });

  it('should throw on 3xx response statuses', function () {
    expect(function () {
      responseModel(mockResponse('Informational.', 300));
    }).toThrow('Unexpected API response status: 300.');
  });

  it('should return proper shape', function () {
    const result = Object.keys(responseModel(mockResponse('Happy path.')));

    expect(result).toEqual(['data', 'error', 'status']);
  });

  it('should return client errors', function () {
    const result = responseModel(mockResponse('Client error.', 404));

    expect(result.error).toBe(true);
    expect(result.status).toBe(404);
  });

  it('should return server errors', function () {
    const result = responseModel(mockResponse('Whooops.', 500));

    expect(result.error).toBe(true);
    expect(result.status).toBe(500);
  });

  it('should handle invalid content-type', function () {
    const result =

    expect(function () {
      responseModel(mockResponse('Just JSON.', 200, 'application/json'));
    }).toThrow('Invalid content-type, application/json, returned.');
  });


  it('should handle "good" responses', function () {
    const result = responseModel(mockResponse('Happy path.'));

    expect(result.error).toBe(false);
    expect(result.data).toBe('Happy path.');
  });
});
