/**
 * @module layout/Main
 * @memberof layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../componentRegistry';
import shapeOfSiren from '../siren.react';

function childFinder() {}

function mainComponent(props) {

  return (
    <main className="body-divider pbl" id="maincontent" role="main">
      {childFinder(props.class)}
    </main>
  );
}
mainComponent.propTypes = {
  ...shapeOfSiren
};

registry('Main', mainComponent);
