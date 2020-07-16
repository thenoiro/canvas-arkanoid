export interface InputState {
  readonly left: boolean;
  readonly right: boolean;
}

export interface InputControllerInterface {
  getState: () => InputState;
}

interface InputControllerOptions {
  element: HTMLElement;
}

export class InputController implements InputControllerInterface {
  private element: HTMLElement;

  private left: boolean = false;

  private right: boolean = false;

  private active: boolean = false;

  constructor(options: InputControllerOptions) {
    this.element = options.element;
    this.bindEvents();
  }

  private bindEvents(): void {
    const { element } = this;

    element.addEventListener('keydown', (e) => this.handleKey(e.keyCode, true));
    element.addEventListener('keyup', (e) => this.handleKey(e.keyCode, false));
    element.addEventListener('focus', () => {
      this.active = true;
    });
    element.addEventListener('blur', () => {
      this.active = false;
    });
  }

  private handleKey(code: number, state: boolean = false): void {
    switch (code) {
      case 37: // left
        this.left = state;
        break;
      case 39: // right
        this.right = state;
        break;
      default:
        break;
    }
  }

  public getState(): InputState {
    const { left, right, active } = this;

    return {
      left: left && !right && active,
      right: right && !left && active,
    };
  }
}
