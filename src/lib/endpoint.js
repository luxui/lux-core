import urlParse from 'url-parse';

import { isString } from './is';

function pageLocation(loc) {
  const url = isString(loc) ? urlParse(loc) : loc;
  const path = url.pathname.replace(/\/+$/, '');
  const search = url.search || '';

  return path + search;
}

export default pageLocation;
