import { GameObjectPositionInterface, GameObjectPositionDetails } from './game-object-position';

export interface GameObjectInterface {
  getPosition: () => GameObjectPositionDetails;
}

interface GameObjectOptions {
  position: GameObjectPositionInterface;
}

export class GameObject implements GameObjectInterface {
  protected position: GameObjectPositionInterface;

  constructor(options: GameObjectOptions) {
    this.position = options.position;
  }

  public getPosition(): GameObjectPositionDetails {
    return this.position.getPosition();
  }
}
