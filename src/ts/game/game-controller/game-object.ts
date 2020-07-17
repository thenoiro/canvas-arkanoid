import {
  GameObjectPositionInterface,
  GameObjectPositionDetails,
  Coord,
} from './game-object-position';

import { TouchDetails, TouchDetailsObject } from './touch-details';

export interface GameObjectInterface {
  getPosition: () => GameObjectPositionDetails;
  touch: (o: GameObjectInterface) => TouchDetails;
  destroy: () => void;
}

interface GameObjectOptions {
  position: GameObjectPositionInterface;
}

const isCoordWithinX = (c: Coord, t: GameObjectPositionDetails): boolean => (
  c.x > t.x1 && c.x < t.x2
);
const isCoordWithinY = (c: Coord, t: GameObjectPositionDetails): boolean => (
  c.y > t.y1 && c.y < t.y2
);
const isWithinX = (o: GameObjectPositionDetails, t: GameObjectPositionDetails): boolean => (
  isCoordWithinX(o.c, t)
);
const isWithinY = (o: GameObjectPositionDetails, t: GameObjectPositionDetails): boolean => (
  isCoordWithinY(o.c, t)
);
const isInside = (c: Coord, t: GameObjectPositionDetails): boolean => (
  isCoordWithinX(c, t) && isCoordWithinY(c, t)
);
const calculateImpact = (a: number, a1: number, a2: number): number => {
  const width = a2 - a1;
  const halfWidth = width / 2;
  const pos = a - a1;
  const v = halfWidth / pos;
  return 1 - v;
};
const calculateTouch = (
  o: GameObjectPositionDetails,
  t: GameObjectPositionDetails,
): TouchDetails => {
  const result: TouchDetails = new TouchDetailsObject();
  const isTopInside = isInside(o.bottom, t);
  const isBottomInside = isInside(o.top, t);

  if (isTopInside || isBottomInside) {
    const horizontalImpact: number = calculateImpact(o.x, t.x1, t.x2);

    if (isTopInside) {
      result.top = horizontalImpact;
    } else {
      result.bottom = horizontalImpact;
    }
    result.touch = true;
  }
  const isLeftInside = isInside(o.right, t);
  const isRightInside = isInside(o.left, t);

  if (isLeftInside || isRightInside) {
    const verticalImpact: number = calculateImpact(o.y, t.y1, t.y2);

    if (isLeftInside) {
      result.left = verticalImpact;
    } else {
      result.right = verticalImpact;
    }
    result.touch = true;
  }
  return result;
};

export class GameObject implements GameObjectInterface {
  protected position: GameObjectPositionInterface;

  constructor(options: GameObjectOptions) {
    this.position = options.position;
  }

  public getPosition(): GameObjectPositionDetails {
    return this.position.getPosition();
  }

  public touch(o: GameObjectInterface): TouchDetails {
    const objectPosition: GameObjectPositionDetails = o.getPosition();
    const targetPosition: GameObjectPositionDetails = this.getPosition();
    const withinX = isWithinX(objectPosition, targetPosition);
    const withinY = isWithinY(objectPosition, targetPosition);

    if (!withinX && !withinY) {
      return new TouchDetailsObject();
    }
    const touchDetails = calculateTouch(objectPosition, targetPosition);

    if (Object.values(touchDetails).every((v) => !v)) {
      return new TouchDetailsObject();
    }
    return touchDetails;
  }

  public destroy(): void {
    delete this.position;
  }
}
