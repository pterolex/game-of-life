export default function copyArrayOfCoordinates(arrayOfCoordinates: number[][]) {
  const newArray = [];
  //   return arrayOfCoordinates.map((array) => [...array]);

  for (let i = 0; i < arrayOfCoordinates.length; i++) {
    // @ts-ignore
    newArray.push([].concat(arrayOfCoordinates[i]));
  }

  return newArray;
}
