import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

function FormFieldWrapperComponent(props) {
  const attrs = {
    className: `form-field ${props.className || ''}`
      .replace(/^\s+|\s+$/g, ''),
  };

  if (props.style) {
    attrs.style = props.style;
  }

  return (
    <div {...attrs}>
      {props.children}
    </div>
  );
}
FormFieldWrapperComponent.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
  className: React.PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: React.PropTypes.object,
};

registry('Form.FieldWrapper', FormFieldWrapperComponent, false);
