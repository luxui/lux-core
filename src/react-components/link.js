import React from 'react'; // Even if this isn't used it needs to be imported!

import lux from '../index';
import endpoint from '../lib/endpoint';
import series from '../lib/functionSeries';

function clickHandler(event) {
  /* istanbul ignore else */
  if (isLeftClick(event) && !isModifiedClick(event)) {
    event.preventDefault();
    let clickedLink = event.target;

    while (clickedLink.nodeName !== 'A') {
      clickedLink = clickedLink.parentNode;
    }

    const newPath = endpoint(clickedLink.href);

    /* istanbul ignore else */
    if (newPath !== endpoint(window.location)) {
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
