/** @memberof module:lux */

import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import config from './lib/config';
import luxPath from './lib/luxPath';

import Layout from './react-components/layout';
import apiRequest from './apiRequest';

function render(path, data) {
  const requestPath = luxPath(path || window.location);
  const pageData = data || apiRequest((config().root || '') + requestPath);

  ReactDOM.render(<Layout {...pageData} path={requestPath} />, config().root);
}

export default render;
