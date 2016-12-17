/**
 * @module Rest.Collection/List
 * @memberof Rest.Collection
 */

import React from 'react'; // `React` must be in scope when using JSX

import randomKey from '../../randomKey';
import registry from '../../componentRegistry';
import shapeOfSiren from '../../siren.react';

import './item';

const RestCollectionListItem = registry('Rest.Collection.List.Item');

function RestCollectionList(props) {
  /* istanbul ignore else */
  if (!props.entities || !props.entities.length) {

    return (<p>No more {props.title} to show.</p>);
  }

  return (
    <ul className="collection-items list--bare mbm mtl">
      {props.entities.map(entity => (
        <li className="collection-items__item" key={randomKey()}>
          <RestCollectionListItem {...entity} />
        </li>
      ))}
    </ul>
  );
}
RestCollectionList.propTypes = {
  entities: shapeOfSiren.entities,
  title: React.PropTypes.string.isRequired,
};

registry('Rest.Collection.List', RestCollectionList);
