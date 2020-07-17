import { config } from '../config';

interface LoggerInterface {
  log: (...args: any) => void;
  debug: (...args: any) => void;
  error: (...args: any) => void;
  null: (...args: any) => void;
  condition: (expression: boolean) => LoggerInterface;
}

const inform = console;
const empty = () => {};

const logger: LoggerInterface = {
  log: (...args: any): void => {
    inform.log(...args);
  },

  debug: (...args: any): void => {
    const timestamp: number = new Date().getTime();

    if (config.debug) {
      inform.debug(timestamp, ...args);
    }
  },

  error: (...args: any): void => {
    inform.error(...args);
  },

  null: (...args: any): void => {
    const block: boolean = false;

    if (block) {
      inform.debug(...args);
    }
  },

  condition: (expression: boolean): LoggerInterface => {
    if (expression) {
      return logger;
    }
    return {
      log: empty,
      debug: empty,
      error: empty,
      null: empty,
      condition: (...args) => logger.condition(...args),
    };
  },
};
export default logger;
