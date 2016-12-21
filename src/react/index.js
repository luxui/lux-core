/**
 * @module luxReact
 */

// import React from 'react'; // `React` must be in scope when using JSX

import routing from '../lib/routing';

import configure, { apiRoot } from './config';
import render from './render';

function luxReact(path) {
  const URI = routing(path)
    // if the path is registered with the routing API is is a page and therefor
    // not "backed" by the API so load the "root" resource for meta information
    ? apiRoot
    // if the path is not a page it is assumed to be a "resource-backed" page
    // and requesting the resource will either get the resource or an error
    : `${apiRoot}${path}`;

  return render(URI);
}

// export functions for project use
export {
  configure,
  luxReact,
  routing,
};
