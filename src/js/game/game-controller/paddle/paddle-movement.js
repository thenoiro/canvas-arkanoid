import config from '../../../config';
import { log } from '../../../logger/logger';

export default class PaddleMovement {
  constructor() {
    const { speed, acceleration } = config.game;

    this.speed = speed;
    this.acceleration = acceleration;
    this.s = 0;
  }

  /**
   * @param {object} options
   * @param {number} options.delta
   * @param {number} options.direction
   */
  calculateMove(options) {
    const { direction, delta } = options;
    const { speed, acceleration } = this;
    let deltaSpeed = speed / 1000 * delta;
    let deltaAcceleration = deltaSpeed / (acceleration * 1000);

    if (deltaAcceleration === Infinity) {
      deltaAcceleration = deltaSpeed;
    }
    let leftSpeed = deltaSpeed - (deltaSpeed - deltaAcceleration);

    if (!direction) {
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
      this.s += leftSpeed * direction;

      if (this.s < 0 - deltaSpeed) {
        this.s = 0 - deltaSpeed;
      }
      if (this.s > deltaSpeed) {
        this.s = deltaSpeed;
      }
    }
    return this.s;
  }

  clear() {

  }
}
