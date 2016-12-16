/**
 * @module Paging
 * @memberof luxReact
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from './componentRegistry';

function restItemComponent() {

  return (
    <div />
  );
}
restItemComponent.propTypes = {
};

registry('Item', restItemComponent);
