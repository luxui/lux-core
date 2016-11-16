import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';

import resolver from './rollup/resolver';

export default {
  dest: 'lux.js',
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'DataLayer',
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
