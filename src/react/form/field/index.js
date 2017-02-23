import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

import './wrapper';

import { getType } from './types';

// import './types/checkbox';
// import './types/color';
// import './types/date';
// import './types/datetime';
// import './types/datetimeLocal';
// import './types/email';
// import './types/file';
// import './types/hidden';
// import './types/month';
// import './types/number';
// import './types/password';
// import './types/radio';
// import './types/range';
// import './types/select';
// import './types/search';
// import './types/tel';
import './types/text';
// import './types/textarea';
// import './types/time';
// import './types/url';
// import './types/week';

function FormFieldComponent(props) {
  // TODO: add checking for meta-types: list, and table
  const Field = registry(getType(props.type));

  return (<Field {...props} />);
}
FormFieldComponent.propTypes = {
  type: React.PropTypes.string,
};

registry('Form.Field', FormFieldComponent, false);
