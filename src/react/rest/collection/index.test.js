import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../componentRegistry';

import './index';
const Collection = registry('Rest.Collection');

const CreateButton = registry('Rest.Collection.CreateButton');
const Paging = registry('Paging');
const RestCollectionList = registry('Rest.Collection.List');

const props = {
  actions: [
    {
      href: 'http://foo.bar/baz',
      name: 'create',
      title: 'Foo Bar Baz',
    }
  ],
  entities: [],
  links: [
    {
      href: '/',
      rel: ['self'],
      title: 'Resources'
    }
  ],
  properties: {},
  title: '',
};

describe('Collection', function () {
  afterEach(function () {
    registry('Rest.Collection.CreateButton', CreateButton);
    registry('Rest.Collection.List', RestCollectionList);
    registry('Paging', Paging);
  });

  it('should exist; and should be a function', function () {
    expect(typeof Collection).toBe('function');
  });

  it('should throw if no `self` link', function () {
    const attrs = {
      ...props,
    };
    attrs.links = [];

    expect(function () {
      renderer.create(<Collection {...attrs}/>)
    }).toThrow('No `self` link provided from API in response.');
  });

  it('should', function () {
    registry('Rest.Collection.CreateButton', () => (<p />));
    registry('Rest.Collection.List', () => (<p />));
    registry('Paging', () => (<p />));

    const attrs = {
      ...props,
    };

    const component = renderer.create(
      <Collection {...attrs} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
