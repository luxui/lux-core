import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Default layout - header', function () {
  const component = renderer.create(
    <Header />
  );

  it('should match the snapshot', function () {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
