/**
 * @module layout/Auth
 * @memberof layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import { hasAny } from '../../lib/has';
import storage from '../../lib/storage';

import Link from '../link';
import registry from '../componentRegistry';
import shapeOfSiren from '../siren.propType';

function authComponent(props) {
  const authAction = (props.actions || [])
    .filter(l => hasAny('name', ['login', 'logout'], l))[0];

  if (!authAction) {

    return (<noscript />);
  }

  const attrs = {
    className: 'auth-link link--plain',
    href: authAction.href,
    // TODO: integrate with Redux store; emit an event: "login", or "logout"
    // this will allow for more extension without replacing existing components
    onClick: (authAction.name === 'login'
      ? () => { storage('priorPage', location.pathname); }
      : () => { storage({ reset: 'authToken' }); }),
    title: authAction.title,
  };

  return (<Link {...attrs}>{attrs.title}</Link>);
}
authComponent.propTypes = {
  ...shapeOfSiren.links
};

registry('Auth', authComponent);
