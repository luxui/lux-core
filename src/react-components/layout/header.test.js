import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe('Default layout - header', function () {
  it('should match the snapshot', function () {
    const component = renderer.create(
      <Header />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
