import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../componentRegistry';

import './index';
const Layout = registry('Layout');
const Header = registry('Header');
const Main = registry('Main');
const Footer = registry('Footer');

describe('Layout (supplied Layout)', function () {
  let response;

  afterEach(function () {
    // set these back to original values
    registry('Header', Header);
    registry('Main', Main);
    registry('Footer', Footer);
  });

  beforeEach(function () {
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
    spyOn(console, 'error');
    expect(function () {
      renderer.create(<Layout />);
    }).not.toThrow();
  });

  it('should pass responseModel.data to Header', function () {
    spyOn(console, 'error');
    registry('Header', (model) => {
      expect(model).toEqual(response.data);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should pass responseModel.data to Footer', function () {
    spyOn(console, 'error');
    registry('Footer', (model) => {
      expect(model).toEqual(response.data);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should pass responseModel to Main', function () {
    spyOn(console, 'error');
    registry('Main', (model) => {
      expect(model).toEqual(response);

      return (<p />);
    });
    renderer.create(<Layout {...response} />);
  });

  it('should match snapshot', function () {
    const noComponent = () => (<noscript />);

    registry('Header', noComponent);
    registry('Main', noComponent);
    registry('Footer', noComponent);

    const component = renderer.create(
      <Layout {...response}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
