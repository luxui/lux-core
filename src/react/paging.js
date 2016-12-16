/**
 * @module Paging
 * @memberof lux-react
 */

import React from 'react'; // Even if this isn't used it needs to be imported!

import registry from './componentRegistry';

function pagingComponent() {

  return (
    <div />
  );
}
pagingComponent.propTypes = {
};

registry('Paging', pagingComponent);
