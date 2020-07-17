import { config } from '../../../config';
import { PaddlePosition, PaddlePositionDetails } from './paddle-position';
import { GameObject, GameObjectInterface } from '../game-object';
import { GameLoop, DeltaTime } from '../game-loop';
import { InputController, InputControllerInterface, InputState } from '../input-controller';
import {
  PaddleMovement,
  PaddleMovementInterface,
  Direction,
  Movement,
} from './paddle-movement';

export interface PaddleInterface extends GameObjectInterface {
  init: () => void;
}

export interface PaddleOptions {
  canvas: HTMLCanvasElement;
}

export class Paddle extends GameObject implements PaddleInterface {
  private ctx: CanvasRenderingContext2D;

  private color: string;

  private input: InputControllerInterface;

  private movement: PaddleMovementInterface = new PaddleMovement();

  constructor(options: PaddleOptions) {
    super({
      position: new PaddlePosition({
        x: config.game.canvas.width / 2,
        y: config.game.canvas.height - 30,
        width: config.game.paddle.width,
        height: config.game.paddle.height,
      }),
    });
    const { canvas } = options;
    const context = canvas.getContext('2d');
    const { paddle: paddleConfig } = config.game;

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error("Paddle: Can't get canvas context.");
    }
    this.ctx = context;
    this.color = paddleConfig.color;
    this.input = new InputController({ element: canvas });
    GameLoop((dt: DeltaTime) => this.update(dt));
  }

  public init(): void {
    this.render();
  }

  private render(): void {
    const { ctx, color } = this;
    const pos: PaddlePositionDetails = this.getPosition();
    ctx.fillStyle = color;
    ctx.fillRect(pos.x1, pos.y1, pos.width, pos.height);
  }

  private update(dt: DeltaTime): void {
    this.move(dt);
  }

  private move(delta: DeltaTime): void {
    const { width } = config.game.canvas;
    const pos: PaddlePositionDetails = this.getPosition();
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
    let x = pos.x1 + offset;

    if (x < 0) {
      x = 0;
      this.movement.stop();
    }
    if (x + pos.width > width) {
      x = width - pos.width;
      this.movement.stop();
    }
    this.position.moveX(x - pos.x1);
    this.render();
  }
}
