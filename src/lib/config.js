import { isFunction, isString } from './is';
import pageLocation from './pageLocation';

const state = {};

function configuration(config) {
  if (state.isValid) {
    if (config) {
      throw new Error('Attempting to re-configure application.');
    }

    return state;
  }

  const { api, routing } = (config || {});

  /* istanbul ignore else */
  if (!api) {
    throw configurationError('api');
  }

  /* istanbul ignore else */
  if (!isString(api)) {
    throw configurationError('api', 'is not a string');
  }

  /* istanbul ignore else */
  if (!routing) {
    throw configurationError('routing');
  }

  /* istanbul ignore else */
  if (!isFunction(routing)) {
    throw configurationError('routing', 'is not a function');
  }

  config.url = config.url || pageLocation(location);

  state.isValid = true;
  state.config = config;

  return state;
}

function configurationError(prop, problem = 'not provided in config object') {
  const msg = `Required property \`${prop}\` ${problem}.`;

  return new Error(msg);
}

export default configuration;
