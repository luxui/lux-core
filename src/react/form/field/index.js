import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

import './wrapper';

import './types/default';
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

const defaultType = registry('Form.Field.Default');
const types = {
  // checkbox: registry('Form.Field.Checkbox'),
  // color: registry('Form.Field.Color'),
  // date: registry('Form.Field.Date'),
  // datetime: registry('Form.Field.Datetime'),
  // 'datetime-local': registry('Form.Field.DatetimeLocal'),
  // email: registry('Form.Field.Email'),
  // file: registry('Form.Field.File'),
  // hidden: registry('Form.Field.Hidden'),
  // month: registry('Form.Field.Month'),
  // number: registry('Form.Field.Number'),
  // password: registry('Form.Field.Password'),
  // radio: registry('Form.Field.Radio'),
  // range: registry('Form.Field.Range'),
  // select: registry('Form.Field.Select'),
  // search: registry('Form.Field.Search'),
  // tel: registry('Form.Field.Tel'),
  text: registry('Form.Field.Text'),
  // textarea: registry('Form.Field.Textarea'),
  // time: registry('Form.Field.Time'),
  // url: registry('Form.Field.Url'),
  // week: registry('Form.Field.Week'),
};

function FormFieldComponent(props) {
  // TODO: add checking for meta-types: list, and table
  const Field = types[props.type] || defaultType;

  return (<Field {...props} />);
}
FormFieldComponent.propTypes = {
  type: React.PropTypes.string,
};

registry('Form.Field', FormFieldComponent, false);
