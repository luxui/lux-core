import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './createButton';
const Button = registry('Lux.Rest.Collection.CreateButton');

describe('Rest.Collection.CreateButton', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Button).toBe('function');
  });

  it('should log errors if either `href` or `title` are omitted', function () {
    const expected = [
      'href',
      'title',
    ];

    // true: the errors will not be shown in the console output
    // false: the errors will be logged to the console for debugging
    true ? spyOn(console, 'error') : spyOn(console, 'error').and.callThrough();
    console.error.calls.reset();

    renderer.create(<Button />);

    const reported = console.error.calls.all()
      .map(({ args: [arg] }) => {
        const [_, prop] = /the prop `([^`]+)`/i.exec(arg);

        return prop;
      });

    expect(reported).toEqual(expected);
  });

  it('should render `<noscript />` when either `href` or `title` are falsey', function () {
    const component = renderer.create(
      <Button href="" title=""/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a link (anchor) tag', function () {
    const component = renderer.create(
      <Button href="/home" title="Home"/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
