import { IArray2D, IArray2DConstructor } from "./Array2D/IArray2D";

export type FieldStateArray = number[][];

// const FILLED_STATE_PROBABILITY_COEFFICIENT = 0.9;
const POINT_LIVE_STATE = 1;
const POINT_DEAD_STATE = 0;

export default class FieldState {
  private Array2DClass: IArray2DConstructor;

  private previousStateArray: IArray2D;

  private newStateArray: IArray2D;

  private fieldWidth: number;

  private fieldHeight: number;

  constructor(
    initialState: FieldStateArray,
    Array2DClass: IArray2DConstructor
  ) {
    this.fieldWidth = initialState[0].length;
    this.fieldHeight = initialState.length;
    this.Array2DClass = Array2DClass;
    this.previousStateArray = new Array2DClass(
      initialState,
      this.fieldWidth,
      this.fieldHeight
    );
    const stateCopy = JSON.parse(JSON.stringify(initialState));
    this.newStateArray = new Array2DClass(
      stateCopy,
      this.fieldWidth,
      this.fieldHeight
    );
  }

  getPreviousPointStateByCoordinates(x: number, y: number) {
    let xCoordinate = x;
    let yCoordinate = y;

    if (x < 0) {
      xCoordinate = this.fieldWidth - 1;
    }

    if (x === this.fieldWidth) {
      xCoordinate = 0;
    }

    if (y < 0) {
      yCoordinate = this.fieldHeight - 1;
    }

    if (y === this.fieldHeight) {
      yCoordinate = 0;
    }

    const state = this.previousStateArray.getElement(xCoordinate, yCoordinate);

    return state || 0;
  }

  calculatePointNextState(x: number, y: number) {
    const currentState = this.getPreviousPointStateByCoordinates(x, y);
    const isAlive = currentState === POINT_LIVE_STATE;

    const liveNeighborsCount =
      this.getPreviousPointStateByCoordinates(x - 1, y - 1) +
      this.getPreviousPointStateByCoordinates(x - 1, y) +
      this.getPreviousPointStateByCoordinates(x - 1, y + 1) +
      this.getPreviousPointStateByCoordinates(x, y - 1) +
      this.getPreviousPointStateByCoordinates(x, y + 1) +
      this.getPreviousPointStateByCoordinates(x + 1, y - 1) +
      this.getPreviousPointStateByCoordinates(x + 1, y) +
      this.getPreviousPointStateByCoordinates(x + 1, y + 1);

    if (isAlive && (liveNeighborsCount === 2 || liveNeighborsCount === 3))
      return POINT_LIVE_STATE;

    if (!isAlive && liveNeighborsCount === 3) return POINT_LIVE_STATE;

    return POINT_DEAD_STATE;
  }

  calculateNextFieldState() {
    this.previousStateArray = new this.Array2DClass(
      this.newStateArray.getCopy(),
      this.fieldWidth,
      this.fieldHeight
    );

    for (let i = 0; i < this.fieldWidth; i++) {
      for (let j = 0; j < this.fieldHeight; j++) {
        const newValue = this.calculatePointNextState(i, j);

        this.newStateArray.setElement(i, j, newValue);
      }
    }
  }

  getState() {
    return this.newStateArray.toArray();
  }
}
