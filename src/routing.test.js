import routing from './routing';

describe('Lux - routing', function () {
  it('should exist; and should be a function', function () {
    expect(typeof routing).toMatch(/function/i);
  });

  it('should throw an error when no parameters are provided', function () {
    expect(routing).toThrow('No "PathMatcher" function provided to routing API.');
  });

  it('should throw an error when too many parameters are provided', function () {
    expect(function() {
      routing(1, 2, 3);
    }).toThrow('Too many arguments provided to routing API.');
  });

  it('should throw an error if the provided handler is not a function', function () {
    expect(function () {
      routing('/test1', null);
    }).toThrow('No "handler" function provided to routing API.');
  });

  it('should throw an error if the provided matcher is not a PathMatcher', function () {
    const matcher = 1234;
    const type = typeof matcher;

    expect(function () {
      routing(matcher, function(path) {});
    }).toThrow(`Invalid "PathMatcher" type (${type}) provided to routing API.`);
  });

  it('should allow geting/setting of the `/error` handler', function () {
    routing('/error', function () {

      return true;
    });

    const handler = routing('/error');

    expect(handler()).toBe(true);
  });

  it('should allow re-setting of the `/error` handler', function () {
    routing('/error', () => false);

    expect(routing('/error')()).toBe(false);
  });

  it('should throw an error when attempting to reset a route handler', function () {
    routing('/setRoute', () => {});

    expect(function () {
      routing('/setRoute', () => {});
    }).toThrow('Routing API already has a handler registerd for PathMatcher: /setRoute.');
  });

  it('should allow setting a RegExp PathMatcher', function () {
    routing(/\/abc/i, () => 'abc');

    const handler = routing('/abc');

    expect(handler()).toBe('abc');
  });

  it('should return the default `/error` handler for unmatched routes', function () {
    routing('/error', () => 'error handler');

    const handler = routing('/unrecognized');

    expect(handler()).toBe('error handler');
  });

  it('should allow setting of a Function PathMatcher', function () {
    routing((path) => path === '/something-complicated', () => 'smile');

    const handler = routing('/something-complicated');

    expect(handler()).toBe('smile');
  });
});
