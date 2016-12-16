/**
 * @module Paging
 * @memberof luxReact
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from './componentRegistry';

function restCollectionComponent() {

  return (
    <div />
  );
}
restCollectionComponent.propTypes = {
};

registry('Collection', restCollectionComponent);
