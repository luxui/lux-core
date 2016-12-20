import flatten from './flattenArray';

describe('flattenArray', function () {
  it(`should be defined`, function () {
    expect(typeof flatten).toBe('function');
  });

  it(`should throw an error if anything but an array is passed`, function () {
    expect(function () {
      flatten()
    }).toThrow('Only an array makes sense to `flattenArray`.');
  });

  it('should flatten an array', function () {
    const input = [
      1,
      [
        2,
        [
          3,
          4,
        ],
        5
      ]
    ];

    const output = [1,2,3,4,5];

    expect(flatten(input)).toEqual(output);
  });
});
