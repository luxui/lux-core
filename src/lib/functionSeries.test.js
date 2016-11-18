import lib from './functionSeries';

describe('Utility: series', () => {
  it('should exist', () => {
    expect(lib).toBeDefined();
  });

  it('should return a function', function () {
    let count = 0;

    const series = lib(
      x => count += x,
      x => count += x,
      x => count += x
    );

    series(1);

    expect(count).toBe(3);
  });
});
