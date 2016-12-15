/**
 * @module ResponseModel
 * @memberof core-lux
 */

// not sure an exhastive list of acceptable status codes is necessary here
const rHTTPStatuses = /^[1-5]\d\d/;

const SIREN = 'application/vnd.siren+json';

/**
 * @typedef ResponseModel
 * @type {Object}
 * @global
 *
 * @property {(Object|undefined)} data
 * @property {(Boolean|Error)} error
 * @property {(Number|undefined)} status
 */

/**
 * Create a new ResponseModel from an API response.
 *
 * @param  {Object}  response - The data object to format into a ResponseModel.
 * @param  {(Boolean)} [error=false] - The error or nothing.
 *
 * @return {ResponseModel}
 */
function responseModelFormat(response, error = false) {

  return {
    data: (error ? { error, response: response.data } : response.data),
    error: !!error,
    status: response.status || 0,
  };
}

/**
 * Promise handler for HTTP requests for converting HTTP responses into a
 * standardized ResponseModel.
 *
 * @param  {Object} response - The response object to convert.
 *
 * @return {ResponseModel}
 */
function responseModelHandler(response = {}) {
  const { status } = response;

  if (!rHTTPStatuses.test(status)) {
    const error = new Error(`Invalid HTTP status code: ${status}.`);

    return responseModelFormat(response, error);
  }

  const statusClass = +(`${status}`)[0];

  switch (statusClass) {
    case 5: // 5xx = 500-599 - server error

      return responseModelFormat(response, new Error(`Received ${status}.`));
    case 4: // 4xx = 400-499 - client error

      return responseModelFormat(response, new Error(`Received ${status}.`));
    case 2: // 2xx = 200-299 - success
      if (response.headers.get('content-type') !== SIREN) {
        const type = response.headers.get('content-type');
        const error = new Error(`Invalid content-type, ${type}, returned.`);

        return responseModelFormat(response, error);
      }

      return responseModelFormat(response);
    // case 3: // 3xx = 300-399 - redirection
    // case 1: // 1xx = 100-199 - informational
    // eslint-disable-next-line no-case-declarations
    default: // anything else
      const error = new Error(`Unexpected HTTP status code: ${status}.`);

      return responseModelFormat(response, error);
  }
}

export default responseModelHandler;
export { responseModelFormat };
