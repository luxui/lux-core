/**
 * @module react/layout/main
 * @memberof react/layout
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../../lib/componentRegistry';
import routing from '../../lib/routing';

import responseModelShape from '../responseModel.propType';

import '../error';
import '../rest/collection';
import '../rest/item';

function component(Component, props, error) {

  return (
    <main id="maincontent" role="main">
      <Component {...props.data} error={error || false} path={props.path} />
    </main>
  );
}
component.propTypes = responseModelShape;

function mainComponent(props) {
  if (props.error) {

    return component(registry('Lux.Error'), props, props.error);
  }

  try {
    const pageComponent = routing(props.path);

    if (pageComponent) {

      return component(pageComponent, props);
    }
  } catch (e) {

    return component(registry('Lux.Error'), props, e);
  }

  const type = (props.data.class || [])
    .filter(item => /^(?:collection|item)$/.test(item))[0];

  switch (type) {
    case 'collection':

      return component(registry('Lux.Rest.Collection'), props);
    case 'item':

      return component(registry('Lux.Rest.Item'), props);
    default:

      return component(registry('Lux.Error'), props,
        new Error(`No appropriate Component for "${props.path}".`));
  }
}

registry('Lux.Layout.Main', mainComponent, false);
