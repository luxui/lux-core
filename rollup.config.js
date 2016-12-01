/* global process */

import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';

import resolver from './rollup/resolver';

export default {
  dest: `dist/${process.env.entry}.js`,
  entry: `src/${process.env.entry}.js`,
  format: 'es',
  plugins: [
    resolver(),
    json(),
    eslint({
      include: 'src/*',
      throwError: true
    }),
    babel()
  ]
};
