import { config } from '../../../config';
import { DeltaTime } from '../game-loop';

export interface BallMovementInterface {
  calculateMove: (options: MovementOptions) => MovementDetails;
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

  public correctX(c: number): void {
    this.rx *= c;
  }

  public correctY(c: number): void {
    this.ry *= c;
  }
}
