import React from 'react'; // `React` must be in scope when using JSX

const siren = {};

siren.action = React.PropTypes.shape({
  fields: React.PropTypes.arrayOf(siren.field),
  href: React.PropTypes.string.isRequired,
  method: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  type: React.PropTypes.string,
});

siren.entity = React.PropTypes.shape({
  properties: React.PropTypes.isRequired,
});

siren.field = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.isRequired,
});

siren.link = React.PropTypes.shape({
  href: React.PropTypes.string.isRequired,
  rel: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: React.PropTypes.string,
});

const shape = {
  actions: React.PropTypes.arrayOf(siren.action),
  class: React.PropTypes.array,
  entities: React.PropTypes.arrayOf(siren.entity),
  links: React.PropTypes.arrayOf(siren.link).isRequired,
  properties: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default shape;
export { siren };
