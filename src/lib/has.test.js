import { hasAll, hasAny, hasOne } from './has';

describe('Library: has', () => {
  it('should have methods', function () {
    expect(hasAll).toBeDefined();
    expect(hasAny).toBeDefined();
    expect(hasOne).toBeDefined();
  });

  it('should test for all rels', function () {
    const rels = ['one', 'two', 'three'];
    const link = {
      rel: rels
    };

    expect(hasAll('rel', rels, link)).toBe(true);
    expect(hasAll('rel', rels, {rel: []})).toBe(false);
  });

  it('should test for some rels', function () {
    const rels = ['one', 'two', 'three'];
    const link = {
      rel: rels
    };

    expect(hasAll('rel', ['one'], link)).toBe(true);
    expect(hasAll('rel', ['fourtyTwo'], link)).toBe(false);
  });

  it('should test for single rels', function () {
    const rels = ['one', 'two', 'three'];
    const link = {
      rel: rels
    };

    expect(hasOne('rel', 'one', link)).toBe(true);
    expect(hasOne('rel', 'two', link)).toBe(true);
    expect(hasOne('rel', 'three', link)).toBe(true);
    expect(hasOne('rel', 'fourtyTwo', link)).toBe(false);
  });

  it('should test for any rels', function () {
    const rels = ['one', 'two', 'three'];
    const link = {
      rel: rels
    };

    expect(hasAny('rel', ['one', 'four', 'five'], link)).toBe(true);
    expect(hasAny('rel', ['four', 'five'], link)).toBe(false);
  });
});
