/** @memberof module:react-components/Layout */

import React from 'react'; // Even if this isn't used it needs to be imported!

function mainComponent() {

  return (
    <main className="body-divider pbl" role="main">
      {/* <!-- page content --> */}
      <p>Default Page Render</p>
    </main>
  );
}
mainComponent.propTypes = {
};

export default mainComponent;
