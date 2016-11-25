/**
 * @module routing
 * @memberof module:lux
 */

const routingData = {
  error: null,
  table: [],
};

/**
 * @callback PathHandler
 * @global
 */

/**
 * @typedef PathMatcher
 * @type {PathMatcherFn|RegExp|string}
 * @global
 *
 * @description
 * A PathMatcher will be evaluated against a {@type Path}. If the given Path is
 * found to be a match the PathHandler will run; only the first match will be
 * run.
 */

/**
 * @callback PathMatcherFn
 * @global
 *
 * @param {Path} path
 */

/**
 * The `routing()` API will schedule callbacks as handlers for configured URIs.
 *
 * @param  {PathMatcher|PathMatcher[]}   matcher - The matching criteria for a
 * route.
 *
 * @param  {PathHandler} handler - The handler for a given URI.
 *
 * @return {PathHandler} - The handler for a matched URI.
 */
function routing(matcher, handler) {
  // TODO: validation
  // # PathMatcher
  //
  //  Must be one of the following:
  //
  //    1. [ ] String {Path} - will be string (===) compared to the Path
  //    2. [ ] RegExp - will be matched against the Path
  //    3. [ ] Function - will receive the Path and ResponseModel; truthy
  //    return value indicates match
  //    4. [ ] Array[String|RegExp|Function]
  routingData.table.push([matcher, handler]);
}

export default routing;
