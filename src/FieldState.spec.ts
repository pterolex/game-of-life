import Array2D from "./Array2D/Array2D";
import FieldState from "./FieldState";

describe("Game of life: field state", () => {
  it("should return correct initial state after setting", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    const fieldState = new FieldState(initialState, Array2D);

    const internalState = fieldState.getState();

    expect(internalState).toMatchObject(initialState);
  });

  it("should return correct initial state for a point", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
    ];

    const fieldState = new FieldState(initialState, Array2D);

    const nextPoint1State = fieldState.calculatePointNextState(3, 3);

    expect(nextPoint1State).toBe(1);

    const nextPoint2State = fieldState.calculatePointNextState(0, 0);

    expect(nextPoint2State).toBe(0);
  });
});
