import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import { siren } from '../siren.propType';

function FormComponent(props) {

  return (<pre>{JSON.stringify(props, null, ' ')}</pre>);
}
FormComponent.propTypes = {
  create: siren.action,
  delete: siren.action,
  properties: React.PropTypes.isRequired,
  schema: React.PropTypes.arrayOf(siren.field),
  view: siren.action,
};

registry('Form', FormComponent);
