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

function mainComponent(props) {
  let Component;

  try {
    if (props.error) {
      throw props.error;
    }

    const pageComponent = routing(props.path);

    if (pageComponent) {
      Component = pageComponent;
    } else {
      const type = (props.data.class || [])
        .filter(item => /^(?:collection|item)$/.test(item))[0];

      switch (type) {
        case 'collection':
          Component = registry('Lux.Rest.Collection');
          break;
        case 'item':
          Component = registry('Lux.Rest.Item');
          break;
        default:
          throw new Error(`No appropriate Component for "${props.path}".`);
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    Component = registry('Lux.Error');
  }

  return (
    <main className="body-divider pbl" id="maincontent" role="main">
      <Component {...props.data} path={props.path} />
    </main>
  );
}
mainComponent.propTypes = responseModelShape;

registry('Lux.Layout.Main', mainComponent, false);
