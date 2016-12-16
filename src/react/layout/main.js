/**
 * @module Main
 * @memberof lux-react
 */

import React from 'react'; // Even if this isn't used it needs to be imported!

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
