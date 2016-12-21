import urlParse from './urlParse';

const url = 'http://user:password@example.co.uk:808080/path/to/resource?a=1,2,3&bcde=4565#anchorWithinPage'

describe('Library: urlParse', () => {
  it('should exist', () => {
    expect(urlParse).toBeDefined();
  });

  it('should extract "protocol"', function () {
    expect(urlParse(url).protocol).toBe('http:');
  });

  it('should extract "auth"', function () {
    expect(urlParse(url).auth).toBe('user:password');
  });

  it('should extract "host"', function () {
    expect(urlParse(url).host).toBe('example.co.uk:808080');
  });

  it('should extract "hostname"', function () {
    expect(urlParse(url).hostname).toBe('example.co.uk');
  });

  it('should extract "port"', function () {
    expect(urlParse(url).port).toBe('808080');
  });

  it('should extract "path"', function () {
    expect(urlParse(url).path).toBe('/path/to/resource?a=1,2,3&bcde=4565');
  });

  it('should extract "pathname"', function () {
    expect(urlParse(url).pathname).toBe('/path/to/resource');
  });

  it('should extract "query"', function () {
    expect(urlParse(url).query).toBe('a=1,2,3&bcde=4565');
  });

  it('should extract "search"', function () {
    expect(urlParse(url).search).toBe('?a=1,2,3&bcde=4565');
  });

  it('should extract "hash"', function () {
    expect(urlParse(url).hash).toBe('#anchorWithinPage');
  });

  it('should parse a simple URL', function () {
    expect(urlParse('http://example.com')).toEqual({
      auth: '',
      hash: '',
      host: 'example.com',
      hostname: 'example.com',
      param: {},
      path: '',
      pathname: '',
      port: '',
      protocol: 'http:',
      query: '',
      search: '',
    });
  });

  it('should parse a protocol-less URL', function () {
    expect(urlParse('//example.com/page')).toEqual({
      auth: '',
      hash: '',
      host: 'example.com',
      hostname: 'example.com',
      param: {},
      path: '/page',
      pathname: '/page',
      port: '',
      protocol: '',
      query: '',
      search: '',
    });
  });

  it('should parse a path-only URL', function () {
    expect(urlParse('/path/to/page?error=whoops&show=true&hide=false')).toEqual({
      auth: '',
      hash: '',
      host: '',
      hostname: '',
      param: {
        error: 'whoops',
        hide: false,
        show: true,
      },
      path: '/path/to/page?error=whoops&show=true&hide=false',
      pathname: '/path/to/page',
      port: '',
      protocol: '',
      query: 'error=whoops&show=true&hide=false',
      search: '?error=whoops&show=true&hide=false',
    });
  });

  it('should parse a search-only URL', function () {
    expect(urlParse('?error=whoops&show=true&hide=false')).toEqual({
      auth: '',
      hash: '',
      host: '',
      hostname: '',
      param: {
        error: 'whoops',
        hide: false,
        show: true,
      },
      path: '?error=whoops&show=true&hide=false',
      pathname: '',
      port: '',
      protocol: '',
      query: 'error=whoops&show=true&hide=false',
      search: '?error=whoops&show=true&hide=false',
    });
  });

  it('should parse a hash-only URL', function () {
    expect(urlParse('#welcome')).toEqual({
      auth: '',
      hash: '#welcome',
      host: '',
      hostname: '',
      param: {},
      path: '',
      pathname: '',
      port: '',
      protocol: '',
      query: '',
      search: '',
    });
  });

  it('should throw an error when given an ambiguous string', function () {
    const input = 'something-ambiguous';

    expect(function () {
      const result = urlParse(input);
    }).toThrow(`Unparsable URL: (${typeof input}) "${input}".`);
  });

  it('should throw an error when given a non-string', function () {
    const input = 1234;

    expect(function () {
      const result = urlParse(input);
    }).toThrow(`URLs must be strings: "number" provided`);
  });
});
