import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './index';
const Collection = registry('Lux.Rest.Collection');

const CreateButton = registry('Lux.Rest.Collection.CreateButton');
const Paging = registry('Lux.Rest.Collection.Paging');
const RestCollectionList = registry('Lux.Rest.Collection.List');

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
    registry('Lux.Rest.Collection.CreateButton', CreateButton);
    registry('Lux.Rest.Collection.List', RestCollectionList);
    registry('Lux.Rest.Collection.Paging', Paging);
  });

  beforeEach(function () {
    spyOn(console, 'error');
    spyOn(console, 'log');
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

  it('should render a collection page; with no errors', function () {
    registry('Lux.Rest.Collection.CreateButton', () => (<p />));
    registry('Lux.Rest.Collection.List', () => (<p />));
    registry('Lux.Rest.Collection.Paging', () => (<p />));

    const attrs = {
      ...props,
    };

    const component = renderer.create(
      <Collection {...attrs} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a collection page; even if the `actions` are missing', function () {
    registry('Lux.Rest.Collection.CreateButton', () => (<p />));
    registry('Lux.Rest.Collection.List', () => (<p />));
    registry('Lux.Rest.Collection.Paging', () => (<p />));

    const attrs = {
      ...props,
    };

    delete attrs.actions;

    const component = renderer.create(
      <Collection {...attrs} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
