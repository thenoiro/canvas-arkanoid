import logger from './logger/logger';
import game from './game/game';

require('../styles/base.css');

document.addEventListener('DOMContentLoaded', (): void => {
  logger.debug('DOM content loaded');
  const container = document.getElementById('container');

  if (container instanceof HTMLElement) {
    game({ container });
  } else {
    logger.error('Game container is not an HTMLElement type or not exist.');
  }
});
