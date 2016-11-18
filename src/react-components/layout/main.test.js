import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

describe('Default layout - main', function () {
  it('should match the snapshot', function () {
    const component = renderer.create(
      <Main />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
