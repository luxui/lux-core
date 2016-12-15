/* global process,require */

import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

// format options: cjs, es, iife, umd
const format = 'umd';
const npmPackage = require('./package.json');

// eslint-disable-next-line no-console,max-len
console.log(`Bundling [${process.env.NODE_ENV}] ${npmPackage.name} as ${format}`);

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
  format,
  moduleName: 'luxCore',
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
