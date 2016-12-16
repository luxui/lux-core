/* global process,require */

import path from 'path';

import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

const framework = process.env.LUX_FRAMEWORK;

const {
  description,
  name,
  repository,
  version,
} = require('./package.json');

// TODO: make these into automatic builds; build them all with minified versions
// format options: cjs, es, iife, umd
const format = 'umd';
const moduleName = `${framework}Lux`;
const entry = `./src/${framework}/index.js`;
const dest = `./dist/${moduleName}.js`;

// eslint-disable-next-line no-console,max-len
console.log([
  'Bundling',
  `  (${format.toUpperCase()}) ${name} ${version}`,
  `  ${moduleName} - ${path.resolve(dest)}`,
  ''
].join('\n'));

const banner = `
/** ${name} ${version}
* ${description}
* ${repository.url} */
`;

export default {
  banner,
  dest,
  entry,
  exports: 'named', // quiet the Rollup warning about named + default exports
  format,
  globals: {
    // eslint-disable-next-line
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  moduleName,
  plugins: [
    // The order of these plugins is important; babel should remain last.
    builtins(),
    json(),
    eslint({
      include: './src/**/*.js',
      throwError: true
    }),
    nodeResolve({
      browser: true,
      skip: [
        'whatwg-fetch',
        'react',
        'react-dom',
      ],
    }),
    babel(),
  ]
};
