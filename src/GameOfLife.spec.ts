import GameOfLife from "./GameOfLife";

describe("Game of life", () => {
  it("should return correct state after a few ticks", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    const game = new GameOfLife(initialState);

    game.tick();

    const nextState = game.getState();

    console.log("nextState1", nextState);

    expect(nextState).toMatchObject([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it.only("should return correct state after a tick", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const game = new GameOfLife(initialState);

    game.tick();

    const nextState = game.getState();

    console.log("nextState2", nextState);

    expect(nextState).toMatchObject([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
