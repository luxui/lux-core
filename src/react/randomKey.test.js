import randomKey from './randomKey';

describe('randomKey', () => {
  it('should exist', function () {
    expect(typeof randomKey).toBe('function');
  });

  it('should return a string', function () {
    expect(typeof randomKey()).toBe('string');
  });
});
