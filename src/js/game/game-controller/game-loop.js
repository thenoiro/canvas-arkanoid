class GameLoop {
  /**
   * @param {loopCallback} callback
   */
  constructor() {
    this.callbacks = [];
    this.id = null;
    this.last = 0;
    this.started = false;
  }

  start() {
    const loop = (timestamp = 0) => {
      const legal = this.last !== 0 && timestamp !== 0;
      const delay = timestamp - this.last;
      this.last = timestamp;
      this.id = requestAnimationFrame(loop);

      if (legal) {
        this.runCallback(delay);
      }
    };
    this.stop();
    this.started = true;
    loop();
  }

  listen(cb) {
    if (typeof cb === 'function') {
      this.callbacks.push(cb);
    }
  }

  runCallback(delay) {
    this.callbacks.forEach((cb) => cb(delay));
  }

  stop() {
    cancelAnimationFrame(this.id);
    this.id = null;
    this.last = 0;
    this.started = false;
  }
}
let instance = null;

export default function(callback) {
  if (!instance) {
    instance = new GameLoop();
  }
  instance.listen(callback);
  return instance;
}

/**
 * @callback loopCallback
 * @param {number} delay
 */