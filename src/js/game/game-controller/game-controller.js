import { log, inform } from '../../logger/logger';
import config from '../../config';
import Paddle from './paddle/paddle';
import InputController from './input-controller';
import GameLoop from './game-loop';

export default class GameController {
  constructor(options) {
    const { container } = options;
    const { canvas: canvasConfig } = config.game;
    const { width, height } = canvasConfig;
    const canvas = container.querySelector('.game-canvas');
    const context = canvas.getContext('2d');
    const input = new InputController({ element: canvas });

    this.container = container;
    this.canvas = canvas;
    this.context = context;
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.loop = new GameLoop(() => this.clear());
    this.paddle = new Paddle({ context, input });
  }

  init() {
    log('Game started');
    this.render();
  }

  render() {
    const { canvas } = this;
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);
    this.clear();
    this.paddle.render();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  startLoop() {
    this.loop.start();
    this.canvas.focus();
  }

  stopLoop() {
    this.loop.stop();
  }
}
