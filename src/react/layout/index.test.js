import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './index';
const Layout = registry('Layout');

describe('Layout (supplied Layout)', function () {
  it('should log an error because no content/data is provided', function () {
    const expected = [
      'data',
      'error',
      'links',
      'properties',
      'title',
    ];

    // true: the errors will not be shown in the console output
    // false: the errors will be logged to the console for debugging
    true ? spyOn(console, 'error') : spyOn(console, 'error').and.callThrough();
    console.error.calls.reset();

    renderer.create(<Layout />);

    const reported = console.error.calls.all()
      .map(({ args: [arg] }) => {
        const [_, prop] = /the prop `([^`]+)`/i.exec(arg);

        return prop;
      });

    expect(reported).toEqual(expected);
  });

  it('should render an Error page', function () {
    const response = {
      data: {
        error: new Error('Nothing worked.'),
        response: {},
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
