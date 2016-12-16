/**
 * @module Header
 * @memberof lux-react/layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import { hasOne } from '../../lib/has';

import './auth';
import './navigation';

import registry from '../componentRegistry';
import shapeOfSiren from '../siren.react';

/**
 * Creates the main header of the site layout.
 *
 * @param  {ReactComponentProps} props - A Siren object from the server.
 * @param  {array} props.links - A collection of link objects related to the
 * current resource.
 *
 * @return {ReactComponent}
 *
 * ## Siren Considerations
 *
 * The `Header` component makes use of the Siren properties: `links`, and
 * `actions`. The `links` are searched for the API "root" URI (resource)
 * indicated by the `rel` "index". The `links` are also passed to the
 * `Navigation` component for generating the main menu of the page. The Siren
 * property `actions` is searched for an action for "loggin in/out"; if neither
 * are found the auth-link is omitted completely.
 *
 * ### Siren Property & Usage
 *
 *   - `links`
 *     1. Header banner link for application
 *     2. Main menu, navigation, links
 *   - `actions`
 *     1. Login/logout - action `name`
 */
function headerComponent(props) {
  const rootLink = (props.links || [])
    .filter(l => hasOne('rel', 'index', l))[0] || {};

  const fallbackLink = {
    href: rootLink.href || '/',
    rel: ['section'],
    title: rootLink.title || 'Home',
  };

  const { href, title } = fallbackLink;

  const Auth = registry('Auth');
  const Navigation = registry('Navigation');

  return (
    <header className="main-header" role="banner">
      <h1><a className="link--heroOrSomething" href={href}>{title}</a></h1>

      <Navigation links={props.links || [fallbackLink]} />

      <Auth links={props.links || []} />
    </header>
  );
}
headerComponent.propTypes = {
  ...shapeOfSiren
};

registry('Header', headerComponent);
export default registry('Header');
