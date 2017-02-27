import React from 'react';
import renderer from 'react-test-renderer';

import registry from '../../../lib/componentRegistry';

import './paging';
const Paging = registry('Lux.Rest.Collection.Paging');

describe('Paging', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Paging).toBe('function');
  });

  it('should throw an error if `links` is omitted', function () {
    spyOn(console, 'error'); // silence console
    expect(function () {
      renderer.create(<Paging />);
    }).toThrow('No `links` provided to Paging Component.');
  });

  it('should render `<noscript />` if no paging links are present', function () {
    const component = renderer.create(
      <Paging links={[
        {
          href: 'http://foo.bar',
          rel: ['not', 'paging'],
          title: 'Not Paging',
        }
      ]} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  [
    'first',
    'prev',
    'current',
    'next',
    'last',
  ].forEach(rel => {
    it(`should find and display "${rel}" links`, function () {
      const links = [
        {
          href: 'http://example.com/foo-bar',
          rel: [rel],
          title: 'Foo Bar',
        },
        {
          href: 'http://foo.bar',
          rel: ['not', 'paging'],
          title: 'Not Paging',
        }
      ];

      const component = renderer.create(
        <Paging links={links} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
