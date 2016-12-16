import registry from './componentRegistry';

import './paging';
const paging = registry('Paging');

describe('Paging', function () {
  it('should exist; and should be a function', function () {
    expect(typeof paging).toMatch(/function/i);
  });

  it('should test all functionality', function () {
    fail();
  });
});
