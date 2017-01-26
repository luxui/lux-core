import React from 'react';
import renderer from 'react-test-renderer';

import Fatal from './fatal';

describe('Fatal', function () {
  it('should exist; and should be a function', function () {
    expect(typeof Fatal).toBe('function');
  });

  it('should match the snapshot', function () {
    const props = {
      error: new Error('Fatal error.'),
      model: {
        props: 'might not actually exist',
      },
      path: 'could be anything'
    };

    spyOn(console, 'error');

    const component = renderer.create(
      <Fatal {...props} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(console.error).lastCalledWith(props.error);
  });
});
