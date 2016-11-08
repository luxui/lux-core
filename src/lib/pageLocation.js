function pageLocation(loc) {

  return loc.pathname.replace(/\/+$/, '') + (loc.search || '');
}

export default pageLocation;
