/** @memberof module:react-components/Layout */

import React from 'react'; // Even if this isn't used it needs to be imported!

const YEAR = (new Date()).getFullYear();

function footerComponent() {

  return (
    <footer role="contentinfo">
      <p>&copy; {YEAR} <a className="link--plain" href="http://quickenloans.com">Quicken Loans</a></p> {/* eslint-ignore-long-line */}
    </footer>
  );
}
footerComponent.propTypes = {
};

export default footerComponent;
