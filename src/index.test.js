jest.mock('./apiRequest');
import apiRequestMock from './apiRequest';

import lux, {
  apiRequest,
  init,
  luxPath,
  routing,
  storage,
} from './index';

describe('lux-core', function () {
  describe('[API]', function () {
    it('should exist; and should be a function', function () {
      expect(typeof lux).toMatch(/function/i);
    });

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

  describe('[Configuration]', function () {
    it('should throw an Error when required a configuration object is omitted', function () {
      const error = new Error('A configuration object - LuxConfig - is required.');
      // const config = {}; // intentionally removed

      expect(init).toThrow(error);
    });

    it('should throw an Error when required property `api` is omitted from configuration', function () {
      const error = new Error('Configuration property `api` not provided in config object.');
      const config = {};

      expect(function () {
        init(config);
      }).toThrow(error);
    });

    it('should throw an Error when required property `api` is not a String', function () {
      const error = new Error('Configuration property `api` is not a string.');
      const config = {
        api: 1234
      };

      expect(function () {
        init(config);
      }).toThrow(error);
    });

    it('should throw an Error if optional property `initialPath` is not a string', function () {
      const error = new Error('Configuration property `initialPath` is not a string.');
      const config = {
        api: 'http://example.com',
        initialPath: 1234,
      };

      expect(function () {
        init(config);
      }).toThrow(error);
    });
  });

  describe('[Routing]', function () {
    const random = Math.random().toString(32).slice(2);
    const mockResponse = {
      data: random,
      headers: {
        get: () => 'application/vnd.siren+json'
      },
      status: 200,
    };

    it('should fail resolve to an error if configuration is invalid', function () {
      const error = new Error('Lux must be configured before routing.');

      return lux('/')
        .then(response => expect(response.error).toEqual(error));
    });

    it('should initialize and call `render()`', function () {
      apiRequestMock
        .mockReturnValueOnce(new Promise(resolve => resolve(mockResponse)));

      const config = {
        api: 'http://example.com',
        render: ({ data }) => expect(data).toBe(random),
      };

      return lux('/', config);
    });

    it('should', function () {
      const error = new Error('Paths must be strings.');

      return lux(1234)
        .then(response => expect(response.error).toEqual(error));
    });
  });
});
