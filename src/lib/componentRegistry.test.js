import registry from './componentRegistry';

describe('componentRegistry', function () {
  it('should exist; and should be a function', function () {
    expect(typeof registry).toMatch(/function/i);
  });

  it('should store a component', function () {
    const key = 'myApp.component';
    const random = 1234567890;

    registry(key, () => random);
    const tempComponent = registry(key);

    expect(tempComponent()).toBe(random);
  });

  it('should throw an error if no component identifier is provided', function () {
    expect(function () {
      registry();
    }).toThrow(new Error('Component identifiers are required and must be strings.'));
  });

  it('should throw an error if no component identifier is provided', function () {
    expect(function () {
      registry('');
    }).toThrow(new Error('Component identifiers are required and must be strings.'));
  });

  it('should throw an error if component identifier is not a string', function () {
    expect(function () {
      registry(1234);
    }).toThrow(new Error('Component identifiers are required and must be strings.'));
  });

  it('should throw an error if component is not a function', function () {
    expect(function () {
      registry('myComponent', 1234);
    }).toThrow(new Error('Components must be functions.'));
  });

  it('should overwrite an existing component by default', function () {
    registry('Hello', () => 'Goodbye');
    registry('Hello', () => 'Hello');

    expect(registry('Hello')()).toBe('Hello');
  });

  it('should return `undefined` for undefined components', function () {
    expect(registry('This is an undefined component')).toBe(undefined);
  });

  it('should NOT overwrite an existing component when indicating not to', function () {
    registry('Hello', () => 'Hello');
    registry('Hello', () => 'Goodbye', false);

    expect(registry('Hello')()).toBe('Hello');
  });

  it('should throw an error if too many arguments are provided', function () {
    expect(function () {
      registry('myComponent', () => {}, true, 234);
    }).toThrow(new Error('Too many arguments provided to componentRegistry.'));
  });

  it('should allow "registering" in any order', function () {
    registry('FirstParent', () => 'Parent');
    registry('FirstParent.Child', () => 'Child');

    expect(registry('FirstParent')()).toBe('Parent');
    expect(registry('FirstParent.Child')()).toBe('Child');

    registry('SecondParent.Child', () => 'Child');
    registry('SecondParent', () => 'Parent');

    expect(registry('SecondParent')()).toBe('Parent');
    expect(registry('SecondParent.Child')()).toBe('Child');
  });
});
