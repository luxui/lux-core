import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './wrapper';
const WrapperComponent = registry('Form.FieldWrapper');

describe('WrapperComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof WrapperComponent).toBe('function');
  });

  it('should render an empty form-field', function () {
    const testComponent = renderer.create(
      <WrapperComponent />
    );

    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a form-field with "Hello, World!"', function () {
    const testComponent = renderer.create(
      <WrapperComponent>
        <p>Hello, World!</p>
      </WrapperComponent>
    );

    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add `className`s', function () {
    const testComponent = renderer.create(
      <WrapperComponent className="hello world more classNames" />
    );

    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add `style`s', function () {
    const styles = {
      background: 'darkRed',
      color: 'white',
    };

    const testComponent = renderer.create(
      <WrapperComponent style={styles} />
    );

    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
