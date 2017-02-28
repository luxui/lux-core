import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../lib/componentRegistry';

import './error';
const Component = registry('Lux.Error');

describe('Error - main - Component', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Component).toBe('function');
  });

  it('should match the snapshot', function () {
    spyOn(console, 'log');

    const response = {
      data: {},
      error: new Error('Unforseen error.'),
      path: '/',
      status: 400,
    };

    const component = renderer.create(
      <Component {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
