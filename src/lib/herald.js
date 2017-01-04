import { isFunction } from './is';

function heraldFactory() {
  let listeners = [];

  function herald(arg) {
    if (!arg) {
      throw new Error('A herald requires either a "message" or a "listener" (function); neither was provided.'); // eslint-disable-line max-len
    }

    if (isFunction(arg)) {
      listeners.push(arg);

      update();

      return () => {
        listeners = listeners.filter(fn => fn !== arg);
        update();
      };
    }

    listeners.forEach(fn => fn(arg));

    return true;
  }

  function update() {
    herald.listeners = listeners.slice(0);
  }

  update();

  return herald;
}

const instance = heraldFactory();

export default instance;

export {
  heraldFactory
};
