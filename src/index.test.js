import lux, {
  apiRequest,
  init,
  luxPath,
  routing,
  storage,
} from './index';

describe('lux-core', function () {
  it('should exist; and should be a function', function () {
    expect(typeof lux).toMatch(/function/i);
  });

  it('should expose apiRequest', function () {
    expect(typeof apiRequest).toMatch(/function/i);
  });

  it('should expose init', function () {
    expect(typeof init).toMatch(/function/i);
  });

  it('should expose luxPath', function () {
    expect(typeof luxPath).toMatch(/function/i);
  });

  it('should expose routing', function () {
    expect(typeof routing).toMatch(/function/i);
  });

  it('should expose storage', function () {
    expect(typeof storage).toMatch(/function/i);
  });
});
