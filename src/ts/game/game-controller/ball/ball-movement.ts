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
    const full: number = c + this.rx;
    const newRx = (full + this.rx) / 2;
    const newRy = 1 - Math.abs(newRx);
    this.rx = newRx;
    this.ry = this.ry > 0 ? newRy : 0 - newRy;
  }

  public correctY(c: number): void {
    const full: number = c + this.ry;
    const newRy = (full + this.ry) / 2;
    const newRx = 1 - Math.abs(newRy);
    this.ry = newRy;
    this.rx = this.rx > 0 ? newRx : 0 - newRx;
  }
}
