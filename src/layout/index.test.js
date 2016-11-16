import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './index';

describe('Default layout - layout', function () {
  const component = renderer.create(
    <Layout />
  );

  it('should match the snapshot', function () {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
