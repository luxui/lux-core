import herald, { heraldFactory } from './herald';

describe('heraldFactory', function () {
  const instance = heraldFactory();

  it('should be defined and be a function', function () {
    expect(typeof heraldFactory).toBe('function');
  });

  it('should throw an error if no argument is provided', function () {
    expect(function () {
      instance();
    }).toThrow('A herald requires either a "message" or a "listener" (function); neither was provided.');
  });

  it('should return a "remove" function that removes the registered "listener" function', function () {
    expect(instance.listeners.length).toBe(0);

    const remove = instance(() => fail());
    expect(instance.listeners.length).toBe(1);

    remove();
    expect(instance.listeners.length).toBe(0);
  });

  it('should "broadcast" a message to listeners', function () {
    const message = 'Hello, world.'
    let passing = false;
    const remove = instance(msg => passing = msg === message);

    instance(message);
    remove();
    expect(passing).toBe(true);
  });

  it('should isolate instance listeners', function () {
    const other = heraldFactory();

    let count = 0;

    instance(() => count += 1);

    other(() => count += 2);
    other(() => count += 4);
    other(() => count += 8);
    other(() => count += 16);

    expect(instance.listeners.length).not.toBe(other.listeners.length);

    other('litterally anything; except a function');
    expect(count).toBe(30);

    instance('again, anything but a function');
    expect(count).toBe(31);
  });
});
