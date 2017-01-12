/**
 * @module react
 */

import herald from '../lib/herald';
import routing from '../lib/routing';

import configure, { settings } from './config';

function appFactory(config) {
  try {
    configure(config);

    const app = {
      render,
    };

    app.page = (...args) => {
      routing(...args);

      return app;
    };

    return app;
  } catch (e) {

    return false;
  }
}

function render(path) {
  const root = settings.apiRoot;

  const URI = routing(path)
    // if the path is registered with the routing API it is a page and therefor
    // not "backed" by the API so load the "root" resource for meta information
    ? root
    // if the path is not a page it is assumed to be a "resource-backed" page
    // and requesting the resource will either get the resource or an error
    : `${root}${path}`;

  return herald('render', URI);
}

// export functions for project use
export default appFactory;
