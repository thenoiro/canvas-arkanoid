import { config } from '../../../config';
import { PaddlePosition, PaddlePositionInterface } from './paddle-position';
import { GameLoop, DeltaTime } from '../game-loop';
import { InputController, InputControllerInterface, InputState } from '../input-controller';
import {
  PaddleMovement,
  PaddleMovementInterface,
  Direction,
  Movement,
} from './paddle-movement';

export interface PaddleInterface {
  init: () => void;
}

export interface PaddleOptions {
  canvas: HTMLCanvasElement;
}

export class Paddle implements PaddleInterface {
  private ctx: CanvasRenderingContext2D;

  private color: string;

  private position: PaddlePositionInterface;

  private input: InputControllerInterface;

  private movement: PaddleMovementInterface = new PaddleMovement();

  constructor(options: PaddleOptions) {
    const { canvas } = options;
    const context = canvas.getContext('2d');
    const { paddle: paddleConfig, canvas: canvasConfig } = config.game;

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Paddle: Can't get canvas context.");
    }
    this.ctx = context;
    this.color = paddleConfig.color;
    this.position = new PaddlePosition({
      container: {
        width: canvasConfig.width,
        height: canvasConfig.height,
      },
      paddle: {
        width: paddleConfig.width,
        height: paddleConfig.height,
        margin: paddleConfig.margin,
      },
    });
    this.input = new InputController({ element: canvas });
    GameLoop((dt: DeltaTime) => this.update(dt));
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const { ctx, position: pos, color } = this;
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
  }

  private update(dt: DeltaTime): void {
    this.move(dt);
  }

  private move(delta: DeltaTime): void {
    const { width } = config.game.canvas;
    const pos = this.position;
    const inputState: InputState = this.input.getState();
    const { left, right } = inputState;
    let direction: Direction = 0;

    if (left) {
      direction = -1;
    }
    if (right) {
      direction = 1;
    }
    const offset: Movement = this.movement.calculateMove({ direction, delta });
    let x = pos.x + offset;

    if (x < 0) {
      x = 0;
    }
    if (x + pos.width > width) {
      x = width - pos.width;
    }
    pos.x = x;
    this.render();
  }
}
