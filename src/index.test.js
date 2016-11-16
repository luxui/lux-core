import lux from './index';

const mock = jest.fn();

describe('Lux - Core', function () {
  it('should exist; and should be a function', function () {
    expect(typeof lux).toMatch(/function/i);
  });

  // it('', function () {
  //   lux({
  //     api: '//hello.world',
  //     routing: function () {},
  //   }, mock);
  // });
});
