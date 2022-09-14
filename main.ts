// import ConsoleDisplayEngine from "./src/displayEngines/ConsoleDisplayEngine";
import GameOfLife from "./src/GameOfLife";

const initialState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0],
];

const game = new GameOfLife(initialState);

game.evolve();
