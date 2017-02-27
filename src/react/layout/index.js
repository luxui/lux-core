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

function LayoutComponent(props) {
  const Footer = registry('Lux.Layout.Footer');
  const Header = registry('Lux.Layout.Header');
  const Main = registry('Lux.Layout.Main');

  return (
    <div className="page">
      <div id="skip-to-content"><p><a {...skip}>{skip.title}</a></p></div>
      <Header {...props.data} />
      <Main {...props} />
      <Footer {...props.data} />
    </div>
  );
}
LayoutComponent.propTypes = responseModelShape;

registry('Lux.Layout.Layout', LayoutComponent, false);
