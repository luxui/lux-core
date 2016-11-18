import React from 'react'; // Even if this isn't used it needs to be imported!

import Header from './header';
import Main from './main';
import Footer from './footer';

function LayoutComponent() {

  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
LayoutComponent.propTypes = {
};

export default LayoutComponent;
