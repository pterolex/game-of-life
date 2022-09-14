import Array2DHashTable from "./Array2DHashTable";

describe("Array2D Hashtable", () => {
  it("should return correct internal state", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    const fieldWidth = initialState[0].length;
    const fieldHeight = initialState.length;

    const array2DHashTable = new Array2DHashTable(
      initialState,
      fieldWidth,
      fieldHeight
    );

    expect(array2DHashTable.toArray()).toMatchObject(initialState);
  });

  it("getElement return correct value", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    const fieldWidth = initialState[0].length;
    const fieldHeight = initialState.length;

    const array2DHashTable = new Array2DHashTable(
      initialState,
      fieldWidth,
      fieldHeight
    );

    expect(array2DHashTable.getElement(0, 0)).toBe(0);
    expect(array2DHashTable.getElement(0, 2)).toBe(1);
    expect(array2DHashTable.getElement(1, 4)).toBe(0);
    expect(array2DHashTable.getElement(4, 1)).toBe(1);
    expect(array2DHashTable.getElement(4, 3)).toBe(1);
    expect(array2DHashTable.getElement(4, 4)).toBe(0);
  });

  it("setElement set correct value", async () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    const fieldWidth = initialState[0].length;
    const fieldHeight = initialState.length;

    const array2DHashTable = new Array2DHashTable(
      initialState,
      fieldWidth,
      fieldHeight
    );

    array2DHashTable.setElement(2, 3, 1);

    expect(array2DHashTable.getElement(2, 3)).toBe(1);
    expect(array2DHashTable.getElement(3, 2)).toBe(0);
  });
});
