import 'whatwg-fetch';

import storage from '../lib/localStorage';

function apiClient(path = '/', options = {}) {
  options.method = (options.method || 'GET').toUpperCase();

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  /* istanbul ignore else */
  if (!options.headers) {
    options.headers = {};
  }

  if (storage('authToken')) {
    options.headers.authorization = storage('authToken');
  }

  return fetch(path, options)
    .then(res => res.json());
}

export default apiClient;
