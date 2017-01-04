/**
 * @module react/rest/collection
 * @memberof react/rest
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';
import { hasOne } from '../../../lib/has';

import randomKey from '../../randomKey';
import shapeOfSiren from '../../siren.propType';

import './createButton';
import './list';
import './paging';

const CreateButton = registry('Rest.Collection.CreateButton');
const Paging = registry('Rest.Collection.Paging');
const RestCollectionList = registry('Rest.Collection.List');

function createLinks(links) {

  return links
    .reduce((acc, action) => {
      /* istanbul ignore else */
      if (/^create/.test(action.name)) {
        const link = {
          ...action,
          href: `${action.href}/new`
        };

        acc.push(<CreateButton {...link} key={randomKey()} />);
      }

      return acc;
    }, []);
}

function restCollectionComponent(props) {
  const self = props.links
    .filter(link => hasOne('rel', 'self', link))[0];

  if (!self) {
    throw new Error('No `self` link provided from API in response.');
  }

  return (
    <div className="collection-display">
      <h2 className="heading--primary">{self.title}</h2>

      {createLinks(props.actions)}

      <RestCollectionList entities={props.entities} title={self.title} />

      <Paging links={props.links} />
    </div>
  );
}
restCollectionComponent.propTypes = {
  ...shapeOfSiren
};

registry('Rest.Collection', restCollectionComponent);
