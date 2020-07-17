import {
  GameObjectPosition,
  GameObjectPositionInterface,
  GameObjectPositionDetails,
} from '../game-object-position';

export interface BallPositionDetails extends GameObjectPositionDetails {
  readonly size: number;
}

export interface BallPositionInterface extends GameObjectPositionInterface {}

interface BallPositionOptions {
  size: number,
  x: number,
  y: number,
}

export class BallPosition extends GameObjectPosition implements BallPositionInterface {
  private size: number;

  constructor(options: BallPositionOptions) {
    super({
      x: options.x,
      y: options.y,
      width: options.size,
      height: options.size,
    });
    this.size = options.size;
  }

  public getPosition(): BallPositionDetails {
    const pos: GameObjectPositionDetails = super.getPosition();
    const res: BallPositionDetails = {
      size: this.size,
      ...pos,
    };
    return res;
  }
}
