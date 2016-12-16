import luxPath from './luxPath';

function locationMock(str) {
  const query = str.match(/\?.*/);
  const pathname = str.replace(query, '');

  return { pathname, query, toString: () => `${pathname}${query || ''}` };
}

describe('Library: luxPath', function () {
  it('should be defined and be a function', function () {
    expect(typeof luxPath).toMatch(/function/i);
  });

  describe('[Location Object]', function () {
    it('should return a string', function () {
      const pathname = '/path/to/resource';
      const location = locationMock(`${pathname}`);
      const result = luxPath(location);

      expect(typeof result).toBe('string');
    });

    it('should return the pathname; if that is all that exists', function () {
      const pathname = '/path/to/resource';
      const location = locationMock(`${pathname}`);
      const result = luxPath(location);

      expect(result).toBe(pathname);
    });

    it('should return the pathname and queryString; when both are present', function () {
      const pathname = '/path/to/resource';
      const location = locationMock(`${pathname}?abc=1234`);
      const result = luxPath(location);

      expect(result).toBe(`${pathname}?abc=1234`);
    });

    it('should return the only queryString; when that\'s all there is', function () {
      const pathname = '';
      const location = locationMock(`${pathname}?abc=1234`);
      const result = luxPath(location);

      expect(result).toBe(`${pathname}?abc=1234`);
    });

    it('should return empty string', function () {
      const pathname = '';
      const location = locationMock(`${pathname}`);
      const result = luxPath(location);

      expect(result).toBe(pathname);
    });
  });

  describe('[Location String]', function () {
    it('should return only a pathname when only a pathname exists', function () {
      const pathname = '/hello';
      const location = `http://example.com${pathname}`;
      const result = luxPath(location);

      expect(result).toBe(pathname);
    });

    it('should', function () {
      const querystring = '?zxy=123';
      const location = `http://example.com${querystring}`
      const result = luxPath(location);

      expect(result).toBe(querystring);
    });
  });
});
