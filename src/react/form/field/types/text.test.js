import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import registry from '../../../../lib/componentRegistry';
import Context from '../../../appContext';

import './text';

const behavior = ReactTestUtils.createRenderer();

const TextComponent = registry('Lux.Form.Field.Text');

describe('TextComponent', function () {
  it('should exist; and should be a function', function () {
    expect(typeof TextComponent).toBe('function');
  });

  it('should render a text form field', function () {
    const field = {
      name: 'name',
      title: 'Name',
      value: 'LuxUI',
    };

    const testComponent = renderer.create(
      <TextComponent {...field} />
    );
    const tree = testComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call setState when onChange is triggered', function () {
    const app = {
      state: {
        message: 'Hello'
      }
    };
    const field = {
      name: 'name',
      title: 'Name',
      value: 'LuxUI',
    };
    const setState = jest.fn();

    const component = TextComponent(field, { app, setState });
    expect(setState.mock.calls.length).toBe(0);
    component
      .props
      .children[1]
        .props
        .onChange({ target: { value: 'Hello, World!' } });
    expect(setState.mock.calls.length).toBe(1);
  });
});
