import GameController from './game-controller/game-controller';
import gameStyles from './game.css';
import { log } from '../logger/logger';

export default (gameContainer = 'container') => {
  log('Game styles loaded', gameStyles);
  const gameLayout = `
    <div class="game-container">
      <div class="game-control">
        <button class="game-start">Start</button>
        <button class="game-stop">Stop</button>
      </div>
      <div class="canvas-container">
        <canvas class="game-canvas" tabindex="-1"></canvas>
      </div>
    </div>`;

  const container = document.getElementById(gameContainer);
  container.innerHTML = gameLayout;

  const gameController = new GameController({ container });
  gameController.init();

  const buttonStart = container.querySelector('.game-start');
  const buttonStop = container.querySelector('.game-stop');

  buttonStart.addEventListener('click', () => {
    gameController.startLoop();
  });
  buttonStop.addEventListener('click', () => {
    gameController.stopLoop();
  });
};

/*
  ctx.fillStyle = '#color';
  ctx.fillRect(x, y, width, height);
  ctx.clearRect(x, y, width, height);
*/
