import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

describe('Default layout - main', function () {
  const component = renderer.create(
    <Main />
  );

  it('should match the snapshot', function () {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
