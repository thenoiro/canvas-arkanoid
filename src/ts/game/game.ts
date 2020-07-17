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
        <button class="game-stop" disabled>Stop</button>
        <button class="game-restart">Restart</button>
      </div>
      <div class="canvas-container">
        <canvas class="game-canvas" tabindex="-1"></canvas>
      </div>
    </div>`;

  container.innerHTML = layout;
  const isElement = (el: any): el is HTMLElement => el instanceof HTMLElement;
  const buttonStart = container.querySelector('.game-start');
  const buttonStop = container.querySelector('.game-stop');
  const buttonRestart = container.querySelector('.game-restart');
  let gameController = new GameController({ container });

  if (isElement(buttonStart) && isElement(buttonStop) && isElement(buttonRestart)) {
    buttonStart.addEventListener('click', (): void => {
      logger.debug('Game started');
      gameController.start();
      buttonStart.setAttribute('disabled', 'disabled');
      buttonStop.removeAttribute('disabled');
    });
    buttonStop.addEventListener('click', (): void => {
      logger.debug('Game stopped');
      gameController.stop();
      buttonStart.removeAttribute('disabled');
      buttonStop.setAttribute('disabled', 'disabled');
    });
    buttonRestart.addEventListener('click', (): void => {
      logger.debug('Game restarted');
      gameController.destroy();
      const currentCanvas = container.querySelector('.game-canvas');
      const canvasContainer = container.querySelector('.canvas-container');

      if (isElement(currentCanvas) && isElement(canvasContainer)) {
        currentCanvas.remove();
        canvasContainer.innerHTML = '<canvas class="game-canvas" tabindex="-1"></canvas>';
        gameController = new GameController({ container });
        gameController.init();
        buttonStart.removeAttribute('disabled');
        buttonStop.setAttribute('disabled', 'disabled');
      }
    });
  }
  gameController.init();
  logger.debug('Game created', gameController);
};
