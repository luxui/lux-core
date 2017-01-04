/**
 * @module react/layout
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';

import responseModelShape from '../responseModel.propType';

import './footer';
import './header';
import './main';

const skip = {
  className: 'link--plain',
  href: '#maincontent',
  title: 'Skip to main content',
};

// TODO: jsdoc-bloc this!
function layoutComponent(props) {
  const Footer = registry('Footer');
  const Header = registry('Header');
  const Main = registry('Main');

  return (
    <div className="page">
      <div id="skip-to-content"><p><a {...skip}>{skip.title}</a></p></div>
      <Header {...props.data} />
      <Main {...props} />
      <Footer {...props.data} />
    </div>
  );
}
layoutComponent.propTypes = responseModelShape;

registry('Layout', layoutComponent, false);
