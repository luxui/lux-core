import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './';
import { addType } from './types';

const shallow = ReactTestUtils.createRenderer();

const FormField = registry('Form.Field');

const defaultField = registry('Form.Field.Default');
const fieldTypes = [
  // ['checkbox', 'Form.Field.Checkbox'],
  // ['color', 'Form.Field.Color'],
  // ['date', 'Form.Field.Date'],
  // ['datetime', 'Form.Field.Datetime'],
  // ['datetime-local', 'Form.Field.DatetimeLocal'],
  // ['email', 'Form.Field.Email'],
  // ['file', 'Form.Field.File'],
  // ['hidden', 'Form.Field.Hidden'],
  // ['month', 'Form.Field.Month'],
  // ['number', 'Form.Field.Number'],
  // ['password', 'Form.Field.Password'],
  // ['radio', 'Form.Field.Radio'],
  // ['range', 'Form.Field.Range'],
  // ['select', 'Form.Field.Select'],
  // ['search', 'Form.Field.Search'],
  // ['tel', 'Form.Field.Tel'],
  ['text', 'Form.Field.Text'],
  // ['textarea', 'Form.Field.Textarea'],
  // ['time', 'Form.Field.Time'],
  // ['url', 'Form.Field.Url'],
  // ['week', 'Form.Field.Week'],
];

function componentName(obj) {

  return obj && obj.type && obj.type.name;
}

describe('Form.Field', function () {
  it('should exist; and should be a function', function () {
    expect(typeof FormField).toBe('function');
  });

  it('should render the "default" component', function () {
    const component = shallow.render(<FormField type={''} />);

    expect(componentName(component)).toBe(defaultField.name);
  });

  fieldTypes.forEach(([type, name]) => {
    const Component = registry(name);

    if (!Component) return;

    it(`should render ${type} form field`, function () {
      const component = shallow.render(<FormField type={type} />);

      expect(componentName(component)).toBe(Component.name);
    });
  });

  it('should render custom form field types when registered', function () {
    const name = 'customFieldType';

    registry(name, () => (
      <div>Custom Form Field</div>
    ))
    addType(name, name);

    const result = renderer.create(
      <FormField type={name} />
    );
    const tree = result.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
