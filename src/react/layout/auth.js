/**
 * @module react/layout/auth
 * @memberof react/layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';
import { hasAny } from '../../lib/has';
import herald from '../../lib/herald';
import storage from '../../lib/storage';

import Link from '../link';
import shapeOfSiren from '../siren.propType';

const LOGOUT = 'logout';

herald((message) => {
  /* istanbul ignore else */
  if (message === LOGOUT) {
    storage({ reset: 'authToken' });
  }
});

function authComponent(props) {
  const authAction = (props.actions || [])
    .filter(action => hasAny('name', ['login', 'logout'], action))[0];

  if (!authAction) {

    return (<noscript />);
  }

  const attrs = {
    className: 'auth-link link--plain',
    href: authAction.href,
    onClick: (authAction.name === 'login'
      ? () => { storage('priorPage', location.pathname); }
      : () => { herald(LOGOUT); }),
    title: authAction.title,
  };

  return (<Link {...attrs}>{attrs.title}</Link>);
}
authComponent.propTypes = {
  ...shapeOfSiren.links,
};

registry('Lux.Layout.Auth', authComponent, false);
