import { isFunction, isString } from './lib/is';
import pageLocation from './lib/pageLocation';

function configChecks(config) {
  const { api, routing, template, url } = config;

  /* istanbul ignore else */
  if (!api) {
    throw configError('api');
  }

  /* istanbul ignore else */
  if (!isString(api)) {
    throw configError('api', 'is not a string');
  }

  /* istanbul ignore else */
  if (!routing) {
    throw configError('routing');
  }

  /* istanbul ignore else */
  if (!isFunction(routing)) {
    throw configError('routing', 'is not a function');
  }

  /* istanbul ignore else */
  if (!template) {
    throw configError('api');
  }

  /* istanbul ignore else */
  if (!isFunction(template)) {
    throw configError('template', 'is not a function');
  }
}

function configError(prop, problem = 'not provided in config object') {
  const msg = `Required property \`${prop}\` ${problem}.`;

  return new Error(msg);
}

function lux(config = {}) {
  configChecks(config);

  config.url = config.url || pageLocation(location);
}

export default lux;
