export interface PaddlePositionInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
}

export interface PaddlePositionMargin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface PaddlePositionOptionsMargin {
  readonly top?: number;
  readonly bottom?: number;
  readonly left?: number;
  readonly right?: number;
}

export interface PaddleSize {
  readonly width: number;
  readonly height: number;
  readonly margin: PaddlePositionOptionsMargin;
}

export interface ContainerSize {
  readonly width: number;
  readonly height: number;
}

export interface PaddlePositionOptions {
  readonly paddle: PaddleSize;
  readonly container: ContainerSize;
}

export class PaddlePosition implements PaddlePositionInterface {
  public width: number;

  public height: number;

  public halfWidth: number;

  public halfHeight: number;

  public x: number;

  public y: number;

  public margin: PaddlePositionMargin;

  constructor(options: PaddlePositionOptions) {
    const { paddle, container } = options;

    this.width = paddle.width;
    this.height = paddle.height;
    this.halfWidth = paddle.width / 2;
    this.halfHeight = paddle.height / 2;
    this.margin = {
      top: paddle.margin.top || 0,
      bottom: paddle.margin.bottom || 0,
      left: paddle.margin.left || 0,
      right: paddle.margin.right || 0,
    };
    this.x = (container.width / 2) - this.halfWidth + this.margin.left - this.margin.right;
    this.y = container.height - this.height + this.margin.top - this.margin.bottom;
  }
}
