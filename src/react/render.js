/**
 * @module render
 * @memberof luxReact
 */

import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import apiRequest from '../lib/apiRequest';
import { isString } from '../lib/is';
import luxPath from '../lib/luxPath';
import { responseModelFormat } from '../lib/responseModel';

import { config } from './config';
import registry from './componentRegistry';

const errorInvalidConfig = 'Lux must be configured before routing.';
const errorInvalidPath = 'Paths must be strings.';
const Layout = registry('Layout');

// FIXME: figure out how to test this function
// istanbul ignore next
function reactRender(model) {
  ReactDOM.render(<Layout {...model} />, config.renderRoot);
}

function render(path, fn = reactRender) {
  if (!config.renderRoot) {
    throw new Error('Config property `renderRoot` not set.');
  }

  let pending;

  if (!config.apiRoot) {
    pending = new Promise((complete) => {
      complete(responseModelFormat({}, new Error(errorInvalidConfig)));
    });
  } else if (!path || isString(path)) {
    pending = apiRequest(`${config.apiRoot}${luxPath(path)}`);
  } else {
    pending = new Promise((complete) => {
      complete(responseModelFormat({}, new Error(errorInvalidPath)));
    });
  }

  return pending
    .then(fn);
}

export default render;
