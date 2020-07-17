import { config } from '../../../config';
import { BallPosition, BallPositionInterface, BallPositionDetails } from './ball-position';
import { GameLoop, DeltaTime } from '../game-loop';
import { BallMovementInterface, BallMovement, MovementDetails } from './ball-movement';

export interface BallInterface {
  init: () => void;
  getPosition: () => BallPositionDetails;
  reverseX: () => void;
  reverseY: () => void;
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

  private movement: BallMovementInterface = new BallMovement();

  constructor(options: BallOptions) {
    const context = options.canvas.getContext('2d');

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Ball: Can't get canvas 2d context.");
    }
    this.ctx = context;
    GameLoop((dt: DeltaTime) => this.update(dt));
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const pos: BallPositionDetails = this.getPosition();

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private update(dt: DeltaTime): void {
    this.move(dt);
  }

  private move(delta: DeltaTime): void {
    // const pos: BallPositionDetails = this.getPosition();
    const offset: MovementDetails = this.movement.calculateMove({ delta });
    this.position.moveX(offset.x);
    this.position.moveY(offset.y);
    this.render();
  }

  public getPosition(): BallPositionDetails {
    return this.position.getCurrentPosition();
  }

  public reverseX(): void {
    this.movement.correctX(-1);
  }

  public reverseY(): void {
    this.movement.correctY(-1);
  }
}
