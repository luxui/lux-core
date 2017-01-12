/**
 * @module react/render
 * @memberof react
 */

import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import apiRequest from '../lib/apiRequest';
import registry from '../lib/componentRegistry';
import herald from '../lib/herald';
import luxPath from '../lib/luxPath';
import { format as responseModelFormat } from '../lib/responseModel';

import { settings } from './config';

const Layout = registry('Layout');

function promiseOfAnError(error) {

  return new Promise((resolve) => {
    resolve(responseModelFormat({}, error));
  });
}

// FIXME: test this function
// istanbul ignore next
function reactRender(path, model) {
  ReactDOM.render(<Layout {...model} path={path} />, settings.renderRoot);
}

function render(path, fn = reactRender) {
  if (!settings.renderRoot) {
    // this cannot use `promiseOfAnError` because `reactRender` would not know
    // where to "render" content to.
    throw new Error('Config property `renderRoot` not set.');
  }

  let pending;
  let requestedPath;

  try {
    requestedPath = luxPath(path);

    if (!settings.apiRoot) {
      // eslint-disable-next-line max-len
      pending = promiseOfAnError(new Error('Lux must be configured before routing.'));
    } else {
      pending = apiRequest(`${settings.apiRoot}${requestedPath}`);
    }
  } catch (e) {
    pending = promiseOfAnError(e);
  }

  return pending
    .then(model => fn(requestedPath, model));
}

herald((message, path) => {
  /* istanbul ignore else */
  if (message === 'render') {
    render(path);
  }
});

export default render;
