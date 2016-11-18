import lux from './index';

jest.mock('./render');
import render from './render';

describe('Lux - Core', function () {
  it('should exist; and should be a function', function () {
    expect(typeof lux).toMatch(/function/i);
  });

  it('should call render routing to `/error` with the error as data', function () {
    lux({
      api: '//hello.world',
    });

    expect(render).lastCalledWith('/error', Error('Required property `routing` not provided in config object.'));
  });

  it('should call render with no arguments supplied', function () {
    lux({
      api: '//hello.world',
      routing() {},
    });

    expect(render).lastCalledWith(undefined, undefined);
  });

  it('should call render with no arguments supplied; after valid configuration is setup', function () {
    lux();

    expect(render).lastCalledWith('/error', Error('Paths must be strings: undefined.'));
  });

  it('should call render with "/home"', function () {
    lux('/home');

    expect(render).lastCalledWith('/home', undefined);
  });
});
