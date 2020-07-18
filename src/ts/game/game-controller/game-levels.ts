import { BrickType } from '../../config';

// export enum BrickSymbol {
//   simple,
//   double,
//   tripple,
//   ultra,
//   monument,
//   empty,
// }

export interface BrickElement {
  type: BrickType|null;
  long: number;
}

export type MapRow = BrickElement[];

export interface LevelInterface {
  id: string;
  name: string;
  map: MapRow[];
}

const e = (n: number): BrickElement => ({
  type: null,
  long: n,
});
const s = (n: number): BrickElement => ({
  type: BrickType.SIMPLE,
  long: n,
});
const d = (n: number): BrickElement => ({
  type: BrickType.DOUBLE,
  long: n,
});
const t = (n: number): BrickElement => ({
  type: BrickType.TRIPPLE,
  long: n,
});
const u = (n: number): BrickElement => ({
  type: BrickType.ULTRA,
  long: n,
});
const m = (n: number): BrickElement => ({
  type: BrickType.MONUMENT,
  long: n,
});
const r = (n: number): BrickElement => {
  const types: BrickType[] = [
    BrickType.SIMPLE,
    BrickType.DOUBLE,
    BrickType.TRIPPLE,
    BrickType.ULTRA,
    BrickType.MONUMENT,
  ];
  const typeIndex: number = Math.round(Math.random() * types.length);
  const brickType: BrickType = types[typeIndex];

  return {
    type: brickType || null,
    long: n,
  };
};

export const levels: LevelInterface[] = [
  {
    id: 'level-1',
    name: 'Level 1',
    map: [
      [s(4), s(4), s(4), s(4), s(4), s(4)],
      [s(2), s(4), s(4), s(4), s(4), s(4), s(2)],
      [s(4), s(4), s(4), s(4), s(4), s(4)],
      [s(2), s(4), s(4), s(4), s(4), s(4), s(2)],
      [s(4), s(4), s(4), s(4), s(4), s(4)],
      [e(2), s(4), s(4), s(4), s(4), s(4), e(2)],
    ],
  },
  {
    id: 'level-2',
    name: 'Level 2',
    map: [
      [r(4), r(4), r(4), r(4), r(4), r(4)],
      [u(2), u(4), t(4), t(4), t(4), u(4), u(2)],
      [m(4), t(4), d(4), d(4), t(4), m(4)],
      [m(2), t(4), d(4), s(4), d(4), t(4), m(2)],
      [t(4), d(4), s(4), s(4), d(4), t(4)],
      [e(2), t(4), d(4), s(4), d(4), t(4), e(2)],
    ],
  },
];
