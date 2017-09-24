import {isWeex} from 'universal-env';

let storage;

if (!isWeex) {
  if (typeof localStorage !== 'undefined' && localStorage !== null) { // 无痕浏览模式下 localStorage 为 null，需要兼容，否则 storage.getItem 会报错
    storage = localStorage;
  }
} else {
  storage = require('@weex-module/storage');
}

class AsyncStorage {
  constructor() {

  }
  static getItem(key, callback = () => {}) {
    if (storage.getItem) {
      if (!isWeex) {
        let value = storage.getItem(key);
        callback({
          data: value ? value : 'undefined',
          result: 'success'
        });
      } else {
        storage.getItem(key, callback);
      }
    }
  }

  static setItem(key, value, callback = () => {}) {
    if (storage.setItem) {
      if (!isWeex) {
        storage.setItem(key, value);
        callback({
          data: undefined,
          result: 'success'
        });
      } else {
        storage.setItem(key, value, callback);
      }
    }
  }

  static removeItem(key, callback = () => {}) {
    if (storage.removeItem) {
      if (!isWeex) {
        storage.removeItem(key);
        callback({
          data: undefined,
          result: 'success'
        });
      } else {
        storage.removeItem(key, callback);
      }
    }
  }

  static sLength(callback = () => {}) {
    if (storage.length) {
      if (!isWeex) {
        callback({
          data: storage.length,
          result: 'success'
        });
      } else {
        storage.length(callback);
      }
    }
  }
}

export default AsyncStorage;