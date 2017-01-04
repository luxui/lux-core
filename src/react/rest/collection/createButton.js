/**
 * @module react/rest/collection/createButton
 * @memberof react/rest/collection
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

import Link from '../../link';

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
