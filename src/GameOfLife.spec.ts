import GameOfLife from "./GameOfLife";

describe("Game of life", () => {
  it("should return correct state after a tick", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const game = new GameOfLife(initialState);

    game.evolve();

    const nextState = game.getState();

    expect(nextState).toMatchObject([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it("should return correct state with oscillator", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const game = new GameOfLife(initialState);

    game.evolve();

    const nextState = game.getState();

    console.log("nextState2", nextState);

    expect(nextState).toMatchObject([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  test("Positive. Beacon.", () => {
    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const game = new GameOfLife(initialState);

    game.evolve();

    console.info("beacon", game.getState());

    const expectState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    expect(game.getState()).toEqual(expectState);
  });

  test("Positive. Toad.", () => {
    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const game = new GameOfLife(initialState);

    game.evolve();

    const expectState = [
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    expect(game.getState()).toEqual(expectState);
  });
});
