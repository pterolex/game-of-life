// import copyArrayOfCoordinates from "./utils/copyArray";

export type FieldStateArray = number[][];
/* eslint-disable no-plusplus */
type FieldStateConstructor = {
  initialState: FieldStateArray;
};

type Coordinate = number[];
type CoordinatesCacheArray = Coordinate[];

// const FILLED_STATE_PROBABILITY_COEFFICIENT = 0.9;
const POINT_LIVE_STATE = 1;
const POINT_DEAD_STATE = 0;

export default class FieldState {
  // private previousStateArray: FieldStateArray;
  private previousStateArray: Uint8Array;

  private newStateArray: Uint8Array;
  // private newStateArray: FieldStateArray;

  private fieldWidth: number;

  private fieldHeight: number;

  private previousLiveCoordinates: CoordinatesCacheArray;

  private newLiveCoordinates: CoordinatesCacheArray;

  constructor({ initialState }: FieldStateConstructor) {
    this.previousStateArray = new Uint8Array(initialState.flat());
    this.newStateArray = new Uint8Array(initialState.flat());
    // this.newStateArray = JSON.parse(JSON.stringify(initialState));
    // this.newStateArray = copyArrayOfCoordinates(initialState);

    this.fieldWidth = initialState[0].length;
    this.fieldHeight = initialState.length;
    this.previousLiveCoordinates = [];
    this.newLiveCoordinates = [];

    // this.preCalculateLivePoints();
  }

  private calculateIndexInArray(x: number, y: number) {
    return this.fieldWidth * y + x;
  }

  getValueInArray(array: Uint8Array, x: number, y: number) {
    return array.at(this.calculateIndexInArray(x, y));
  }

  setValueInArray(array: Uint8Array, x: number, y: number, value: number) {
    return array.set([value], this.calculateIndexInArray(x, y));
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

    // const state = this.previousStateArray[yCoordinate][xCoordinate];
    const state = this.getValueInArray(
      this.previousStateArray,
      xCoordinate,
      yCoordinate
    );

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

  // preCalculateLivePoints() {
  //   for (let i = 0; i < this.fieldWidth; i++) {
  //     for (let j = 0; j < this.fieldHeight; j++) {
  //       const currentState = this.getPreviousPointStateByCoordinates(i, j);
  //       const isAlive = currentState === POINT_LIVE_STATE;

  //       if (isAlive) {
  //         this.newLiveCoordinates.push([i, j]);
  //       }
  //     }

  //     console.log("preCalculateLivePoints", this.newLiveCoordinates);
  //   }
  // }

  calculateNextFieldState() {
    // this.previousStateArray = copyArrayOfCoordinates(this.newStateArray);
    this.previousStateArray = this.newStateArray.slice(0);
    // this.previousStateArray = JSON.parse(JSON.stringify(this.newStateArray));

    // this.previousLiveCoordinates = this.newLiveCoordinates;
    // this.newLiveCoordinates = [];

    // for (let i = 0; i <this.previousLiveCoordinates.length; i++) {
    //   const [x,y] = this.previousLiveCoordinates[i];
    //   this.newStateArray[x][y] = this.calculatePointNextState(x, y);

    //   if (this.newStateArray[x][y] === POINT_LIVE_STATE) {
    //     this.newLiveCoordinates.push([x, y]);
    //   }
    // }

    // const newValue = this.calculatePointNextState(0, 0);
    // this.setValueInArray(this.newStateArray, 0, 0, newValue);

    for (let i = 0; i < this.fieldWidth; i++) {
      for (let j = 0; j < this.fieldHeight; j++) {
        // this.newStateArray[j][i] = this.calculatePointNextState(i, j);

        const newValue = this.calculatePointNextState(i, j);
        this.setValueInArray(this.newStateArray, i, j, newValue);

        // if (this.newStateArray[j][i] === POINT_LIVE_STATE) {
        //   this.newLiveCoordinates.push([i, j]);
        // }
      }
    }
    // console.log("this.newLiveCoordinates", this.newLiveCoordinates);
  }

  getState() {
    const stateArray = [];
    // const array = Array.from(this.newStateArray);

    // while (array.length > 0) stateArray.push(array.splice(0, this.fieldWidth));

    for (let i = 0; i < this.fieldHeight; i++) {
      stateArray.push(
        this.newStateArray
          .subarray(i * this.fieldWidth, i * this.fieldWidth + this.fieldWidth)
          .entries()
      );
    }

    return stateArray;
  }
}
