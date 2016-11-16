import fs from 'fs';
import path from 'path';

const rLocal = /^\.\//;

function resolveId(importee, importer) {
  if (!importer || !rLocal.test(importee)) {

    return null;
  }

  const pwd = importer.split(path.basename(importer))[0];
  const indexFile = path.join(`${pwd + importee}/index.js`);

  function promiseResolver(accept, reject) {
    try {
      const asyncHandler = error => (error ? reject(null) : accept(indexFile));
      fs.access(indexFile, asyncHandler);
    } catch (e) {
      reject(e);
    }
  }

  return new Promise(promiseResolver);
}

/**
 * RollupJS plugin for resolving relative directory `index.js` files without
 * specifying `[directory]/index` in modules.
 *
 * @return {null|string}
 *         null - indicates that the _importee_ is either not a local resource
 *         or that it isn't a directory with an `index.js` file.
 *         string - indicates that the _importee_ is a relative directory and
 *         that directory has a `index.js` file in it.
 */
function resolver() {

  return { resolveId };
}

export default resolver;
