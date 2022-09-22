import localforage from "localforage";
import * as memoryDriver from 'localforage-driver-memory';

const getDefaultConfig = () => ({
  name: 'meetmeet',
  driver: [localforage.INDEXEDDB]
})

export default class Storage {
  storage: any;
  constructor(storage: any, config: { [key: string]: any }) {
    this.storage = storage
    this.config(config)
  }

  setItem(key: string, value: unknown) {
    try {
      return this.storage.setItem(key, value)
    } catch (e) {
      console.log('setItem - Executing on SSR')
    }
  }

  getItem(key: string) {
    try {
      return this.storage.getItem(key)
    } catch (e) {
      console.log('getItem - Executing on SSR')
    }
  }

  removeItem(key: string) {
    try {
      return this.storage.removeItem(key)
    } catch (e) {
      console.log('removeItem - Executing on SSR')
    }
  }

  length() {
    try {
      return this.storage.length()
    } catch (e) {
      console.log('length - Executing on SSR')
    }
  }

  async config({ ...restConfig }) {
    const { driver, ...localForageConfig }: any = {
      ...getDefaultConfig(),
      ...restConfig
    }

    this.storage.config(localForageConfig)

    if (driver !== undefined) {
      try {
        await this.storage.ready()
        this.storage.defineDriver(memoryDriver);
        this.storage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL, memoryDriver._driver]);
      } catch (e) {
        console.log('Storage on SSR Mode')
      }
    }
  }

  keys() {
    try {
      return this.storage.keys()
    } catch (e) {
      console.log('Keys - Executing on SSR')
    }
  }

  clean() {
    try {
      return this.storage.clean()
    } catch (e) {
      console.log('Clean - Executing on SSR')
    }
  }
}

export const noticeStorage = new Storage(localforage.createInstance(getDefaultConfig()), getDefaultConfig())