import { config } from '../../../config';
import { DeltaTime } from '../game-loop';

export type Direction = -1|0|1;

export type Movement = number;

interface MovementOptions {
  delta: DeltaTime;
  direction: Direction;
}

export interface PaddleMovementInterface {
  calculateMove: (options: MovementOptions) => Movement;
  stop: () => void;
}

export class PaddleMovement implements PaddleMovementInterface {
  private speed: number = config.game.paddle.speed;

  private acceleration: number = config.game.paddle.acceleration;

  private s: number = 0;

  public calculateMove(options: MovementOptions): Movement {
    const { direction: dir, delta: d } = options;
    const { speed, acceleration } = this;
    const deltaSpeed: number = (speed / 1000) * d;
    let deltaAcceleration: number = deltaSpeed / (acceleration * 1000);

    if (deltaAcceleration === Infinity) {
      deltaAcceleration = deltaSpeed;
    }
    let leftSpeed: number = deltaSpeed - (deltaSpeed - deltaAcceleration);

    if (!dir) {
      leftSpeed /= 2;

      if (this.s > 0) {
        this.s -= leftSpeed;

        if (this.s < 0) {
          this.s = 0;
        }
      } else if (this.s < 0) {
        this.s += leftSpeed;

        if (this.s > 0) {
          this.s = 0;
        }
      }
    } else {
      this.s += leftSpeed * dir;

      if (this.s < 0 - deltaSpeed) {
        this.s = 0 - deltaSpeed;
      }
      if (this.s > deltaSpeed) {
        this.s = deltaSpeed;
      }
    }
    return this.s;
  }

  public stop(): void {
    this.s = 0;
  }
}
