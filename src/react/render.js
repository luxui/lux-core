/**
 * @module render
 * @memberof luxReact
 */

import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import apiRequest from '../lib/apiRequest';
import luxPath from '../lib/luxPath';
import { format as responseModelFormat } from '../lib/responseModel';

import { config } from './config';
import registry from './componentRegistry';

const errorInvalidConfig = 'Lux must be configured before routing.';
const Layout = registry('Layout');

function promiseOfAnError(error) {

  return new Promise((complete) => {
    complete(responseModelFormat({}, error));
  });
}

// FIXME: figure out how to test this function
// istanbul ignore next
function reactRender(path, model) {
  ReactDOM.render(<Layout {...model} path={path} />, config.renderRoot);
}

function render(path, fn = reactRender) {
  if (!config.renderRoot) {
    // this cannot use `promiseOfAnError` because `reactRender` would not know
    // where to "render" content to.
    throw new Error('Config property `renderRoot` not set.');
  }

  let pending;
  let requestedPath;

  try {
    requestedPath = luxPath(path);

    if (!config.apiRoot) {
      pending = promiseOfAnError(new Error(errorInvalidConfig));
    } else {
      pending = apiRequest(`${config.apiRoot}${requestedPath}`);
    }
  } catch (e) {
    pending = promiseOfAnError(e);
  }

  return pending
    .then(model => fn(requestedPath, model));
}

export default render;
