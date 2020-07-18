export interface CanvasConfig {
  readonly width: number;
  readonly height: number;
}

export interface PaddleConfig {
  readonly speed: number;
  readonly acceleration: number;
  readonly width: number;
  readonly height: number;
  readonly color: string;
}

export interface BallConfig {
  readonly size: number;
  readonly color: string;
  readonly speed: number;
}

export enum BrickType {
  SIMPLE = 'simple',
  DOUBLE = 'double',
  TRIPPLE = 'tripple',
  ULTRA = 'ultra',
  MONUMENT = 'monument',
}

export interface BrickConfig {
  readonly color: string;
  readonly border: string;
  readonly power: number|null;
}

export type BricksConfigList = {
  readonly [key in BrickType]: BrickConfig;
};

export interface GameConfig {
  readonly canvas: CanvasConfig;
  readonly paddle: PaddleConfig;
  readonly ball: BallConfig;
  readonly bricks: BricksConfigList;
}

export interface Config {
  readonly debug: boolean;
  readonly game: GameConfig;
}

export const config: Config = {
  debug: false,
  game: {
    canvas: {
      width: 800,
      height: 600,
    },
    paddle: {
      speed: 350,
      acceleration: 0.025,
      width: 150,
      height: 20,
      color: '#306',
    },
    ball: {
      size: 5,
      speed: 300,
      color: 'red',
    },
    bricks: {
      simple: {
        color: 'silver',
        border: 'black',
        power: 1,
      },
      double: {
        color: 'green',
        border: 'black',
        power: 2,
      },
      tripple: {
        color: 'blue',
        border: 'black',
        power: 3,
      },
      ultra: {
        color: 'brown',
        border: 'black',
        power: 10,
      },
      monument: {
        color: 'yellow',
        border: 'black',
        power: null,
      },
    },
  },
};
