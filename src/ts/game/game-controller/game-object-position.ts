export interface Coord {
  x: number;
  y: number;
}

export interface GameObjectPositionDetails {
  readonly x: number;
  readonly y: number;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly width: number;
  readonly height: number;
  readonly c: Coord
  readonly c1: Coord;
  readonly c2: Coord;
  readonly c3: Coord;
  readonly c4: Coord;
  readonly top: Coord;
  readonly bottom: Coord;
  readonly left: Coord;
  readonly right: Coord;
}

export interface GameObjectPositionInterface {
  getPosition: () => GameObjectPositionDetails;
  moveX: (x: number) => void;
  moveY: (y: number) => void;
}

export interface GameObjectPositionOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class GameObjectPosition implements GameObjectPositionInterface {
  protected x: number;

  protected y: number;

  protected x1: number;

  protected y1: number;

  protected x2: number;

  protected y2: number;

  protected width: number;

  protected height: number;

  constructor(options: GameObjectPositionOptions) {
    const halfWidth = options.width / 2;
    const halfHeight = options.height / 2;

    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.x1 = options.x - halfWidth;
    this.x2 = options.x + halfWidth;
    this.y1 = options.y - halfHeight;
    this.y2 = options.y + halfHeight;
  }

  public getPosition(): GameObjectPositionDetails {
    return {
      x: this.x,
      y: this.y,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      width: this.width,
      height: this.height,
      c: {
        x: this.x,
        y: this.y,
      },
      c1: {
        x: this.x1,
        y: this.y1,
      },
      c2: {
        x: this.x2,
        y: this.y1,
      },
      c3: {
        x: this.x1,
        y: this.y2,
      },
      c4: {
        x: this.x2,
        y: this.y2,
      },
      top: {
        x: this.x,
        y: this.y1,
      },
      bottom: {
        x: this.x,
        y: this.y2,
      },
      left: {
        x: this.x1,
        y: this.y,
      },
      right: {
        x: this.x2,
        y: this.y,
      },
    };
  }

  public moveX(x: number): void {
    this.x += x;
    this.x1 += x;
    this.x2 += x;
  }

  public moveY(y: number): void {
    this.y += y;
    this.y1 += y;
    this.y2 += y;
  }
}
