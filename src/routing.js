const routing = {
  error: null,
  table: [],
};

/**
 * @typedef Matcher
 * @type {(function|RegExp|string)}
 */

function routingAPI(matcher, fn) {
  // TODO: validation
  // # Matcher
  //
  //  Must be one of the following:
  //
  //    1. [ ] String {Path} - will be string (===) compared to the Path
  //    2. [ ] RegExp - will be matched against the Path
  //    3. [ ] Function - will receive the Path and ResponseModel; truthy
  //    return value indicates match
  //    4. [ ] Array[String|RegExp|Function]
  routing.table.push([matcher, fn]);
}

export default routingAPI;
