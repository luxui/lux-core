/**
 * @module react/configure
 * @memberof react
 */

import broker from '../lib/broker';
import { isString } from '../lib/is';

import herald from '../lib/herald';

const settings = {};

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
  window.onpopstate = herald.bind(0, 'render');

  broker({
    apiRoot,
    renderRoot,
  }, settings);
}

export default configure;

export { settings };
