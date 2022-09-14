import { IArray2D } from "./IArray2D";

type FieldStateArray = number[][];

export default class Array2D implements IArray2D {
  private state: FieldStateArray;

  constructor(initialState: FieldStateArray) {
    this.state = initialState;
  }

  getElement(x: number, y: number): number {
    return this.state[y][x];
  }

  setElement(x: number, y: number, value: number): void {
    this.state[y][x] = value;
  }

  getCopy(): number[][] {
    return JSON.parse(JSON.stringify(this.state));
  }

  toArray(): number[][] {
    return this.state;
  }
}
