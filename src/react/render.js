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

function render(path) {
  if (!config.renderRoot) {
    throw new Error('Config property `root` has not been set yet.');
  }

  let pending;

  if (!config.apiRoot) {
    pending = new Promise((resolve) => {
      resolve(responseModelFormat({}, new Error(errorInvalidConfig)));
    });
  } else if (!path || isString(path)) {
    pending = apiRequest(`${config.apiRoot}${luxPath(path)}`);
  } else {
    pending = new Promise((resolve) => {
      resolve(responseModelFormat({}, new Error(errorInvalidPath)));
    });
  }

  return pending
    .then((model) => {
      ReactDOM.render(<Layout {...model} />, config.renderRoot);
    });
}

export default render;
