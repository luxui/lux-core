import config from './lib/config';
import { isString } from './lib/is';

import render from './render';

/**
 * @typedef Config
 * @type {object}
 *
 * @property {string} root
 *           The root URL for the API backing the application.
 * @property {function} [routing]
 *           Additional routing functions for custom handling of "pages".
 */

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
 * @param  {(Config|Path)} pathOrConfig
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
  if (config().isValid) {
    if (pathOrConfig && isString(pathOrConfig)) {
      // typical execution path; pathOrConfig is a path to an application page
      render(pathOrConfig, data);
    } else {
      render('/error', new Error(`Paths must be strings: ${pathOrConfig}.`));
    }
  } else {
    try {
      // attempt initialization
      config(pathOrConfig);
      // config is "good" render initial page
      render(config().initialPath, data);
      // listen for history changes and re-render;
      // a.k.a. don't break "back" button
      /* istanbul ignore next */
      window.onpopstate = () => { render(); };
    } catch (e) {
      render('/error', e);
    }
  }
}

export default lux;
