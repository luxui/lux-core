/**
 * @module Navigation
 * @memberof react-lux/Layout
 */

import React from 'react'; // Even if this isn't used it needs to be imported!

import { hasOne } from '../../lib/has';

import Link from '../link';
import registry from '../componentRegistry';

function linksReduce(acc, link) {
  if (hasOne('rel', 'section', link)) {
    const className = hasOne('rel', 'self', link) ? 'active' : '';

    const linkAttrs = {
      className,
      href: link.href,
      title: link.title,
    };

    const itemAttrs = {
      className,
      key: `navigation-${linkAttrs.href}-${linkAttrs.title}`
    };

    return [
      ...acc,
      <li {...itemAttrs}><Link {...linkAttrs}>{linkAttrs.title}</Link></li>
    ];
  }

  return acc;
}

/**
 * Creates the main menu navigation of the site layout.
 *
 * @param  {ReactComponentProps} props - Component configuration properties.
 * @param  {array} props.links - A collection of link objects related to the
 * current resource.
 *
 * @return {ReactComponent}
 */
function navigationComponent(props) {

  return (
    <navigation id="mainnavigation" role="navigation">
      <ul>
        {(props.links).reduce(linksReduce, [])}
      </ul>
    </navigation>
  );
}
navigationComponent.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    href: React.PropTypes.string.isRequired,
    rel: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string.isRequired,
  })).isRequired,
};

registry('Navigation', navigationComponent);
