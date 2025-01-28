import browser from 'webextension-polyfill';
import { objectHasKey } from './helper';

const nameBuilder = (prefix, name) => (prefix ? `${prefix}--${name}` : name);

export class MessageListener {
  private listeners = [];
  private prefix: string = '';

  constructor(prefix: string = '') {
    this.listeners = [];
    this.prefix = prefix;
  }

  on(name: string, listener: () => void) {
    if (objectHasKey(this.listeners, name)) {
      console.error(`You already added ${name}`);
      return this.on;
    }

    this.listeners[nameBuilder(this.prefix, name)] = listener;
    return this.on;
  }

  listen(message, sender) {
    try {
      const listener = this.listeners[message.name];
      const response =
        listener && listener.call({ message, sender }, message.data, sender);
      if (!response) {
        return Promise.resolve();
      }

      if (!(response instanceof Promise)) {
        return Promise.resolve(response);
      }

      return response;
    } catch (error) {
      return Promise.reject(
        new Error(`Unhandled Background Error: ${String(error)}`)
      );
    }
  }

  listener() {
    return this.listen.bind(this);
  }
}

export function sendMessage(name = '', data = {}, prefix = '') {
  const payload = {
    name: nameBuilder(prefix, name),
    data,
  };

  return browser.runtime.sendMessage(payload);
}
