import React from 'react'; // `React` must be in scope when using JSX

import shapeOfSiren from './siren.propType';

const shape = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.shape(shapeOfSiren),
  ]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  error: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  path: React.PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  status: React.PropTypes.number.isRequired,
};

export default shape;
