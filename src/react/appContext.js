/**
 * @module react/appContext
 * @memberof react
 */

import React from 'react'; // `React` must be in scope when using JSX

class AppContextContainer extends React.Component {
  getChildContext() {
    /**
     * @typedef {Object} Context
     *
     * Application components can optionally recieve a `context` object, as an
     * instance parameter, for interacting with or manipulating the application
     * at the top-level in a consistent through the provided methods. The
     * "context" feature of React is a way to provide this object implicitly to
     * child components without the need to explicitly "passing down" the
     * object through all of the layers of components.
     *
     * @property {Function} request - perform a root-relative API request;
     *   where the root is prefilled by the value provided at application init.
     * @property {Function} setState - pass the new state object to change the
     *   current state of the application; state change will incur a re-render.
     * @property {Object} state - the current state of the application; a copy
     *   of the actual state instead of a reference to the actual state object.
     * @property {Function} visit - pass an application path to naviate to the
     *   corresponding page; an API request will be made if necessary.
     *
     * @example
     * // define a new application component
     * function MessageBoard(props, context) {
     *   // ...
     * }
     * // "opt-in" to recieve context properties;
     * // otherwise they will not be provided by React
     * MessageBoard.contextTypes = {
     *   setState: React.PropTypes.func,
     * };
     */
    const context = {
      request: this.props.app.request,
      setState: this.props.setState,
      state: this.props.app.state,
      visit: this.props.app.visit,
    };

    return context;
  }

  render() {

    return (this.props.children);
  }
}
AppContextContainer.childContextTypes = {
  request: React.PropTypes.func,
  setState: React.PropTypes.func,
  state: React.PropTypes.object,
  visit: React.PropTypes.func,
};
AppContextContainer.propTypes = {
  app: React.PropTypes.shape({
    request: React.PropTypes.func,
    state: React.PropTypes.object,
    visit: React.PropTypes.func,
  }).isRequired,
  children: React.PropTypes.element.isRequired,
  setState: React.PropTypes.func.isRequired,
};

export default AppContextContainer;
