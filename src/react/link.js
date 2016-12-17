/**
 * @module Link
 * @memberof luxReact
 */

import React from 'react'; // `React` must be in scope when using JSX

import { isString } from '../lib/is';
import luxPath from '../lib/luxPath';
import series from '../lib/series';

import render from './render';

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
  const { children, title } = props;

  delete attrs.children;
  if (title || isString(children)) {
    attrs.title = title || children;
  } else {
    throw new Error('Links should always have a title attribute.');
  }

  const handleClick = attributeValue('noClickHandler', attrs, true);
  delete attrs.noClickHandler;

  if (handleClick) {
    attrs.onClick = attrs.onClick
      ? series(attrs.onClick, clickHandler)
      : clickHandler;
  }

  return (
    <a {...attrs}>{children || title}</a>
  );
}
Link.propTypes = {
  children: React.PropTypes.node,
  // eslint-disable-next-line react/no-unused-prop-types
  href: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
};

export default Link;

export {
  clickHandler,
  isLeftClick,
  isModifiedClick,
};
