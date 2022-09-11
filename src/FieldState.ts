/* eslint-disable no-plusplus */
type FieldStateConstructor = {
  fieldWidth: number;
  fieldHeight: number;
};

export type FieldStateArray = number[][];

const FILLED_STATE_PROBABILITY_COEFFICIENT = 0.9;
const POINT_LIVE_STATE = 1;
const POINT_DEAD_STATE = 0;

export default class FieldState {
  private previousStateArray: FieldStateArray;

  private newStateArray: FieldStateArray;

  private fieldWidth: number;

  private fieldHeight: number;

  constructor({ fieldWidth, fieldHeight }: FieldStateConstructor) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.previousStateArray = [];
    this.newStateArray = [];

    for (let i = 0; i < fieldHeight; i++) {
      this.previousStateArray[i] = new Array(fieldWidth).fill(0);
      this.newStateArray[i] = new Array(fieldWidth).fill(0);
    }
  }

  getPointStateByCoordinates(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.fieldWidth || y >= this.fieldHeight)
      return POINT_DEAD_STATE;

    return this.previousStateArray[y][x];
  }

  initRandomState() {
    for (let i = 0; i < this.fieldHeight; i++) {
      for (let j = 0; j < this.fieldWidth; j++) {
        this.previousStateArray[i][j] =
          Math.random() > FILLED_STATE_PROBABILITY_COEFFICIENT
            ? POINT_LIVE_STATE
            : POINT_DEAD_STATE;
        this.newStateArray[i][j] = this.previousStateArray[i][j];
      }
    }
  }

  calculatePointNextState(x: number, y: number) {
    const liveNeighborsCount =
      this.getPointStateByCoordinates(x - 1, y - 1) +
      this.getPointStateByCoordinates(x - 1, y) +
      this.getPointStateByCoordinates(x - 1, y + 1) +
      this.getPointStateByCoordinates(x, y - 1) +
      this.getPointStateByCoordinates(x, y + 1) +
      this.getPointStateByCoordinates(x + 1, y - 1) +
      this.getPointStateByCoordinates(x + 1, y) +
      this.getPointStateByCoordinates(x + 1, y + 1);

    if (liveNeighborsCount === 2 || liveNeighborsCount === 3)
      return POINT_LIVE_STATE;

    return POINT_DEAD_STATE;
  }

  setPointState(x: number, y: number, value: number) {
    this.previousStateArray[x][y] = value;
    this.newStateArray[x][y] = value;
  }

  calculateNextFieldState() {
    this.previousStateArray = JSON.parse(JSON.stringify(this.newStateArray));

    for (let i = 0; i < this.fieldHeight; i++) {
      for (let j = 0; j < this.fieldWidth; j++) {
        this.newStateArray[i][j] = this.calculatePointNextState(i, j);
      }
    }
  }

  setState(state: FieldStateArray) {
    this.previousStateArray = JSON.parse(JSON.stringify(state));
    this.newStateArray = JSON.parse(JSON.stringify(state));
  }

  getState() {
    return this.newStateArray;
  }
}
