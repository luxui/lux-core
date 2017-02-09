/**
 * @module react/configure
 * @memberof react
 */

import broker from '../lib/broker';
import { isString, isElement } from '../lib/is';

import herald from '../lib/herald';

const settings = {};

/**
 * @typedef {BrokeredObject} LuxConfig
 * @global
 *
 * @property {String} apiRoot - The URI for the "root" API resource.
 * @property {HTMLElement} renderRoot - The DOM element to host the application.
 */

/**
 * Configuration validation function.
 *
 * @param {LuxConfig} object - Destructured into:
 * @param {String} object.apiRoot - See {@see LuxConfig}
 * @param {HTMLElement} object.renderRoot - See {@see LuxConfig}
 *
 * @return {LuxConfig} - A BrokeredObject instance of LuxConfig.
 */
function configure({ apiRoot, renderRoot }) {
  if (!apiRoot) {
    throw new Error('Config property `apiRoot` not provided.');
  } else if (!isString(apiRoot)) {
    // eslint-disable-next-line max-len
    throw new Error(`Config property \`apiRoot\` must be a string; ${typeof apiRoot} provided.`);
  }

  if (!renderRoot) {
    throw new Error('Config property `renderRoot` not provided.');
  } else if (!isElement(renderRoot)) {
    // eslint-disable-next-line max-len
    throw new Error(`Config property \`renderRoot\` must be a DOM element; ${typeof renderRoot} provided.`);
  }

  // listen for history changes and re-render; don't "break" back button
  window.onpopstate = herald.bind(0, 'render');

  broker({
    apiRoot,
    renderRoot,
  }, settings);

  return settings;
}

export default configure;

export { settings };
