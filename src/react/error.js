/**
 * @module react/error
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../lib/componentRegistry';

function errorComponent(props) {
  // eslint-disable-next-line no-console
  console.log(props);

  return (
    <section>
      <h1>Error</h1>
      <p>Luxui encountered an error.</p>
      <p><strong>{`${props.error}`}</strong></p>
    </section>
  );
}
errorComponent.propTypes = {
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Error),
  ]),
};

registry('Lux.Error', errorComponent, false);
