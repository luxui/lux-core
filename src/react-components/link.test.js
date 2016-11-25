jest.mock('../index');
import lux from '../index';

jest.mock('../lib/luxPath');
import luxPath from '../lib/luxPath';

import React from 'react';
import renderer from 'react-test-renderer';

import Link, { clickHandler, isLeftClick, isModifiedClick } from './link';

describe('Lux - Link', function () {
  it('should match the snapshot', function () {
    const component = renderer.create(
      <Link href="/hello">Hello</Link>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('event handlers', function () {
    it('should have isLeftClick defined', function () {
      expect(typeof isLeftClick).toMatch(/function/i);
    });

    it('should have isModified defined', function () {
      expect(typeof isModifiedClick).toMatch(/function/i);
    });

    it('should detect left-click', function () {
      expect(isLeftClick({ button: 0 })).toBe(true);
    });

    it('should detect non left-click', function () {
      expect(isLeftClick()).toBe(false);
      expect(isLeftClick({})).toBe(false);
      expect(isLeftClick({ button: 1234 })).toBe(false);
    });

    [
      ['undefined event', undefined, false],
      ['empty event object', {}, false],
      ['alt key', { altKey: true }, true],
      ['ctrl key', { ctrlKey: true }, true],
      ['meta key', { metaKey: true }, true],
      ['shift key', { shiftKey: true }, true],
    ].forEach(set => {
      it(`should detect click modifiers (${set.shift()})`, function () {
        expect(isModifiedClick(set.shift())).toBe(set.shift());
      });
    });
  });

  describe('click handler', function () {
    it('should have clickHandler defined', function () {
      expect(typeof clickHandler).toMatch(/function/i);
    });

    it('should not navigate if the link is the same as the current page', function () {
      luxPath.mockReturnValue('/same');

      const event = {
        button: 0,
        preventDefault() {},
        target: {
          href: '/something-else',
          nodeName: 'A',
        }
      };

      clickHandler(event);
      expect(lux.mock.calls.length).toBe(0);
    });

    it('should navigate if the link is different than the current page', function () {
      luxPath
        .mockReturnValueOnce('/once')
        .mockReturnValueOnce('/twice');

      const event = {
        button: 0,
        preventDefault() {},
        target: {
          href: '/something-else',
          nodeName: 'A',
        }
      };

      spyOn(history, 'pushState');

      clickHandler(event);
      expect(lux.mock.calls.length).toBe(1);
      expect(history.pushState).toHaveBeenCalled();
    });

    it('should traverse up the DOM if Link contains children', function () {
      const link = '/nesting-link';

      luxPath
        .mockReturnValueOnce(link)
        .mockReturnValueOnce('/home');

      const event = {
        button: 0,
        preventDefault() {},
        target: {
          parentNode: {
            href: link,
            nodeName: 'A',
          }
        }
      };

      spyOn(history, 'pushState');

      clickHandler(event);
      expect(lux).lastCalledWith(link);
    });
  });
});
