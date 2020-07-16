export interface CanvasConfig {
  readonly width: number;
  readonly height: number;
}

export interface PaddleConfig {
  readonly width: number;
  readonly height: number;
  readonly color: string;
}

export interface BallConfig {
  readonly size: number;
  readonly color: string;
  readonly speed: number;
}

export interface GameConfig {
  readonly speed: number;
  readonly acceleration: number;
  readonly canvas: CanvasConfig;
  readonly paddle: PaddleConfig;
  readonly ball: BallConfig;
}

export interface Config {
  readonly debug: boolean;
  readonly game: GameConfig;
}

export const config: Config = {
  debug: false,
  game: {
    speed: 350,
    acceleration: 0.025,
    canvas: {
      width: 800,
      height: 600,
    },
    paddle: {
      width: 150,
      height: 20,
      color: '#306',
    },
    ball: {
      size: 5,
      speed: 10,
      color: 'red',
    },
  },
};
