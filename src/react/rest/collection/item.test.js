import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './item';
const Item = registry('Lux.Rest.Collection.ListItem');

describe('Rest.Collection.List.Item', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Item).toBe('function');
  });

  it('should throw an error if `title` is omitted', function () {
    // silence the console logging becuase the thrown error is more important
    spyOn(console, 'error');

    expect(function () {
      renderer.create(<Item />);
    }).toThrow('A `title` is required for `RestCollectionListItem`.');
  });

  it('should render an `a` (anchor, or "link") tag', function () {
    const component = renderer.create(
      <Item href="/home" title="Home"/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a `span` tag', function () {
    const component = renderer.create(
      <Item title="Home"/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
