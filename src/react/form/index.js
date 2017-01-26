import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import { siren } from '../siren.propType';

function FormComponent(props) {

  return (
    <pre>{JSON.stringify(props, null, ' ')}</pre>
  );
}
FormComponent.contextTypes = {
  setState: React.PropTypes.func,
  state: React.PropTypes.object,
};
FormComponent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  create: siren.action,
  // eslint-disable-next-line react/no-unused-prop-types
  delete: siren.action,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  properties: React.PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  schema: React.PropTypes.arrayOf(siren.field),
  // eslint-disable-next-line react/no-unused-prop-types
  view: siren.action,
};

registry('Form', FormComponent);
