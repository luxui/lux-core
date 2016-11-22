// not sure an exhastive list of acceptable status codes is necessary here
const rHTTPStatuses = /^[1-5]\d\d/;

const SIREN = 'application/vnd.siren+json';

function format(response, error = false) {

  /**
   * @typedef ResponseModel
   * @type {object}
   *
   * @param {object} data
   * @param {(null|Error|string)} error
   * @param {number} status
   */
  return {
    data: response.data,
    error,
    status: response.status,
  };
}

function responseModel(response = {}) {
  const { status } = response;

  if (!rHTTPStatuses.test(status)) {
    throw new Error(`Invalid HTTP status code: ${status}.`);
  }

  const statusClass = +(`${status}`)[0];

  switch (statusClass) {
    case 5: // 5xx = 500-599 - server error

      return format(response, true);
    case 4: // 4xx = 400-499 - client error

      return format(response, true);
    case 2: // 2xx = 200-299 - success
      if (response.headers.get('content-type') !== SIREN) {
        const returned = response.headers.get('content-type');
        throw new Error(`Invalid content-type, ${returned}, returned.`);
      }

      return format(response);
    // case 3: // 3xx = 300-399 - redirection
    // case 1: // 1xx = 100-199 - informational
    default: // anything else
      throw new Error(`Unexpected API response status: ${status}.`);
  }
}

export default responseModel;
