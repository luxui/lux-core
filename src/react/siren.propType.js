import React from 'react'; // `React` must be in scope when using JSX

const siren = {
  // non-dependent definitions
  entity: React.PropTypes.shape({
    properties: React.PropTypes.isRequired,
  }),
  field: React.PropTypes.shape({
    cacheable: React.PropTypes.bool,
    columns: React.PropTypes.arrayOf(React.PropTypes.string),
    features: React.PropTypes.arrayOf(React.PropTypes.string),
    href: React.PropTypes.string,
    max: React.PropTypes.number,
    maxlength: React.PropTypes.number,
    min: React.PropTypes.number,
    minlength: React.PropTypes.number,
    multiple: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    pattern: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    readonly: React.PropTypes.bool,
    required: React.PropTypes.bool,
    size: React.PropTypes.number,
    step: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.isRequired,
  }),
  link: React.PropTypes.shape({
    href: React.PropTypes.string.isRequired,
    rel: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string,
  }),
};

// siren.action is dependent on siren.field; it must be defined after the non-
// dependent definitions
siren.action = React.PropTypes.shape({
  class: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  fields: React.PropTypes.arrayOf(siren.field),
  href: React.PropTypes.string,
  method: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
});

// aggregrate shape of Siren response
const shape = {
  actions: React.PropTypes.arrayOf(siren.action),
  class: React.PropTypes.arrayOf(React.PropTypes.string),
  entities: React.PropTypes.arrayOf(siren.entity),
  links: React.PropTypes.arrayOf(siren.link).isRequired,
  properties: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default shape;

export { siren };
