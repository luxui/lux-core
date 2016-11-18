import endpoint from './endpoint';

function locationMock(str) {
  const search = str.match(/\?.*/);
  const pathname = str.replace(search, '');

  return { pathname, search };
}

describe('Library: endpoint', function () {
  it('should be defined', function () {
    expect(endpoint).toBeDefined();
  });

  it('should be a function', function () {
    expect(typeof endpoint).toMatch(/function/i);
  });

  it('should return a string', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}`);
    const result = endpoint(location);

    expect(typeof result).toBe('string');
  });

  it('should return the pathname; if that is all that exists', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}`);
    const result = endpoint(location);

    expect(result).toBe(pathname);
  });

  it('should return the pathname and queryString; when both are present', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}?abc=1234`);
    const result = endpoint(location);

    expect(result).toBe(`${pathname}?abc=1234`);
  });

  it('should return the only queryString; when that\'s all there is', function () {
    const pathname = '';
    const location = locationMock(`${pathname}?abc=1234`);
    const result = endpoint(location);

    expect(result).toBe(`${pathname}?abc=1234`);
  });

  it('should return empty string', function () {
    const pathname = '';
    const location = locationMock(`${pathname}`);
    const result = endpoint(location);

    expect(result).toBe('');
  });
});
