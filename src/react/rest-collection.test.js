import registry from './componentRegistry';

import './rest-collection';
const collection = registry('Collection');

describe('Collection', function () {
  it('should exist; and should be a function', function () {
    expect(typeof collection).toMatch(/function/i);
  });

  it('should test all functionality', function () {
    fail();
  });
});
