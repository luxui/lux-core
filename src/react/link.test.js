jest.mock('./render');

jest.mock('../lib/luxPath');
import luxPath from '../lib/luxPath';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import Link, { clickHandler, isLeftClick, isModifiedClick } from './link';

const behavior = ReactTestUtils.createRenderer();
const { Simulate } = ReactTestUtils;

describe('Link', function () {
  beforeEach(function () {
    spyOn(history, 'pushState');
    luxPath.mockReset();
  });

  describe('component', function () {
    it('should exist; and should be a function', function () {
      expect(typeof Link).toBe('function');
    });

    it('should throw an error if no `title` is accessible', function () {
      expect(function () {
        renderer.create(<Link href="/hello"><img /></Link>);
      }).toThrow('Links should always have a title attribute.');
    });

    it('should match the snapshot; with child content', function () {
      const component = renderer.create(
        <Link href="/hello">Hello</Link>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match the snapshot; with title', function () {
      const component = renderer.create(
        <Link href="/hello" title="Hello" />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match the snapshot; with alternate title attribute', function () {
      const component = renderer.create(
        <Link href="/hello" title="welcome">Hello</Link>
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should fire the clickHandler; with `noClickHandler=false`', function () {
      luxPath
        .mockReturnValueOnce('/always')
        .mockReturnValueOnce('/once');

      behavior.render(
        <Link href="/hello" noClickHandler="false">Hello</Link>
      );

      const count = history.pushState.calls.count();
      const event = {
        button: 0,
        preventDefault() {},
        target: {
          href: '/link',
          nodeName: 'A',
        }
      };

      const component = behavior.getRenderOutput();
      component.props.onClick(event);
      expect(history.pushState.calls.count()).toBe(count + 1);
    });

    it('should NOT fire the clickHandler; with `noClickHandler`', function () {
      let clicked = false;
      luxPath
        .mockReturnValueOnce('/always')
        .mockReturnValueOnce('/once');

      behavior.render(
        <Link href="/hello" noClickHandler onClick={() => { clicked = true; }}>Hello</Link>
      );

      const count = history.pushState.calls.count();
      const event = {
        button: 0,
        preventDefault() {},
        target: {
          href: '/link',
          nodeName: 'A',
        }
      };

      const component = behavior.getRenderOutput();
      expect(clicked).toBe(false);
      component.props.onClick(event);
      expect(clicked).toBe(true);
      expect(history.pushState.calls.count()).toBe(count);
    });
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
      luxPath
        .mockReturnValue('/same');

      const event = {
        button: 0,
        preventDefault() {},
        target: {
          href: '/same',
          nodeName: 'A',
        }
      };

      clickHandler(event);
      expect(history.pushState.calls.count()).toBe(0);
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

      clickHandler(event);
      expect(history.pushState.calls.count()).toBe(1);
      expect(history.pushState).toHaveBeenCalled();
    });

    it('should traverse up the DOM if Link contains children', function () {
      const href = '/nesting-link';

      luxPath
        .mockReturnValueOnce(href)
        .mockReturnValueOnce('/home');

      const event = {
        button: 0,
        preventDefault() {},
        target: {
          parentNode: {
            href: href,
            nodeName: 'A',
          }
        }
      };

      clickHandler(event);
      expect(history.pushState).lastCalledWith(null, '', href);
    });
  });
});
