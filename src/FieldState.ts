export type FieldStateArray = number[][];
/* eslint-disable no-plusplus */
type FieldStateConstructor = {
  initialState: FieldStateArray;
};

const FILLED_STATE_PROBABILITY_COEFFICIENT = 0.9;
const POINT_LIVE_STATE = 1;
const POINT_DEAD_STATE = 0;

export default class FieldState {
  private previousStateArray: FieldStateArray;

  private newStateArray: FieldStateArray;

  private fieldWidth: number;

  private fieldHeight: number;

  constructor({ initialState }: FieldStateConstructor) {
    this.previousStateArray = JSON.parse(JSON.stringify(initialState));
    this.newStateArray = JSON.parse(JSON.stringify(initialState));

    this.fieldWidth = initialState[0].length;
    this.fieldHeight = initialState.length;
  }

  getPreviousPointStateByCoordinates(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.fieldWidth || y >= this.fieldHeight)
      return POINT_DEAD_STATE;

    const state = this.previousStateArray[y][x];

    return state || 0;
  }

  // initRandomState() {
  //   for (let i = 0; i < this.fieldHeight; i++) {
  //     for (let j = 0; j < this.fieldWidth; j++) {
  //       this.previousStateArray[i][j] =
  //         Math.random() > FILLED_STATE_PROBABILITY_COEFFICIENT
  //           ? POINT_LIVE_STATE
  //           : POINT_DEAD_STATE;
  //       this.newStateArray[i][j] = this.previousStateArray[i][j];
  //     }
  //   }
  // }

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

  // setPointState(x: number, y: number, value: number) {
  //   this.previousStateArray[x][y] = value;
  //   this.newStateArray[x][y] = value;
  // }

  calculateNextFieldState() {
    this.previousStateArray = JSON.parse(JSON.stringify(this.newStateArray));

    for (let i = 0; i < this.fieldWidth; i++) {
      for (let j = 0; j < this.fieldHeight; j++) {
        this.newStateArray[j][i] = this.calculatePointNextState(i, j);
      }
    }
  }

  setState(state: FieldStateArray) {
    this.previousStateArray = JSON.parse(JSON.stringify(state));
    this.newStateArray = JSON.parse(JSON.stringify(state));

    this.fieldWidth = state[0].length;
    this.fieldHeight = state.length;
  }

  getState() {
    return this.newStateArray;
  }
}
