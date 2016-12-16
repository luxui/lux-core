/**
 * @module lux-react
 */

import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import apiRequest from '../lib/apiRequest';
import { isString } from '../lib/is';
import luxPath from '../lib/luxPath';
import { responseModelFormat } from '../lib/responseModel';

import registry from './componentRegistry';

const config = {};
const errorInvalidConfig = new Error('Lux must be configured before routing.');
const errorInvalidPath = new Error('Paths must be strings.');
const Layout = registry('Layout');

function errorStr(prop, problem) {

  return `Configuration property \`${prop}\` ${problem}.`;
}

function configure({ api, root }) {
  if (!api) {
    throw new Error(errorStr('api', 'not provided in config object'));
  } else if (!isString(api)) {
    throw new Error(errorStr('api', 'must be a string'));
  }

  if (!root) {
    throw new Error(errorStr('root', 'not provided in config object'));
  } else if (!isString(root)) {
    throw new Error(errorStr('root', 'must be a string'));
  }

  // listen for history changes and re-render; don't "break" back button
  // NOTE: intentionally wrapped in anonymous function to ensure no arguments
  window.onpopstate = () => render();

  config.api = api;
  config.renderRoot = root;

  return render;
}

function render(path) {
  if (!config.renderRoot) {
    throw new Error(errorStr('renderRoot', 'has not been set yet.'));
  }

  let pending;

  if (!config.api) {
    pending = new Promise(resolve =>
      resolve(responseModelFormat({}, errorInvalidConfig)));
  } else if (!path || isString(path)) {
    pending = apiRequest(config.api + luxPath(path));
  } else {
    pending = new Promise(resolve =>
      resolve(responseModelFormat({}, errorInvalidPath)));
  }

  return pending
    .then((model) => {
      ReactDOM.render(<Layout {...model} />, config.renderRoot);
    });
}

export default render;

export {
  /** @see configure */
  configure,
  /** @see componentRegistry */
  registry,
};
