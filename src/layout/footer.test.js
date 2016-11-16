import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

describe('Default layout - footer', function () {
  const component = renderer.create(
    <Footer />
  );

  it('should match the snapshot', function () {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
