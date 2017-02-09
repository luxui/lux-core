/**
 * @module react/link
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

import { isString } from '../lib/is';
import luxPath from '../lib/luxPath';
import series from '../lib/series';

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
      window.history.pushState(null, '', newPath);
      this.visit(newPath);
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
 * @param {object} context - React component `context` object.
 *
 * @return {ReactComponent} - the Link React component
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
function Link(props, context) {
  const attrs = { ...props };
  const { children, title } = props;

  delete attrs.children;
  if (title || isString(children)) {
    attrs.title = title || children;
  } else {
    throw new Error('Links must always have a title attribute.');
  }

  const handleClick = (x => (x ? x === 'false' : true))(attrs.noClickHandler);
  delete attrs.noClickHandler;

  if (handleClick) {
    attrs.onClick = attrs.onClick
      ? series(attrs.onClick, clickHandler.bind(context))
      : clickHandler.bind(context);
  }

  return (
    <a {...attrs}>{children || title}</a>
  );
}
Link.contextTypes = { visit: React.PropTypes.func };
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
