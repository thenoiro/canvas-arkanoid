export interface PaddlePositionDetails {
  x: number;
  y: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

export interface PaddlePositionInterface {
  moveX: (x: number) => void;
  getCurrentPosition: () => PaddlePositionDetails;
}

interface PaddlePositionOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class PaddlePosition implements PaddlePositionInterface {
  private x: number;

  private y: number;

  private x1: number;

  private y1: number;

  private x2: number;

  private y2: number;

  private width: number;

  private height: number;

  constructor(options: PaddlePositionOptions) {
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

  public getCurrentPosition(): PaddlePositionDetails {
    return {
      x: this.x,
      y: this.y,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      width: this.width,
      height: this.height,
    };
  }

  public moveX(x: number): void {
    this.x += x;
    this.x1 += x;
    this.x2 += x;
  }
}
