import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './index';
const Layout = registry('Layout');

describe('Layout (supplied Layout)', function () {
  it('should log an error because no content/data is provided', function () {
    spyOn(console, 'error');//.and.callThrough();
    console.error.calls.reset();

    expect(console.error.calls.count()).toBe(0);

    renderer.create(<Layout />);
    expect(console.error.calls.count()).toBe(2);
  });

  it('should render an Error page', function () {
    const response = {
      data: {
        data: {},
        error: new Error('Nothing worked.'),
      },
      error: true,
      status: 500,
    };

    const component = renderer.create(
      <Layout {...response}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
