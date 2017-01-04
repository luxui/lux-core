/**
 * @module lib/responseModel
 * @memberof lux-lib
 */

// not sure an exhastive list of acceptable status codes is necessary here
const rHTTPStatuses = /^[1-5]\d\d/;

const SIREN = 'application/vnd.siren+json';

/**
 * @typedef {object} ResponseModel
 * @global
 *
 * @property {(object|undefined)} data
 * @property {(boolean|error)} error
 * @property {(number|undefined)} status
 */

/**
 * Create a new ResponseModel from an API response.
 *
 * @param  {object}  response - The data object to format into a ResponseModel.
 * @param  {boolean} [error=false] - The error or nothing.
 *
 * @return {ResponseModel}
 *
 * @example
 * import { format } from './responseModel';
 *
 * format({ data: 'Hello', status: 200 });
 * // returns { data: 'Hello', error: false, status: 200 }
 */
function format(response, error = false) {

  return {
    data: response.data,
    error,
    status: response.status || 0,
  };
}

/**
 * Promise handler for HTTP requests for converting HTTP responses into a
 * standardized ResponseModel.
 *
 * @param  {object} response - The response object to convert.
 *
 * @return {ResponseModel}
 *
 * @example
 * import { handler } from './responseModel';
 *
 * fetch(apiURI)
 *   .then(handler)
 *   .then(response => {
 *     // ...
 *     // do something with response, which will be of the form ResponseModel
 *   });
 */
function handler(response = {}) {
  const { status } = response;

  if (!rHTTPStatuses.test(status)) {
    const error = new Error(`Invalid HTTP status code: ${status}.`);

    return format(response, error);
  }

  const statusClass = +(`${status}`)[0];

  switch (statusClass) {
    case 5: // 5xx = 500-599 - server error

      return format(response, new Error(`Received ${status}.`));
    case 4: // 4xx = 400-499 - client error

      return format(response, new Error(`Received ${status}.`));
    case 2: // 2xx = 200-299 - success
      if (response.headers.get('content-type') !== SIREN) {
        const type = response.headers.get('content-type');
        const error = new Error(`Invalid content-type, ${type}, returned.`);

        return format(response, error);
      }

      return format(response);
    // case 3: // 3xx = 300-399 - redirection
    // case 1: // 1xx = 100-199 - informational
    // eslint-disable-next-line no-case-declarations
    default: // anything else
      const error = new Error(`Unexpected HTTP status code: ${status}.`);

      return format(response, error);
  }
}

export { format, handler };
