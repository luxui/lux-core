import config from './lib/config';
import { isString } from './lib/is';

import render from './render';

export * from './routing';

/**
 * @typedef Path
 * @type {string}
 *
 * @description
 * Path string should always start with '/', but can include querystring
 * parameters; the pathname and querystring parameters will be passed along in
 * the API calls.
 */

/**
 * The `lux` function is the entry-point to configuration, and routing
 * (rendering pages), for applications built within Lux. No routing will be
 * available until a valid configuration is supplied; otherwise it will throw
 * errors and render only an error page. Once configured correctly all
 * subsequent calls will attempt to route (render a page) based on the `path`
 * provided and any `data`.
 *
 * @param  {(LuxConfig|Path)} pathOrConfig
 * @param  {object} data
 *         Any JavaScript object that should be used in favor of fetching data
 *         from the API.
 *
 * @return {undefined}
 *         No return value.
 *
 * @example
 * import lux from '@luxui/core';
 *
 * // initialize the application and load the first page based on the URL
 * lux({ root: 'http://example/com/api' });
 *
 * @example
 * import lux from '@luxui/core';
 *
 * // route to the path given if not already at that path
 * lux('/home');
 */
function lux(pathOrConfig, data) {
  const { initialPath, isValid } = config();
  let path;

  if (isValid) {
    if (pathOrConfig) {
      if (isString(pathOrConfig)) {
        // typical execution path; pathOrConfig is a path to an application page
        path = pathOrConfig;
      } else {
        const type = typeof pathOrConfig;

        path = '/error';
        data = new Error(`Paths must be strings: ${type} provided.`);
      }
    } else {
      path = initialPath;
    }
  } else {
    try {
      // attempt initialization
      path = config(pathOrConfig).initialPath;
      // listen for history changes and re-render; don't "break" back button
      window.onpopstate = render.bind(null, null, null); // block two args
    } catch (configurationError) {
      path = '/error';
      data = configurationError;
    }
  }

  render(path, data);
}

export default lux;
