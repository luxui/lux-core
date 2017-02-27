import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../../lib/componentRegistry';

import '../wrapper';

function defaultFieldComponent(props) {
  const Wrapper = registry('Lux.Form.FieldWrapper');
  const { name, title, value = 'no value' } = props;
  const style = {
    background: 'darkRed',
    color: 'white',
    padding: '1ex 3ex',
  };

  return (
    <Wrapper className={props.className} style={style}>
      <pre>No field type component for: {title}</pre>
      <pre>{JSON.stringify({ name, title, value }, null, 4)}</pre>
    </Wrapper>
  );
}
defaultFieldComponent.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

registry('Lux.Form.Field.Default', defaultFieldComponent, false);
