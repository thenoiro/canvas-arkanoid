import { config } from '../config';

const inform = console;

export default {
  log: (...args: any): void => {
    inform.log(...args);
  },

  debug: (...args: any): void => {
    const timestamp = new Date().getTime();

    if (config.debug) {
      inform.debug(timestamp, ...args);
    }
  },

  error: (...args: any): void => {
    inform.error(...args);
  },
};
