import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../../lib/componentRegistry';

import '../wrapper';

import { addType } from './';

function textFieldComponent(props, context) {
  const Wrapper = registry('Form.FieldWrapper');
  const { name, title, value } = props;

  const inputAttrs = {
    defaultValue: value,
    id: name,
    name,
    onChange: (event) => {
      context.setState({
        ...context.state,
        [name]: event.target.value,
      });
    },
  };

  return (
    <Wrapper className={props.className}>
      <label htmlFor={name}>{title}</label>
      <input {...inputAttrs} />
    </Wrapper>
  );
}
textFieldComponent.contextTypes = {
  setState: React.PropTypes.func,
  state: React.PropTypes.object,
};
textFieldComponent.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

const name = 'Form.Field.Text';

addType('text', name);
registry(name, textFieldComponent, false);
