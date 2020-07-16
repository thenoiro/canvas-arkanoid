import logger from '../logger/logger';
import GameController from './game-controller/game-controller';

require('./game.css');

interface GameOptions {
  container: HTMLElement
}

export default (options: GameOptions): void => {
  const { container } = options;
  const layout: string = `
    <div class="game-container">
      <div class="game-control">
        <button class="game-start">Start</button>
        <button class="game-stop">Stop</button>
      </div>
      <div class="canvas-container">
        <canvas class="game-canvas" tabindex="-1"></canvas>
      </div>
    </div>`;

  container.innerHTML = layout;
  const buttonStart = container.querySelector('.game-start');
  const buttonStop = container.querySelector('.game-stop');
  const gameController = new GameController({ container });

  if (buttonStart instanceof HTMLElement) {
    buttonStart.addEventListener('click', (): void => {
      logger.debug('Game started');
      gameController.start();
    });
  }
  if (buttonStop instanceof HTMLElement) {
    buttonStop.addEventListener('click', (): void => {
      logger.debug('Game stopped');
      gameController.stop();
    });
  }
  gameController.init();
  logger.debug('Game created', gameController);
};
