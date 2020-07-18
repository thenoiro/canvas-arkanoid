import { config, BrickConfig, BrickType } from '../../../config';
import { GameObjectInterface, GameObject } from '../game-object';
import { BrickPosition, BrickPositionDetails } from './brick-position';
import { TouchDetails, TouchDetailsObject } from '../touch-details';

export interface BrickInterface extends GameObjectInterface {
  init: () => void;
  update: () => void;
}
interface BrickOptions {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
  type: BrickType;
}

export class Brick extends GameObject implements BrickInterface {
  private ctx: CanvasRenderingContext2D;

  private color: string;

  private type: BrickType;

  private border: string;

  private power: number|null;

  static getBrickOptions(type: BrickType): BrickConfig {
    const bricksList = config.game.bricks;
    return bricksList[type];
  }

  constructor(options: BrickOptions) {
    super({
      position: new BrickPosition({
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
      }),
    });
    const context = options.canvas.getContext('2d');

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Brick: Can't get canvas 2d context.");
    }
    this.ctx = context;

    const brickOptions: BrickConfig = Brick.getBrickOptions(options.type);
    this.color = brickOptions.color;
    this.type = options.type;
    this.power = brickOptions.power;
    this.border = brickOptions.border;
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const isNum = (n: any): n is number => Number.isFinite(n);
    const lineWidth: number = isNum(this.power) ? this.power : 0;

    if (this.power === 0) {
      return;
    }
    const pos: BrickPositionDetails = this.getPosition();
    this.ctx.fillStyle = this.border;
    this.ctx.fillRect(pos.x1, pos.y1, pos.width, pos.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      pos.x1 + lineWidth,
      pos.y1 + lineWidth,
      pos.width - lineWidth * 2,
      pos.height - lineWidth * 2,
    );
  }

  private hit() {
    const isNum = (c: any): c is number => Number.isFinite(c);

    if (isNum(this.power)) {
      this.power -= 1;

      if (this.power < 0) {
        this.power = 0;
      }
    }
  }

  public update(): void {
    this.render();
  }

  public touch(o: GameObjectInterface): TouchDetails {
    if (this.power === 0) {
      return new TouchDetailsObject();
    }
    const touchDetails: TouchDetails = super.touch(o);

    if (touchDetails.touch) {
      this.hit();
    }
    return touchDetails;
  }
}
