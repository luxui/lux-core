/** @module react-components/Link */

import React from 'react'; // Even if this isn't used it needs to be imported!

import lux from '../index';
import luxPath from '../lib/luxPath';
import series from '../lib/functionSeries';

function clickHandler(event) {
  /* istanbul ignore else */
  if (isLeftClick(event) && !isModifiedClick(event)) {
    event.preventDefault();
    let clickedLink = event.target;

    while (clickedLink.nodeName !== 'A') {
      clickedLink = clickedLink.parentNode;
    }

    const newPath = luxPath(clickedLink.href);

    if (newPath !== luxPath(window.location)) {
      lux(newPath);
      history.pushState(null, '', newPath);
    }
  }
}

function isLeftClick(event) {

  return event ? event.button === 0 : false;
}

function isModifiedClick(event) {

  return event
    ? !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    : false;
}

/**
 * Link provides a consistent way to create links (anchor tags) which work with
 * the Lux framework for no-refresh navigation with graceful fallback. When
 * using Link all properties added to the Link component will be transferred to
 * the resulting anchor tag.
 *
 * @param {object} props - All React properties for the instance of the
 * component.
 *
 * @returns ReactComponent
 *
 * @example
 * // page.js (jsx)
 * <Link href="/home">Go Home</Link>
 *
 * // will result in: <a href="/home">Go Home</a>
 *
 * @example
 * // home.js (jsx)
 * <Link className="auth-link" href="/sign-in">Sign-in</Link>
 *
 * // will result in: <a class="auth-link" href="/sign-in">Sign-in</a>
 */
function Link(props) {
  const attrs = { ...props };
  const { children } = props;

  delete attrs.children;

  attrs.onClick = series(attrs.onClick, clickHandler);

  return (
    <a {...attrs}>{children}</a>
  );
}
Link.propTypes = {
  children: React.PropTypes.node.isRequired,
  // eslint-disable-next-line
  href: React.PropTypes.string.isRequired,
};

export default Link;

export {
  clickHandler,
  isLeftClick,
  isModifiedClick,
};
