/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import ConsoleDisplayEngine from "./displayEngines/ConsoleDisplayEngine";
import DisplayEngine from "./displayEngines/DisplayEngineInterface";
import FieldState, { FieldStateArray } from "./FieldState";
// import sleep from "./utils/sleep";

export default class GameOfLife {
  private fieldState: FieldState;

  private displayEngine?: DisplayEngine;

  constructor(initialState: FieldStateArray, displayEngine?: DisplayEngine) {
    this.fieldState = new FieldState({
      initialState,
    });

    if (!displayEngine) {
      this.displayEngine = new ConsoleDisplayEngine();
    } else {
      this.displayEngine = displayEngine;
    }
  }

  getState(): FieldStateArray {
    return this.fieldState.getState();
  }

  evolve() {
    this.fieldState.calculateNextFieldState();
  }

  // async run() {
  //   this.displayEngine?.draw(this.fieldState.getState());

  //   const iterations = new Array(0).fill(0);

  //   for (const iteration of iterations) {
  //     console.clear();

  //     this.evolve();

  //     console.log(`Iteration: ${iteration}`);

  //     this.displayEngine?.draw(this.fieldState.getState());

  //     await sleep(100);
  //   }
  // }
}
