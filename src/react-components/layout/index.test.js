import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './index';

describe('Default layout - layout', function () {
  it('should match the snapshot', function () {
    const component = renderer.create(
      <Layout />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
