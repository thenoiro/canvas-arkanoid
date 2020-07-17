import { config } from '../../config';
import { Paddle, PaddleInterface } from './paddle/paddle';
import { GameLoop, GameLoopInterface } from './game-loop';
import { Ball, BallInterface } from './ball/ball';
import { BallPositionDetails } from './ball/ball-position';
import { TouchDetails } from './touch-details';

interface GameControllerInterface {
  init: () => void;
  start: () => void;
  stop: () => void;
}

interface GameControllerOptions {
  container: HTMLElement;
}

export default class GameController implements GameControllerInterface {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private width: number;

  private height: number;

  private paddle: PaddleInterface;

  private ball: BallInterface;

  private loop: GameLoopInterface = GameLoop(() => this.update());

  constructor(options: GameControllerOptions) {
    const { container } = options;
    const { width, height } = config.game.canvas;
    const canvas = container.querySelector('.game-canvas');

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element not found');
    }
    const context = canvas.getContext('2d');

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Can't get canvas context.");
    }
    this.canvas = canvas;
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.paddle = new Paddle({ canvas });
    this.ball = new Ball({ canvas });
  }

  public init(): void {
    this.render();
    this.paddle.init();
    this.ball.init();
  }

  public start(): void {
    this.loop.start();
    this.canvas.focus();
  }

  public stop(): void {
    this.loop.stop();
  }

  private render(): void {
    this.canvas.setAttribute('width', String(this.width));
    this.canvas.setAttribute('height', String(this.height));
    this.clear();
  }

  private update(): void {
    this.clear();
    const ballPosition: BallPositionDetails = this.ball.getPosition();
    const outOfAreaX: boolean = ballPosition.x2 < 0 || ballPosition.x1 > this.width;
    const outOfAreaY: boolean = ballPosition.y2 < 0 || ballPosition.y1 > this.height;

    if (outOfAreaX || outOfAreaY) {
      this.gameOver();
      return;
    }
    const touchCanvasX: boolean = ballPosition.x2 > this.width || ballPosition.x1 < 0;
    const touchCanvasY: boolean = ballPosition.y1 < 0;
    const touch: TouchDetails = this.paddle.touch(this.ball);

    if (touchCanvasX || touch.left || touch.right) {
      this.ball.reverseX();
    }
    if (touchCanvasY || touch.top || touch.bottom) {
      this.ball.reverseY();
    }
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private gameOver(): void {
    this.loop.stop();
    this.clear();
    this.ctx.font = '48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game over', this.width / 2, this.height / 2);
  }

  public destroy(): void {
    this.stop();
    this.clear();
    this.paddle.destroy();
    this.ball.destroy();
    this.loop.destroy();
  }
}
