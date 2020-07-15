import config from '../config';

const { debug } = config;
const logStorage = [];

export const inform = console;

export const log = (...args) => {
  const timestamp = new Date().getTime();
  const logObject = { timestamp, args };
  logStorage.push(logObject);

  if (debug) {
    inform.debug(timestamp, ...args);
  }
};
