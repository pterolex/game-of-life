import { IArray2D } from "./IArray2D";

type FieldStateArray = number[][];

export default class Array2DHashTable implements IArray2D {
  private hashState: Record<string, number>;

  private fieldWidth: number;

  private fieldHeight: number;

  constructor(
    initialState: FieldStateArray,
    fieldWidth: number,
    fieldHeight: number
  ) {
    this.hashState = {};
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    if (!initialState) return;

    for (let i = 0; i < this.fieldWidth; i++) {
      for (let j = 0; j < this.fieldHeight; j++) {
        this.setElement(i, j, initialState[j][i]);
      }
    }
  }

  private getIndex(x: number, y: number): string {
    return `${x}_${y}`;
  }

  private getCoordinatesFromIndex(index: string): number[] {
    const [x, y] = index.split("_");

    return [Number(x), Number(y)];
  }

  getElement(x: number, y: number): number {
    return this.hashState[this.getIndex(x, y)] ?? 0;
  }

  setElement(x: number, y: number, value: number): void {
    if (value === 0) return;

    this.hashState[this.getIndex(x, y)] = 1;
  }

  getCopy(): number[][] {
    return this.toArray();
  }

  toArray(): number[][] {
    const arrayState: FieldStateArray = [];

    for (let i = 0; i < this.fieldHeight; i++) {
      arrayState.push(new Array(this.fieldWidth).fill(0));
    }

    Object.keys(this.hashState).forEach((key) => {
      const [x, y] = this.getCoordinatesFromIndex(key);

      arrayState[y][x] = 1;
    });

    return arrayState;
  }
}
