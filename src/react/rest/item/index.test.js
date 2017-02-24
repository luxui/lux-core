jest.mock('./formModel');
import formModel from './formModel';

import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './index';
const Item = registry('Lux.Rest.Item');

const Form = registry('Lux.Form');

formModel.mockImplementation(() => {});

describe('Rest.Item', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Item).toBe('function');
  });

  afterEach(function () {
    registry('Lux.Form', Form);
  });

  beforeEach(function () {
    // // silence console.error
    // spyOn(console, 'error');
  });

  it('should render a Form component', function () {
    registry('Lux.Form', () => (<p />));
    const attrs = {
      links: [],
      properties: {},
      title: '',
      path: '',
    };
    const component = renderer.create(
      <Item {...attrs} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
