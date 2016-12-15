/* global process,require */

import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

const npmPackage = require('./package.json');

// eslint-disable-next-line no-console
console.log(`Bundling [${process.env.NODE_ENV}] ${npmPackage.name}`);

const bruce = `
/**
 * ${npmPackage.description}
 * v${npmPackage.version}
 * Repository URL: ${npmPackage.repository.url}
 */
`;

export default {
  banner: bruce,
  dest: './dist/index.js',
  entry: './src/index.js',
  format: 'es',
  plugins: [
    // the order of these plugins is important
    builtins(),
    json(),
    eslint({
      include: './src/**/*.js',
      throwError: true
    }),
    nodeResolve({
      browser: true,
      skip: [
        'whatwg-fetch'
      ],
    }),
    babel(),
  ]
};
