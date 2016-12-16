import debounce from './debounce';

describe('Library: debounce', () => {
  it(`should be defined`, () => {
    expect(debounce).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof debounce).toMatch('function');
  });

  it('should return a function', () => {
    expect(typeof debounce(_ => _)).toMatch('function');
  });

  it('should schedule functions to execute', (done) => {
    const global = {
      setTimeout(fn, delay) {
        expect(typeof fn).toBe('function');
        expect(typeof delay).toBe('number');
        fn();
      }
    };

    debounce(done, undefined, global)();
  });

  it('should call delayed functions', (done) => {
    const global = {
      setTimeout(fn) {
        fn();
      }
    };

    const debounced = debounce(done, 0, global);

    debounced(); // call the debounced function
  });

  it('should clear pending timeouts', (done) => {
    const global = {
      clearTimeout() {
        done();
      },
      setTimeout() {
        return true;
      }
    };

    const debounced = debounce(done, 0, global);

    debounced(); // set pending to true
    debounced(); // because pending is true clearTimeout will be called
  });
});
