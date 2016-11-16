import React from 'react'; // Even if this isn't used it needs to be imported!
import ReactDOM from 'react-dom';

import configManager from './lib/config';

import Layout from './layout';

function lux(config, root = document.getElementById('root')) {
  /* istanbul ignore else */
  if (configManager(config).isValid) {
    ReactDOM.render(<Layout {...config} />, root);
  }
}

export default lux;
