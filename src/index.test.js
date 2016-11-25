jest.mock('./lib/config');
import config from './lib/config';

jest.mock('./render');
import render from './render';

import lux, {
  apiRequest,
  routing,
  luxPath,
  storage,
} from './index';

describe('Lux - Core', function () {
  it('should exist; and should be a function', function () {
    expect(typeof lux).toMatch(/function/i);
  });

  describe('[pre-configuration]', function () {
    it('should route to `/error` passing the error as data; when configuration is not valid', function () {
      const noConfig = 'No configuration provided.';

      config.mockImpl(function () {
        throw new Error(noConfig);
      });
      config.mockReturnValueOnce({});

      lux();

      expect(render).lastCalledWith('/error', Error(noConfig));
    });

    it('should route to `/initialPath` passing no data; when configuration is valid', function () {
      config.mockReturnValueOnce({});
      config.mockReturnValueOnce({
        initialPath: '/initialPath',
        isValid: true,
      });

      lux({});

      expect(render).lastCalledWith('/initialPath', undefined);
    });
  });

  describe('[post-configuration]', function () {
    it('should route to (configured) `initialPath` passing no data; when no path is provided', function () {
      config.mockReturnValueOnce({
        initialPath: '/',
        isValid: true,
      });

      lux();

      expect(render).lastCalledWith('/', undefined);
    });

    it('should route to the provided path passing no data', function () {
      config.mockReturnValueOnce({
        initialPath: '/',
        isValid: true,
      });

      lux('/home');

      expect(render).lastCalledWith('/home', undefined);
    });

    it('should route to `/error` passing the error as data; when configuration is valid but an non-string is passed as a path', function () {
      config.mockReturnValueOnce({
        isValid: true,
      });

      lux(1234);

      expect(render).lastCalledWith('/error', Error('Paths must be strings: number provided.'));
    });
  });

  describe('[exports]', function () {
    it('should expose apiRequest', function () {
      expect(typeof apiRequest).toMatch(/function/i);
    });

    it('should expose routing', function () {
      expect(typeof routing).toMatch(/function/i);
    });

    it('should expose luxPath', function () {
      expect(typeof luxPath).toMatch(/function/i);
    });

    it('should expose storage', function () {
      expect(typeof storage).toMatch(/function/i);
    });
  });
});
