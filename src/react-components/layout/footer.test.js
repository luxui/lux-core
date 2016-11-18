import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

describe('Default layout - footer', function () {
  it('should match the snapshot', function () {
    const component = renderer.create(
      <Footer />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
