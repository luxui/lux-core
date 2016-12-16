/**
 * @module Link
 * @memberof lux-react
 */

import React from 'react'; // Even if this isn't used it needs to be imported!

import render from './index';

import luxPath from '../lib/luxPath';
import series from '../lib/series';

function attributeValue(name, attrs, defaultValue) {
  const isPresent = Object.keys(attrs).indexOf(name) > -1;
  const isFalse = `${attrs[name]}` === 'false';

  return isPresent ? isFalse : defaultValue;
}

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
      // TODO: integrate with Redux store; emit an event: "navigate"
      // this will allow for easier extension without needing to reimplementing
      render(newPath);
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

  const handleClick = attributeValue('noClickHandler', attrs, true);
  delete attrs.noClickHandler;

  if (handleClick) {
    attrs.onClick = attrs.onClick
      ? series(attrs.onClick, clickHandler)
      : clickHandler;
  }

  return (
    <a {...attrs}>{children}</a>
  );
}
Link.propTypes = {
  children: React.PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  href: React.PropTypes.string.isRequired,
};

export default Link;

export {
  clickHandler,
  isLeftClick,
  isModifiedClick,
};
