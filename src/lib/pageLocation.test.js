import pageLocation from './pageLocation';

function locationMock(str) {
  const search = str.match(/\?.*/);
  const pathname = str.replace(search, '');

  return { pathname, search };
}

describe('Library: pageLocation', function () {
  it('should be defined', function () {
    expect(pageLocation).toBeDefined();
  });

  it('should be a function', function () {
    expect(typeof pageLocation).toMatch(/function/i);
  });

  it('should return a string', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}`);
    const result = pageLocation(location);

    expect(typeof result).toBe('string');
  });

  it('should return the pathname; if that is all that exists', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}`);
    const result = pageLocation(location);

    expect(result).toBe(pathname);
  });

  it('should return the pathname and queryString; when both are present', function () {
    const pathname = '/path/to/resource';
    const location = locationMock(`${pathname}?abc=1234`);
    const result = pageLocation(location);

    expect(result).toBe(`${pathname}?abc=1234`);
  });

  it('should return the only queryString; when that\'s all there is', function () {
    const pathname = '';
    const location = locationMock(`${pathname}?abc=1234`);
    const result = pageLocation(location);

    expect(result).toBe(`${pathname}?abc=1234`);
  });

  it('should return empty string', function () {
    const pathname = '';
    const location = locationMock(`${pathname}`);
    const result = pageLocation(location);

    expect(result).toBe('');
  });
});
