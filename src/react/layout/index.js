/**
 * @module layout
 * @memberof layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../componentRegistry';
import shapeOfSiren from '../siren.react';

import './footer';
import './header';
import './main';

function layoutComponent(props) {
  const data = props.error
    ? props.data.response
    : props.data;

  const Footer = registry('Footer');
  const Header = registry('Header');
  const Main = registry('Main');

  return (
    <div className="page">
      <SkipBanner />
      <Header {...data} />
      <Main {...props} />
      <Footer {...data} />
    </div>
  );
}
layoutComponent.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.shape({
      error: React.PropTypes.oneOfType([
        React.PropTypes.string, // error string ...?
        React.PropTypes.object, // Error object
      ]),
      response: React.PropTypes.object,
    }),
    React.PropTypes.shape(shapeOfSiren),
  ]).isRequired,
  error: React.PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  status: React.PropTypes.number,
};

function SkipBanner() {
  const attrs = {
    className: 'link--plain',
    href: '#maincontent',
    title: 'Skip to main content',
  };

  return (
    <div id="bannerSkip">
      <p><a {...attrs}>attrs.title</a></p>
    </div>
  );
}

registry('Layout', layoutComponent);
