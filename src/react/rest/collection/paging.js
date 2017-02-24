/**
 * @module react/rest/collection/paging
 * @memberof react/rest/collection
 */

import React from 'react'; // Even if this isn't used it needs to be imported!

import registry from '../../../lib/componentRegistry';
import { hasAny, hasOne } from '../../../lib/has';

import Link from '../../link';
import randomKey from '../../randomKey';
import shapeOfSiren from '../../siren.propType';

function pagingComponent(props) {
  if (!props.links) {
    throw new Error('No `links` provided to Paging Component.');
  }

  const pagingLinks = [];

  const pagingLinkAdd = ({ href, title }, rel) => pagingLinks
    .push(<Link className={`paging-link__${rel}`} href={href}>{title}</Link>);

  props.links
    .forEach((link) => {
      if (hasAny('rel', ['first', 'start'], link)) {
        pagingLinkAdd(link, 'first');
      }

      if (hasOne('rel', 'prev', link)) {
        pagingLinkAdd(link, 'prev');
      }

      if (hasOne('rel', 'current', link)) {
        pagingLinkAdd(link, 'current');
      }

      if (hasOne('rel', 'next', link)) {
        pagingLinkAdd(link, 'next');
      }

      if (hasOne('rel', 'last', link)) {
        pagingLinkAdd(link, 'last');
      }
    });

  return pagingLinks.length
    ? (
      <ul className="paging-links">
        {pagingLinks
          // eslint-disable-next-line max-len
          .map(link => <li className="paging-links__item" key={randomKey()}>{link}</li>)}
      </ul>
    )
    : (<noscript />);
}
pagingComponent.propTypes = {
  links: shapeOfSiren.links,
};

registry('Lux.Rest.Collection.Paging', pagingComponent, false);
