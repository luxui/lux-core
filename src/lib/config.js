import { isFunction, isString } from './is';
// import pageLocation from './pageLocation';

const state = {};

function configuration(config) {
  // if the configuration has already been set
  if (state.config && state.config.isValid) {
    if (config) {
      throw new Error('Attempting to re-configure is not allowed.');
    }

    return state.config;
  }

  // caller is asking for current state of the configuration
  if (!config) {

    return state.config || {};
  }

  // begin validation "filters"
  const { api, initialPath, root, routing } = config;

  if (!api) {
    throw configurationError('api');
  }

  if (!isString(api)) {
    throw configurationError('api', 'is not a string');
  }

  /* istanbul ignore else */
  if (initialPath && !isString(initialPath)) {
    throw configurationError('initialPath', 'is not a string');
  }

  /* istanbul ignore else */
  if (root && !isString(root)) {
    throw configurationError('root', 'is not a string');
  }

  if (!routing) {
    throw configurationError('routing');
  }

  if (!isFunction(routing)) {
    throw configurationError('routing', 'is not a function');
  }

  // set the state of the configuration
  config.isValid = true;
  config.root = document.getElementById(config.root || 'root');
  state.config = config;

  // reuse the logic at the top of the function for returning a value
  return configuration();
}

function configurationError(prop, problem = 'not provided in config object') {
  const msg = `Required property \`${prop}\` ${problem}.`;

  return new Error(msg);
}

export default configuration;
