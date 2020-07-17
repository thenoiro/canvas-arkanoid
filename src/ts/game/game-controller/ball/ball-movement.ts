import { config } from '../../../config';
import { DeltaTime } from '../game-loop';
import { Direction } from '../paddle/paddle-movement';

export interface BallMovementInterface {
  calculateMove: (options: MovementOptions) => MovementDetails;
  reverseX: () => void;
  reverseY: () => void;
  correctX: (c: number) => void;
  correctY: (c: number) => void;
}

export interface MovementDetails {
  x: number;
  y: number;
}

interface MovementOptions {
  delta: DeltaTime;
}

export class BallMovement implements BallMovementInterface {
  private speed: number = config.game.ball.speed;

  private rx: number = 0.5;

  private ry: number = 0.5;

  public calculateMove(options: MovementOptions): MovementDetails {
    const { delta: d } = options;
    const { speed } = this;
    const deltaSpeed: number = (speed / 1000) * d;
    const sx = deltaSpeed * this.rx;
    const sy = deltaSpeed * this.ry;

    return {
      x: sx,
      y: sy,
    };
  }

  public reverseX(): void {
    this.rx *= -1;
  }

  public reverseY(): void {
    this.ry *= -1;
  }

  public correctX(c: number): void {
    const xDir: Direction = this.rx < 0 ? -1 : 1;
    const yDir: Direction = this.ry < 0 ? -1 : 1;
    const rx = (Math.abs(this.rx) + c) / 2;
    const ry = 1 - rx;
    this.rx = xDir === -1 ? 0 - rx : rx;
    this.ry = yDir === -1 ? 0 - ry : ry;
  }

  public correctY(c: number): void {
    const xDir: Direction = this.rx < 0 ? -1 : 1;
    const yDir: Direction = this.ry < 0 ? -1 : 1;
    const ry = (Math.abs(this.ry) + c) / 2;
    const rx = 1 - ry;
    this.rx = xDir === -1 ? 0 - rx : rx;
    this.ry = yDir === -1 ? 0 - ry : ry;
  }
}
