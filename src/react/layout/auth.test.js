jest.mock('../../lib/storage');
import storage from '../../lib/storage';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import registry from '../../lib/componentRegistry';

import './auth';
const Auth = registry('Auth');

const behavior = ReactTestUtils.createRenderer();
const { Simulate } = ReactTestUtils;

const login = [
  {
    href: 'http://example.com/login',
    name: 'login',
    title: 'Log in',
  }
];

const logout = [
  {
    href: 'http://example.com/logout',
    name: 'logout',
    title: 'Log out',
  }
];

describe('Auth (supplied Layout)', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Auth).toMatch(/function/i);
  });

  it('should result in a `<noscript />`', function () {
    const component = renderer.create(
      <Auth />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should result in a login link', function () {
    const component = renderer.create(
      <Auth actions={login} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should click on "login"', function () {
    // NOTE: "login" and "logout" tests are the same; only switching actions property
    behavior.render(
      <Auth actions={login} />
    );

    const component = behavior.getRenderOutput();

    storage.mockReset();
    expect(storage.mock.calls.length).toBe(0);
    component.props.onClick();
    expect(storage.mock.calls.length).toBe(1);
  });

  it('should click on "logout"', function () {
    // NOTE: "login" and "logout" tests are the same; only switching actions property
    behavior.render(
      <Auth actions={logout} />
    );

    const component = behavior.getRenderOutput();

    storage.mockReset();
    expect(storage.mock.calls.length).toBe(0);
    component.props.onClick();
    expect(storage.mock.calls.length).toBe(1);
  });
});
