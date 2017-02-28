jest.mock('../../lib/routing');
import routing from '../../lib/routing';

import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './main';
const Collection = registry('Lux.Rest.Collection');
const ErrorComponent = registry('Lux.Lux.Error');
const Item = registry('Lux.Rest.Item');
const Main = registry('Lux.Layout.Main');

let response;

describe('Main (supplied Layout)', function () {
  afterEach(function () {
    registry('Lux.Rest.Collection', Collection);
    registry('Lux.Rest.Item', Item);
    registry('Lux.Error', ErrorComponent);
  });

  beforeEach(function () {
    response = {
      data: {
        actions: [],
        class: ['collection'],
        entities: [],
        links: [
          {
            href: '/',
            rel: ['self'],
            title: 'Something Savvy',
          }
        ],
        properties: {},
        title: 'Testing Main Component',
      },
      error: false,
      path: '/home',
      status: 200,
    };
  });

  it('should exist; and should be a function', function () {
    expect(typeof Main).toBe('function');
  });

  it('should render a page from the `routing` module', function () {
    routing.mockImplementationOnce(function mock(path) {
      if (path === response.path) {

        return () => (<pre>{JSON.stringify(response, null, ' ')}</pre>);
      }

      throw new Error('Implementation fail.');
    });

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Rest.Collection component', function () {
    registry('Lux.Rest.Collection', () => (<pre>{JSON.stringify(response, null, ' ')}</pre>));

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Rest.Item component', function () {
    response.data.class = ['item'];

    registry('Lux.Rest.Item', () => (<pre>{JSON.stringify(response, null, ' ')}</pre>));

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Error component; when the response is an error', function () {
    response.error = new Error('API response error.');

    registry('Lux.Error', () => (<pre>{JSON.stringify(response, null, ' ')}</pre>));

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Error component; when the class type is not: collection or item', function () {
    response.data.class = ['something-else'];

    registry('Lux.Error', () => (<pre>{JSON.stringify(response, null, ' ')}</pre>));

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the Error component; when the `class` property is absent', function () {
    delete response.data.class;

    registry('Lux.Error', () => (<pre>{JSON.stringify(response, null, ' ')}</pre>));

    const component = renderer.create(
      <Main {...response} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
