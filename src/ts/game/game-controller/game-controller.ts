import { config } from '../../config';
import { Paddle, PaddleInterface } from './paddle/paddle';
import { GameLoop, GameLoopInterface } from './game-loop';
import { Ball, BallInterface } from './ball/ball';
import { BallPositionDetails } from './ball/ball-position';

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

    if (ballPosition.x2 > this.width || ballPosition.x1 < 0) {
      this.ball.reverseX();
    }
    if (ballPosition.y1 < 0 || ballPosition.y2 > this.height) {
      this.ball.reverseY();
    }
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
