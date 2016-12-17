import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../componentRegistry';

import './list';
const List = registry('Rest.Collection.List');

describe('Rest.Collection.List', function () {
  it('should exist; and should be a function', function () {
    expect(typeof List).toBe('function');
  });

  it('should log error(s) when no attributes are provided', function () {
    const expected = [
      'title',
    ];

    // true: the errors will not be shown in the console output
    // false: the errors will be logged to the console for debugging
    true ? spyOn(console, 'error') : spyOn(console, 'error').and.callThrough();
    console.error.calls.reset();

    renderer.create(<List />);

    const reported = console.error.calls.all()
      .map(({ args: [arg] }) => {
        const [_, prop] = /the prop `([^`]+)`/i.exec(arg);

        return prop;
      });

    expect(reported).toEqual(expected);
  });

  it('should display "end of list" with no `entities` provided', function () {
    const component = renderer.create(
      <List title="Resources" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display "end of list" with no `entities` === `[]` provided', function () {
    const component = renderer.create(
      <List entities={[]} title="Resources" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a list; without links', function () {
    const entities = [
      {
        title: 'Foo Bar'
      },
      {
        title: 'Baz Bam'
      }
    ];
    const component = renderer.create(
      <List entities={entities} title="Resources" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a list; with links', function () {
    const entities = [
      {
        href: 'http://example.com/foo-bar',
        title: 'Foo Bar'
      },
      {
        href: 'http://example.com/baz-bam',
        title: 'Baz Bam'
      }
    ];
    const component = renderer.create(
      <List entities={entities} title="Resources" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
