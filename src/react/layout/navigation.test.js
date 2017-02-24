import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './navigation';
const Navigation = registry('Lux.Layout.Navigation');

fdescribe('Navigation (supplied Layout)', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Navigation).toMatch(/function/i);
  });

  it('should identify the currently selected (self) menu item', function () {
    const links = [
      { href: '/other', rel: ['notindex'], title: 'other' },
      { href: '/', rel: ['section', 'index', 'self'], title: 'root' },
      { href: '/another', rel: ['section', 'somethingelse'], title: 'another' },
    ];
    // console.log(links);

    const component = renderer.create(
      <Navigation links={links} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
