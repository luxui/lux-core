jest.mock('react-dom');
import ReactDOM from 'react-dom';

jest.mock('./call');
import call from './call';

import render from './render';

describe('Lux - render', function () {
  it('should exist; and should be a function', function () {
    expect(typeof render).toMatch(/function/i);
  });

  it('should not make an API call if data is provided', function () {
    render('/test', { name: 'Lux' });
    expect(call.mock.calls.length).toEqual(0);
  });

  it('should make an API call if no data is provided', function () {
    render('/test');
    expect(call).lastCalledWith('/test');
  });

  it('should default to "blank" if no path is provided', function () {
    render();
    expect(call).lastCalledWith('blank');
  });

  it('should call ReactDOM.render', function () {
    ReactDOM.render.mockClear();
    render();
    expect(ReactDOM.render.mock.calls.length).toEqual(1);
  });
});
