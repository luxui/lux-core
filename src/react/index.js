/**
 * @module react
 */

import React from 'react'; // `React` must be in scope when using JSX
import ReactDOM from 'react-dom';

import { addType } from './form/field/types';
import apiRequest from '../lib/apiRequest';
import { isFunction, isString } from '../lib/is';
import luxPath from '../lib/luxPath';
import registry from '../lib/componentRegistry';
import { format as responseModelFormat } from '../lib/responseModel';
import routing from '../lib/routing';

import configure from './config';

import Context from './appContext';
import Fatal from './fatal';
import './layout';

const Layout = registry('Layout');

/**
 * @typedef {Object} LuxUIApp
 * @global
 *
 * @description
 * LuxUI application instance.
 *
 * @property {LuxConfig} config - @see module:react/configure
 * @property {Function} component - @see lib/componentRegistry
 * @property {Function} page - @see lib/routing
 * @property {Function} request - @see lib/apiRequest
 * @property {Function} state - Method for getting/setting state value; a
 *   change in state will re-render the application.
 * @property {Function} visit - Wrapper around  #render() and #request()
 */

/**
 * LuxUI application factory function; generate a LuxUI application object.
 *
 * @property {Function} luxPath - @see module:lib/luxPath
 *
 * @param  {LuxConfig} config - Application configuration settings.
 *
 * @return {LuxUIApp} - The application object.
 */
function luxReact(config) {
  const app = {
    config: configure(config),
  };
  // TODO: future optimization to prevent DOM "thrashing" due to state changes
  // const debouncedRender = debounce(render, 200);
  let state = {};

  function setState(newState) {
    state = newState;
    render(app, setState, state);

    // return; because this function is also used in Promise resolution chain
    return newState;
  }

  app.component = component.bind(app);
  app.page = page.bind(app);
  app.request = path => request(app.config.apiRoot, path);
  app.visit = path => visit(app.request, setState, path);

  Object.defineProperty(app, 'state', {
    enumerable: true,
    get: () => ({ ...state }),
  });

  // FIXME? should this be tested?
  // istanbul ignore next line
  window.onpopstate = () => app.visit();

  return app;
}

/**
 * Static(ly) available version of luxPath for application use. {@see luxPath}
 *
 * @param  {String} path - The URL to parse.
 *
 * @return {LuxPath} - The standardized luxPath value for the given URL.
 */
luxReact.luxPath = path => luxPath(path);

/*
 * Fluent APIs / Method Chaining
 *
 * @example
 * import luxReact from '@luxui/luxReact';
 *
 * const myApp = luxReact(configuration);
 * myapp
 *   .page('/home', () => {})
 *   .page('/about', () => {})
 *   .page('/blog', () => {})
 *   .page('/contact', () => {})
 *   .visit();
 */

/**
 * API for adding additional, or custom, components to the application.
 *
 * @param  {String}   [type] - The form field type (if applicable): text,
 *   password, or anything else custom that an application chooses to use.
 * @param  {String}   key  - The "identifier" string for the component in
 *   componentRegistry.
 * @param  {Function} fn - The "implementation" of the component as a ReactJS
 *   component.
 *
 * @return {Object} - the application object.
 */
function component(type, key, fn) {
  if (arguments.length < 2) {
    // eslint-disable-next-line max-len
    throw new Error('Registering a component requires at least an "identifier" (string) and an "implementation" (function).');
  }

  if (!fn) {
    [type, key, fn] = [undefined, type, key];
  }

  if (!isString(key)) {
    // eslint-disable-next-line max-len
    throw new Error(`Component "identifiers" must be strings; ${typeof key} provided (${key})`);
  }

  if (!isFunction(fn)) {
    // eslint-disable-next-line max-len
    throw new Error(`Component "implementations" must be functions; ${typeof fn} provided (${fn}).`);
  }

  registry(key, fn);

  if (type) {
    addType(type, key);
  }

  return this;
}

// Wrapper function only to enable "method chaining" in applications.
function page(...args) {
  routing(...args);

  return this;
}

// Render the model to the view
function render(app, setState, state) {
  const renderRoot = app.config.renderRoot;

  try {
    // ReactDOM.render(<Layout {...state} />, renderRoot);
    ReactDOM.render(
      <Context app={app} setState={setState}>
        <Layout {...state} />
      </Context>, renderRoot);
  } catch (error) {
    ReactDOM.render(<Fatal error={error} model={state} />, renderRoot);
  }
}

// Make an API request
function request(apiRoot, path) {
  const parsed = luxPath(`${path || window.location}`);

  const URI = routing(parsed)
    // `path` is registered with the `routing` library and therefor is not a
    // specific API resource; load the "root" resource for meta information.
    ? apiRoot
    // `path` is not a registered page in `routing` so it is assumed to be an
    // API resource; requesting the resource will either resolve to a
    // resource or an error.
    : `${apiRoot}${parsed}`;

  return apiRequest(URI)
    .then((response) => {
      // the "parsed" path is necessary to lookup a "page" handler later on
      response.path = parsed;

      return response;
    });
}

// 1. Make an API request, and
// 2. Render the model to the view
function visit(requestFn, setStateFn, path) {
  let pending;

  try {
    pending = requestFn(path);
  } catch (error) {
    pending = new Promise(resolve => resolve(responseModelFormat({}, error)));
  }

  return pending
    .then(setStateFn);
}

export default luxReact;
