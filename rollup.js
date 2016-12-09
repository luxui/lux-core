/* global process */

import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';

// eslint-disable-next-line no-console
console.log(`Bundling [${process.env.NODE_ENV}] @luxui/core-lux`);

export default {
  dest: './dist/index.js',
  entry: './index.js',
  format: 'cjs',
  plugins: [
    // the order of these plugins is important
    json(),
    eslint({
      include: './src/**/*.js',
      throwError: true
    }),
    babel()
  ]
};
