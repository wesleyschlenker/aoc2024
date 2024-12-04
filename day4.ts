const input = await Deno.readTextFile("input");

const matrix = input.split("\n").map((row) => row.split(""));

const directions = [
  [-1, 0], // Up
  [1, 0],  // Down
  [0, -1], // Left
  [0, 1],  // Right
  [-1, -1], // Up-Left
  [-1, 1],  // Up-Right
  [1, -1], // Down-Left
  [1, 1],  // Down-Right
];

let part1Count = 0;

const rowCount = matrix.length;
const columnCount = matrix[0].length;

for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    if (matrix[rowIndex][columnIndex] !== "X") continue;

    for (const [rowOffset, columnOffset] of directions) {
      if (
        matrix[rowIndex + rowOffset]?.[columnIndex + columnOffset] === "M" &&
        matrix[rowIndex + 2 * rowOffset]?.[columnIndex + 2 * columnOffset] === "A" &&
        matrix[rowIndex + 3 * rowOffset]?.[columnIndex + 3 * columnOffset] === "S"
      ) {
        part1Count++;
      }
    }
  }
}

// part 1 answer
console.log(part1Count);

let part2Count = 0;

for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex++) {
  for (let columnIndex = 1; columnIndex < columnCount - 1; columnIndex++) {
    if (matrix[rowIndex][columnIndex] !== "A") continue;

    const topLeftCell = matrix[rowIndex - 1][columnIndex - 1];
    const bottomRightCell = matrix[rowIndex + 1][columnIndex + 1];
    const topRightCell = matrix[rowIndex - 1][columnIndex + 1];
    const bottomLeftCell = matrix[rowIndex + 1][columnIndex - 1];

    const isMasCross =
      ((topLeftCell === "M" && bottomRightCell === "S") ||
        (topLeftCell === "S" && bottomRightCell === "M")) &&
      ((topRightCell === "M" && bottomLeftCell === "S") ||
        (topRightCell === "S" && bottomLeftCell === "M"));

    if (isMasCross) {
      part2Count++;
    }
  }
}


// part 2 answer
console.log(part2Count);