export interface IArray2DConstructor {
  new (
    initialState: number[][],
    fieldWidth: number,
    fieldHeight: number
  ): IArray2D;
}

export interface IArray2D {
  getElement(x: number, y: number): number | undefined;
  setElement(x: number, y: number, value: number): void;
  getCopy(): number[][];
  toArray(): number[][];
}
