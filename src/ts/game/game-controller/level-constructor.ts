import { config, BrickType } from '../../config';
import { Brick, BrickInterface } from './brick/brick';
import {
  levels,
  MapRow,
  LevelInterface,
  BrickElement,
} from './game-levels';

export interface LevelConstructorInterface {
  buildLevel: (n: number) => BrickInterface[];
}

interface LevelConstructorOptions {
  canvas: HTMLCanvasElement;
}

export class LevelConstructor implements LevelConstructorInterface {
  private levels: LevelInterface[] = levels;

  private width: number = config.game.canvas.width;

  // private height: number = config.game.canvas.height;

  private h: number = 25;

  private margin: number = 40;

  // private ctx: CanvasRenderingContext2D;

  private canvas: HTMLCanvasElement;

  constructor(options: LevelConstructorOptions) {
    this.canvas = options.canvas;
  }

  public buildLevel(n: number): BrickInterface[] {
    const bricks: BrickInterface[] = [];
    const l: LevelInterface = this.levels[n];

    l.map.forEach((row: MapRow, rowIndex: number) => {
      const w: number = this.width / row.reduce((a, r) => a + r.long, 0);
      let left: number = 0;

      row.forEach((b: BrickElement) => {
        const brickWidth: number = b.long * w;
        const isBrickSymbol = (s: any): s is BrickType => s !== null;

        if (isBrickSymbol(b.type)) {
          const brick: BrickInterface = new Brick({
            x: (left * w) + (brickWidth / 2),
            y: (rowIndex * this.h) + this.margin,
            width: brickWidth,
            height: this.h,
            canvas: this.canvas,
            type: b.type,
          });
          bricks.push(brick);
        }
        left += b.long;
      });
    });
    return bricks;
  }
}
