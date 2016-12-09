import * as has from './src/has';
import * as is from './src/is';
import model from './src/responseModel';
import path from './src/luxPath';
import request from './src/apiRequest';
import routing from './src/routing';
import storage from './src/storage';

export default {
  ...has,
  ...is,
  model,
  path,
  request,
  routing,
  storage,
};
