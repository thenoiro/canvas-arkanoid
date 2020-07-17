import {
  GameObjectPosition,
  GameObjectPositionInterface,
  GameObjectPositionDetails,
} from '../game-object-position';

export interface PaddlePositionDetails extends GameObjectPositionDetails {}

export interface PaddlePositionInterface extends GameObjectPositionInterface {}

export class PaddlePosition extends GameObjectPosition implements PaddlePositionInterface {}
