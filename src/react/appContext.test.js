import React from 'react';
import renderer from 'react-test-renderer';

import AppContextContainer from './appContext';

describe('AppContextContainer', function () {
  const TestComponent = (props, context) => (
    <span {...context}>testing...</span>
  );
  TestComponent.contextTypes = AppContextContainer.childContextTypes;

  it('should exist; and should be a function', function () {
    expect(typeof AppContextContainer).toBe('function');
  });

  it('should populate the context with functions', function () {
    const context = {
      app: {
        state: {},
      },
      setState: () => {},
    };

    const testComponent = renderer.create(
      <AppContextContainer app={context.app} setState={context.setState}>
        <TestComponent />
      </AppContextContainer>
    );
    const tree = testComponent.toJSON();
    const api = ['request', 'setState', 'state', 'visit'];
    expect(Object.keys(tree.props).sort()).toEqual(api);
  });
});
