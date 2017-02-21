/**
 * @module react/error
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

import registry from '../lib/componentRegistry';

// import Link from './link';
import responseModelShape from './responseModel.propType';

function errorComponent(props) {

  return (
    <section>
      <h1>Error</h1>
      <p>Luxui encountered an error.</p>
      <p>{`${props.error}`}</p>
      <pre><code>{JSON.stringify(props.error, null, ' ')}</code></pre>
    </section>
  );
}
errorComponent.propTypes = responseModelShape;

registry('Error', errorComponent, false);
