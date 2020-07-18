import { config } from '../../config';
import { Paddle, PaddleInterface } from './paddle/paddle';
import { GameLoop, GameLoopInterface } from './game-loop';
import { Ball, BallInterface } from './ball/ball';
import { BallPositionDetails } from './ball/ball-position';
import { TouchDetails } from './touch-details';
import logger from '../../logger/logger';
import { LevelConstructor, LevelConstructorInterface } from './level-constructor';
import { BrickInterface } from './brick/brick';

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

  private l: number = 1;

  private level: LevelConstructorInterface;

  private bricks: BrickInterface[] = [];

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
    this.level = new LevelConstructor({ canvas });
    this.paddle = new Paddle({ canvas });
    this.ball = new Ball({ canvas });
  }

  public init(): void {
    this.render();
    this.bricks = this.level.buildLevel(this.l);
    this.bricks.forEach((b: BrickInterface) => b.init());
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
    this.bricks.forEach((o: BrickInterface) => o.update());
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
    const touchObjectX: any = touch.left || touch.right;
    const touchObjectY: any = touch.top || touch.bottom;
    const isNum = (c: any): c is number => Number.isFinite(c);

    if (touch.touch) {
      logger.debug(touch);
    }
    if (touchCanvasX) {
      this.ball.reverseX();
    }
    if (touchCanvasY) {
      this.ball.reverseY();
    }
    if (touchObjectX && isNum(touchObjectX)) {
      const fromLeft: boolean = Boolean(touch.left && ballPosition.dx === 1);
      const fromRight: boolean = Boolean(touch.right && ballPosition.dx === -1);

      if (fromLeft || fromRight) {
        this.ball.correctY(touchObjectX);
        this.ball.reverseX();
      }
    }
    if (touchObjectY && isNum(touchObjectY)) {
      const fromTop: boolean = Boolean(touch.top && ballPosition.dy === 1);
      const fromBottom: boolean = Boolean(touch.bottom && ballPosition.dy === -1);

      if (fromTop || fromBottom) {
        this.ball.correctX(touchObjectY);
        this.ball.reverseY();
      }
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
