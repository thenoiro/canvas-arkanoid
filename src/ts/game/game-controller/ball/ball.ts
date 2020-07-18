import { config } from '../../../config';
import { BallPosition, BallPositionDetails } from './ball-position';
import { GameLoop, DeltaTime } from '../game-loop';
import { BallMovementInterface, BallMovement, MovementDetails } from './ball-movement';
import { GameObject, GameObjectInterface } from '../game-object';
import { GameObjectPositionDetails } from '../game-object-position';

export interface BallInterface extends GameObjectInterface {
  init: () => void;
  getPosition: () => BallPositionDetails;
  reverseX: () => void;
  reverseY: () => void;
  correctX: (c: number) => void;
  correctY: (c: number) => void;
}

interface BallOptions {
  canvas: HTMLCanvasElement;
}

export class Ball extends GameObject implements BallInterface {
  private ctx: CanvasRenderingContext2D;

  private color: string = config.game.ball.color;

  private movement: BallMovementInterface = new BallMovement();

  constructor(options: BallOptions) {
    super({
      position: new BallPosition({
        size: config.game.ball.size,
        x: config.game.canvas.width / 2,
        y: 200,
      }),
    });
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
    const offset: MovementDetails = this.movement.calculateMove({ delta });
    this.position.moveX(offset.x);
    this.position.moveY(offset.y);
    this.render();
  }

  public getPosition(): BallPositionDetails {
    const pos: GameObjectPositionDetails = super.getPosition();
    const res: BallPositionDetails = {
      size: pos.width,
      ...pos,
    };
    return res;
  }

  public reverseX(): void {
    this.movement.reverseX();
  }

  public reverseY(): void {
    this.movement.reverseY();
  }

  public correctX(c: number): void {
    this.movement.correctX(c);
  }

  public correctY(c: number): void {
    this.movement.correctY(c);
  }
}
