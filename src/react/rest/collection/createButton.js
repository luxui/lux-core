/**
 * @module Rest.Collection/CreateButton
 * @memberof Rest.Collection
 */

import React from 'react'; // `React` must be in scope when using JSX

import Link from '../../link';

import registry from '../../componentRegistry';

function RestCollectionCreateButton({ href, title }) {
  if (!href || !title) {

    return (<noscript />);
  }

  return (<Link className="btn btn--primary mrl" href={href}>{title}</Link>);
}
RestCollectionCreateButton.propTypes = {
  href: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

registry('Rest.Collection.CreateButton', RestCollectionCreateButton);
