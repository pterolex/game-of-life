import FieldState, { FieldStateArray } from "./FieldState";
// import Array2D from "./Array2D/Array2D";
import Array2DWithTypedArray from "./Array2D/Array2DWithTypedArray";

export default class GameOfLife {
  private fieldState: FieldState;

  constructor(initialState: FieldStateArray) {
    this.fieldState = new FieldState(initialState, Array2DWithTypedArray);
  }

  getState(): FieldStateArray {
    return this.fieldState.getState();
  }

  evolve() {
    this.fieldState.calculateNextFieldState();
  }
}
