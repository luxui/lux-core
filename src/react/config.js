/**
 * @module configure
 * @memberof core-lux
 */

import render from './render';

import { isString } from '../lib/is';

const config = {};

function configure({ apiRoot, renderRoot }) {
  if (!apiRoot) {
    throw new Error('Config property `apiRoot` not provided.');
  } else if (!isString(apiRoot)) {
    // eslint-disable-next-line max-len
    throw new Error(`Config property \`apiRoot\` must be a string; ${typeof apiRoot} provided.`);
  }

  if (!renderRoot) {
    throw new Error('Config property `renderRoot` not provided.');
  } else if (!isString(renderRoot)) {
    // eslint-disable-next-line max-len
    throw new Error(`Config property \`renderRoot\` must be a string; ${typeof renderRoot} provided.`);
  }

  // listen for history changes and re-render; don't "break" back button
  // NOTE: intentionally wrapped in anonymous function to ensure no arguments
  window.onpopstate = () => render();

  config.apiRoot = apiRoot;
  config.renderRoot = renderRoot;

  return render;
}

export default configure;

export { config };
