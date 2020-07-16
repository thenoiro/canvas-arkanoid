import { config } from '../../../config';
import { BallPosition, BallPositionInterface, BallPositionDetails } from './ball-position';

export interface BallInterface {
  init: () => void;
}

interface BallOptions {
  canvas: HTMLCanvasElement;
}

export class Ball implements BallInterface {
  private ctx: CanvasRenderingContext2D;

  private color: string = config.game.ball.color;

  private position: BallPositionInterface = new BallPosition({
    size: config.game.ball.size,
    x: config.game.canvas.width / 2,
    y: 50,
  });

  constructor(options: BallOptions) {
    const context = options.canvas.getContext('2d');

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Ball: Can't get canvas 2d context.");
    }
    this.ctx = context;
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const pos: BallPositionDetails = this.position.getCurrentPosition();

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
