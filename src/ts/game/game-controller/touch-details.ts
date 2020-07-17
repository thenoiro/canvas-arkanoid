export type TouchValue = number|null;

export interface TouchDetails {
  top: TouchValue;
  bottom: TouchValue;
  left: TouchValue;
  right: TouchValue;
  touch: boolean;
}

export class TouchDetailsObject implements TouchDetails {
  public left: TouchValue = null;

  public right: TouchValue = null;

  public top: TouchValue = null;

  public bottom: TouchValue = null;

  public touch: boolean = false;
}
