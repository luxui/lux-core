/**
 * @module luxReact
 */

// import React from 'react'; // `React` must be in scope when using JSX

import routing from '../lib/routing';

import configure from './config';
import render from './render';

function luxReact(path) {
  const root = configure('apiRoot');

  const URI = routing(path)
    // if the path is registered with the routing API it is a page and therefor
    // not "backed" by the API so load the "root" resource for meta information
    ? root
    // if the path is not a page it is assumed to be a "resource-backed" page
    // and requesting the resource will either get the resource or an error
    : `${root}${path}`;

  return render(URI);
}

// export functions for project use
export {
  configure,
  luxReact,
  routing,
};
