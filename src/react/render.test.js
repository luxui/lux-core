// jest.mock('../lib/herald');
import herald from '../lib/herald';

jest.mock('../lib/apiRequest');
import apiRequest from '../lib/apiRequest';

import { settings } from './config';
import registry from '../lib/componentRegistry';
import render from './render';

describe('render', function () {
  beforeEach(function () {
    delete settings.apiRoot;
    delete settings.renderRoot;
  });

  it('should exist; and should be a function', function () {
    expect(typeof render).toBe('function');
  });

  it('should throw an error because `renderRoot` is not set', function () {
    expect(render).toThrow('Config property `renderRoot` not set.');
  });

  it('should resolve to an error when `apiRoot` is not set in config', function () {
    settings.renderRoot = '#renderRoot';

    return render('', function (_, model) {
      expect(model.error).toEqual(new Error('Lux must be configured before routing.'));
    });
  });

  it('should resolve to an error when `path` is not a string', function () {
    settings.renderRoot = '#renderRoot';
    settings.apiRoot = 'http://foo.bar';

    return render(1234, function (_, model) {
      expect(model.error).toEqual(new Error('Unparsable URL: (string) "1234".'));
    });
  });

  it('should make an API request', function () {
    settings.renderRoot = '#renderRoot';
    settings.apiRoot = 'http://foo.bar';

    const resolvedData = 'API response';
    const resourcePath = '/anything';

    apiRequest
      .mockReturnValueOnce(new Promise(resolve => resolve(resolvedData)));

    return render(resourcePath, function (path, model) {
      expect(model).toBe(resolvedData);
      expect(path).toBe(resourcePath);
    });
  });

  it('should attempt to render', function () {
    expect(function () {
      herald('render', '/');
    }).toThrow('Config property `renderRoot` not set.');
  });
});
