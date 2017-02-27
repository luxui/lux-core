/**
 * @module react/fatal
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

function FatalErrorComponent(props) {
  const { error, model, path } = props;
  const rest = { ...props };
  delete rest.model;
  delete rest.path;

  console.error(error); // eslint-disable-line no-console

  return (
    <div className="page">
      <h1>Fatal Application Error</h1>

      <h2>Path</h2>
      <pre>{path}</pre>

      <h2>Model</h2>
      <pre>{JSON.stringify(model, null, ' ')}</pre>

      <h2>Others</h2>
      <pre>{JSON.stringify(rest, null, ' ')}</pre>
    </div>
  );
}
FatalErrorComponent.propTypes = {
  error: React.PropTypes.instanceOf(Error),
  // eslint-disable-next-line react/forbid-prop-types
  model: React.PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  path: React.PropTypes.any,
};

export default FatalErrorComponent;
