import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import config from './lib/config';
import endpoint from './lib/endpoint';

import Layout from './react-components/layout';
import apiRequest from './apiRequest';

function render(path, data) {
  const requestPath = endpoint(path || window.location);
  const pageData = data || apiRequest((config().root || '') + requestPath);

  ReactDOM.render(<Layout {...pageData} path={requestPath} />, config().root);
}

export default render;
