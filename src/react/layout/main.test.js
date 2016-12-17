import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './main';
const Main = registry('Main');

describe('Main (supplied Layout)', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Main).toBe('function');
  });

  it('should match the snapshot', function () {
    // const component = renderer.create(
    //   <Main />
    // );
    //
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    fail();
  });
});
