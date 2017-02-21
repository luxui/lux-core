import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import { siren } from '../siren.propType';

import './field';

function FormComponent(props) {
  const Field = registry('Form.Field');

  return (
    <form className="limit-width">

      {/* <!-- notification --> */}

      {props.schema.map((field, indx) => <Field key={indx} {...field} />)}

      {/* <!-- buttons --> */}
    </form>
  );
}
FormComponent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  create: siren.action,
  // eslint-disable-next-line react/no-unused-prop-types
  delete: siren.action,
  // eslint-disable-next-line max-len
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  properties: React.PropTypes.object.isRequired,
  schema: React.PropTypes.arrayOf(siren.field),
  // eslint-disable-next-line react/no-unused-prop-types
  view: siren.action,
};

registry('Form', FormComponent, false);
