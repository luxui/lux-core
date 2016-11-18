import URL from 'url-parse';

import config from './lib/config';

const APIroot = config().root;

function call(path, options) {
  const url = new URL(path);
  const requestURL = `${APIroot}${url.pathname + url.query}`;

  options.method = (options.method || 'GET').toUpperCase();

  /* istanbul ignore else */
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  /* istanbul ignore else */
  if (!options.headers) {
    options.headers = {};
  }
}

export default call;
