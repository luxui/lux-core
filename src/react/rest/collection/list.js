/**
 * @module react/rest/collection/list
 * @memberof react/rest/collection
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

import randomKey from '../../randomKey';
import shapeOfSiren from '../../siren.propType';

import './item';

const RestCollectionListItem = registry('Lux.Rest.Collection.ListItem');

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

registry('Lux.Rest.Collection.List', RestCollectionList, false);
