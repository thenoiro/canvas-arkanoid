import { log } from "../../logger/logger";

export default class InputController {
  /**
   * @param {object} options
   * @param {Element} options.element
   */
  constructor(options) {
    this.element = options.element;
    this.left = false;
    this.right = false;
    this.active = false;
    this.bindEvents();
  }

  bindEvents() {
    const { element } = this;
    const listen = (event, handler) => element.addEventListener(event, handler);

    listen('keydown', (e) => this.handleKey(e.keyCode, true));
    listen('keyup', (e) => this.handleKey(e.keyCode, false));
    listen('focus', () => this.active = true);
    listen('blur', () => this.active = false);
  }

  getKey(key) {
    switch (key) {
      case 37: return 'left';
      case 39: return 'right';
      default: return null;
    }
  }

  handleKey(key, state) {
    switch (this.getKey(key)) {
      case 'left':
        this.left = state;
        break;
      case 'right':
        this.right = state;
        break;
      default:
        break;
    }
  }

  getState() {
    const { left, right, active } = this;

    return {
      left: left && !right && active,
      right: right && !left && active,
    };
  }
}
