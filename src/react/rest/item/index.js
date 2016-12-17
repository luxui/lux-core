/**
 * @module Rest.Item
 * @memberof Rest.Item
 */

import React from 'react'; // `React` must be in scope when using JSX

import '../../form';

import registry from '../../componentRegistry';
import shapeOfSiren from '../../siren.react';

import formModel from './formModel';

function restItemComponent(props) {
  const Form = registry('Form');

  return (<Form {...formModel(props)} />);
}
restItemComponent.propTypes = {
  ...shapeOfSiren,
  path: React.PropTypes.string.isRequired,
};

registry('Rest.Item', restItemComponent);
