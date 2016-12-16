jest.mock('../lib/apiRequest');
import apiRequest from '../lib/apiRequest';

import { config } from './config';
import registry from './componentRegistry';
import render from './render';

describe('render', function () {
  beforeEach(function () {
    delete config.apiRoot;
    delete config.renderRoot;
  });

  it('should exist; and should be a function', function () {
    expect(typeof render).toBe('function');
  });

  it('should throw an error because `renderRoot` is not set', function () {
    expect(render).toThrow('Config property `renderRoot` not set.');
  });

  it('should resolve to an error when `apiRoot` is not set in config', function () {
    config.renderRoot = '#renderRoot';

    return render('', function (model) {
      expect(model.data.error).toEqual(new Error('Lux must be configured before routing.'));
    });
  });

  it('should resolve to an error when `path` is not a string', function () {
    config.renderRoot = '#renderRoot';
    config.apiRoot = 'http://foo.bar';

    return render(1234, function (model) {
      expect(model.data.error).toEqual(new Error('Paths must be strings.'));
    });
  });

  it('should make an API request', function () {
    config.renderRoot = '#renderRoot';
    config.apiRoot = 'http://foo.bar';

    apiRequest
      .mockReturnValueOnce(new Promise(resolve => resolve(config.apiRoot)));

    return render('', function (model) {
      expect(model).toBe(config.apiRoot);
    });
  });
});
