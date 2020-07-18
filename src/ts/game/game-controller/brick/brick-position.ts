import {
  GameObjectPosition,
  GameObjectPositionInterface,
  GameObjectPositionDetails,
} from '../game-object-position';

export interface BrickPositionDetails extends GameObjectPositionDetails {}

export interface BrickPositionInterface extends GameObjectPositionInterface {}

export class BrickPosition extends GameObjectPosition implements BrickPositionInterface {}
