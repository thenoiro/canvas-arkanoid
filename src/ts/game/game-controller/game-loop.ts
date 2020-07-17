import logger from '../../logger/logger';

export type DeltaTime = number;

export type LoopCallback = (deltaTime: DeltaTime) => void;

export interface GameLoopInterface {
  start: () => void;
  stop: () => void;
  listen: (cb: LoopCallback) => void;
  getState: () => boolean;
  destroy: () => void;
}

let instance: GameLoopInterface|null = null;

class GameLoopClass implements GameLoopInterface {
  private callbacks: LoopCallback[] = [];

  private id: number|null = null;

  private last: DeltaTime = 0;

  private started: boolean = false;

  public start(): void {
    const loop = (timestamp: DeltaTime = 0): void => {
      const legal: boolean = this.last !== 0 && timestamp !== 0;
      const delay: DeltaTime = timestamp - this.last;
      this.last = timestamp;
      this.id = requestAnimationFrame(loop);

      if (legal) {
        this.callbacks.forEach((cb): void => cb(delay));
      }
      logger.debug(`Loop works: ${delay}`);
    };
    this.stop();
    this.started = true;
    loop();
  }

  public stop(): void {
    if (typeof this.id === 'number') {
      cancelAnimationFrame(this.id);
    }
    this.id = null;
    this.last = 0;
    this.started = false;
  }

  public listen(cb: LoopCallback): void {
    this.callbacks.push(cb);
  }

  public getState(): boolean {
    return this.started;
  }

  public destroy(): void {
    this.callbacks = [];
    instance = null;
  }
}

export const GameLoop = (cb?: LoopCallback): GameLoopInterface => {
  if (!instance) {
    instance = new GameLoopClass();
  }
  if (cb) {
    instance.listen(cb);
  }
  return instance;
};
