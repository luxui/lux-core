import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './index';
const Layout = registry('Lux.Layout.Layout');
const Header = registry('Lux.Layout.Header');
const Main = registry('Lux.Layout.Main');
const Footer = registry('Lux.Layout.Footer');

describe('Layout (supplied Layout)', function () {
  let response;

  afterEach(function () {
    // set these back to original values
    registry('Lux.Layout.Header', Header);
    registry('Lux.Layout.Main', Main);
    registry('Lux.Layout.Footer', Footer);
  });

  beforeEach(function () {
    spyOn(console, 'log');

    response = {
      data: {
        mock: 'data'
      },
      error: false,
      path: '',
      status: 200,
    };
  });

  it('should not throw errors if nothing is provided', function () {
    expect(function () {
      spyOn(console, 'error');
      renderer.create(<Layout />);
    }).not.toThrow();
  });

  it('should pass responseModel.data to Header', function () {
    registry('Lux.Layout.Header', (model) => {
      expect(model).toEqual(response.data);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should pass responseModel.data to Footer', function () {
    registry('Lux.Layout.Footer', (model) => {
      expect(model).toEqual(response.data);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should pass responseModel to Main', function () {
    registry('Lux.Layout.Main', (model) => {
      expect(model).toEqual(response);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should match snapshot', function () {
    const noComponent = () => (<noscript />);

    registry('Lux.Layout.Header', noComponent);
    registry('Lux.Layout.Main', noComponent);
    registry('Lux.Layout.Footer', noComponent);

    const component = renderer.create(
      <Layout {...response}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
