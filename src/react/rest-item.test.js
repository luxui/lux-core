import registry from './componentRegistry';

import './rest-item';
const item = registry('Item');

describe('Item', function () {
  it('should exist; and should be a function', function () {
    expect(typeof item).toMatch(/function/i);
  });

  it('should test all functionality', function () {
    fail();
  });
});
