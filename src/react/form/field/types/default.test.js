import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../../lib/componentRegistry';

import './default';
const DefaultComponent = registry('Form.Field.Default');

describe('DefaultComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof DefaultComponent).toBe('function');
  });

  it('should render the default (non-existent) component', function () {
    const field = {
      name: 'no-name',
      title: 'no-title',
      value: 'no-value',
    };

    const testComponent = renderer.create(
      <DefaultComponent {...field} />
    );
    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should provide a value - substitution - to visually show the `value` in the representation', function () {
    const field = {
      name: 'no-name',
      title: 'no-title',
      // value: 'no-value',
    };

    const testComponent = renderer.create(
      <DefaultComponent {...field} />
    );
    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
