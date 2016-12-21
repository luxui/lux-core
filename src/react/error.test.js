import React from 'react';
import renderer from 'react-test-renderer';

import registry from './componentRegistry';

import './error';
const Component = registry('Error');

describe('Error - main - Component', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Component).toBe('function');
  });

  it('should match the snapshot', function () {
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
