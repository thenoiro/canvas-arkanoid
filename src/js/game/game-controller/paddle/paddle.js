import config from '../../../config';
import PaddlePosition from './paddle-position';
import PaddleMovement from './paddle-movement';
import GameLoop from '../game-loop';
import InputController from '../input-controller';

export default class Paddle {
  /**
   * Paddle options
   * @param {object} options
   * @param {object} options.context
   * @param {object} options.input
   */
  constructor(options = {}) {
    const { context, input } = options;
    const { paddle, canvas } = config.game;

    this.context = context;
    this.ctx = context;
    this.color = paddle.color;
    this.position = new PaddlePosition({
      container: {
        width: canvas.width,
        height: canvas.height,
      },
      paddle: {
        width: paddle.width,
        height: paddle.height,
        margin: paddle.margin,
      },
    });
    this.loop = new GameLoop((delay) => this.move(delay));
    this.paddleMovement = new PaddleMovement();
    this.inputController = input;
  }

  render() {
    const { ctx, position: pos, color } = this;
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
  }

  move(delta) {
    const { width } = config.game.canvas;
    const { position: pos } = this;
    const direction = this.getCurrentDirection();
    const offset = this.paddleMovement.calculateMove({ direction, delta });
    let newX = pos.x + offset;

    if (newX < 0) {
      newX = 0;
    }
    if (newX + pos.width > width) {
      newX = width - pos.width;
    }
    pos.x = newX;
    this.render();
  }

  getCurrentDirection() {
    const { left, right } = this.inputController.getState();

    if (left) {
      return -1;
    }
    if (right) {
      return 1;
    }
    return 0;
  }
}
