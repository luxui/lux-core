import lux from './index';

describe('Lux - Core', function () {
  it('should exist; and should be a function', function () {
    expect(typeof lux).toMatch(/function/i);
  });

  describe('Invalid Configuration Properties', function () {
    it('should throw an error if the `api` is omitted', function () {
      expect(function () {
        lux();
      }).toThrow();
    });

    it('should throw an error if the `api` is not a string', function () {
      expect(function () {
        lux({
          api: 1234
        });
      }).toThrow();
    });

    it('should throw an error if the `routing` is omitted', function () {
      expect(function () {
        lux({
          api: 'http://api.root',
        });
      }).toThrow();
    });

    it('should throw an error if the `routing` is not a function', function () {
      expect(function () {
        lux({
          api: 'http://api.root',
          routing: 'true',
        });
      }).toThrow();
    });

    it('should throw an error if the `template` is omitted', function () {
      expect(function () {
        lux({
          api: 'http://api.root',
          routing: function () {},
        });
      }).toThrow();
    });

    it('should throw an error if the `template` is not a function', function () {
      expect(function () {
        lux({
          api: 'http://api.root',
          routing: function () {},
          template: 'I\'m a template',
        });
      }).toThrow();
    });
  });
});
