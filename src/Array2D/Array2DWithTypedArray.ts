/* eslint-disable no-plusplus */
import { IArray2D } from "./IArray2D";

type FieldStateArray = number[][];

export default class Array2DWithTypedArray implements IArray2D {
  private state: Uint8Array;

  private fieldWidth: number;

  private fieldHeight: number;

  constructor(
    initialState: FieldStateArray,
    fieldWidth: number,
    fieldHeight: number
  ) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.state = new Uint8Array(initialState.flat());
  }

  private calculateIndexInArray(x: number, y: number): number {
    return this.fieldWidth * y + x;
  }

  getElement(x: number, y: number): number | undefined {
    return this.state.at(this.calculateIndexInArray(x, y));
  }

  setElement(x: number, y: number, value: number): void {
    return this.state.set([value], this.calculateIndexInArray(x, y));
  }

  getCopy(): number[][] {
    return this.toArray();
  }

  toArray(): number[][] {
    const stateArray = [];

    for (let i = 0; i < this.fieldHeight; i++) {
      stateArray.push(
        Array.from(
          this.state.subarray(
            i * this.fieldWidth,
            i * this.fieldWidth + this.fieldWidth
          )
        )
      );
    }
    return stateArray;
  }
}
