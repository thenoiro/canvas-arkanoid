export interface BallPositionDetails {
  readonly x: number;
  readonly y: number;
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
  readonly width: number;
  readonly height: number;
  readonly size: number;
}

export interface BallPositionInterface {
  moveX: (x: number) => void;
  moveY: (y: number) => void;
  getCurrentPosition: () => BallPositionDetails;
}

interface BallPositionOptions {
  size: number,
  x: number,
  y: number,
}

export class BallPosition implements BallPositionInterface {
  private x: number;

  private y: number;

  private x1: number;

  private y1: number;

  private x2: number;

  private y2: number;

  private width: number;

  private height: number;

  private size: number;

  constructor(options: BallPositionOptions) {
    const halfSize = options.size / 2;

    this.x = options.x;
    this.y = options.y;
    this.x1 = options.x - halfSize;
    this.y1 = options.y - halfSize;
    this.x2 = options.x + halfSize;
    this.y2 = options.y + halfSize;
    this.width = options.size;
    this.height = options.size;
    this.size = options.size;
  }

  public getCurrentPosition(): BallPositionDetails {
    return {
      x: this.x,
      y: this.y,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      width: this.width,
      height: this.height,
      size: this.size,
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
