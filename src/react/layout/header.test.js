import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './header';
const Header = registry('Header');

describe('Header (supplied Layout)', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Header).toMatch(/function/i);
  });

  it('should match the (default) snapshot', function () {
    const component = renderer.create(
      <Header />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pull the link with "index" for a rel as main link', function () {
    const links = [
      { href: '/', rel: ['index'], title: 'root' },
    ];
    const component = renderer.create(
      <Header links={links}></Header>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
