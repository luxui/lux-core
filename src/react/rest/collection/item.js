/**
 * @module Rest.Collection/Item
 * @memberof Rest.Collection
 */

import React from 'react'; // `React` must be in scope when using JSX

import Link from '../../link';

import registry from '../../componentRegistry';

const icon = (<span className="collection-items__icon" />);

function RestCollectionListItem({ href, title }) {
  if (!title) {
    throw new Error('A `title` is required for `RestCollectionListItem`.');
  }

  return href
    ? (<Link href={href} title={title}>{title} {icon}</Link>)
    : (<span>{title} {icon}</span>);
}
RestCollectionListItem.propTypes = {
  href: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};

registry('Rest.Collection.List.Item', RestCollectionListItem);
