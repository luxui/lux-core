/**
 * @module react/rest/item
 * @memberof react/rest
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../../lib/componentRegistry';

import '../../form';
import shapeOfSiren from '../../siren.propType';

import formModel from './formModel';

function restItemComponent(props) {
  const Form = registry('Lux.Form');

  return (<Form {...formModel(props)} />);
}
restItemComponent.propTypes = {
  ...shapeOfSiren,
  path: React.PropTypes.string.isRequired,
};

registry('Lux.Rest.Item', restItemComponent, false);
