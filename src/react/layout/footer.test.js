import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './footer';
const Footer = registry('Footer');

describe('Footer (supplied Layout)', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Footer).toMatch(/function/i);
  });

  it('should match the (default) snapshot', function () {
    const component = renderer.create(
      <Footer />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
