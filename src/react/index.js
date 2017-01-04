/**
 * @module react
 */

// import React from 'react'; // `React` must be in scope when using JSX

import herald from '../lib/herald';
import routing from '../lib/routing';

import configure from './config';
import render from './render';

herald((message, path) => {
  /* istanbul ignore else */
  if (message === 'render') {
    render(path);
  }
});

function luxReact(path) {
  const root = configure('apiRoot');

  const URI = routing(path)
    // if the path is registered with the routing API it is a page and therefor
    // not "backed" by the API so load the "root" resource for meta information
    ? root
    // if the path is not a page it is assumed to be a "resource-backed" page
    // and requesting the resource will either get the resource or an error
    : `${root}${path}`;

  return herald('render', URI);
}

// export functions for project use
export {
  configure,
  luxReact,
  routing,
};
