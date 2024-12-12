type Direction = "^" | ">" | "v" | "<";

// Parse the input into a grid
let input = await Deno.readTextFile("input");

let grid = input.split("\n").map((row) => row.split(""));
const rows = grid.length;
const cols = grid[0].length;

// Direction vectors and turn mapping
const directions: Record<Direction, [number, number]> = {
  "^": [-1, 0],
  ">": [0, 1],
  "v": [1, 0],
  "<": [0, -1],
};

const turnRight: Record<Direction, Direction> = {
  "^": ">",
  ">": "v",
  "v": "<",
  "<": "^",
};

// Find the guard's starting position and direction
const guardSymbols = "^>v<";
let guardRow = 0, guardCol = 0, direction: Direction = "^";
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (guardSymbols.includes(grid[r][c])) {
      guardRow = r;
      guardCol = c;
      direction = grid[r][c] as Direction;
      grid[r][c] = "."; // Replace the guard's initial position with empty space
    }
  }
}

// Track visited positions
const visited = new Set<string>();
visited.add(`${guardRow},${guardCol}`);

// Helper function to check if a position is within bounds
function isInBounds(row: number, col: number) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

// Simulate the guard's patrol
while (true) {
  const [dr, dc] = directions[direction];
  const nextRow = guardRow + dr;
  const nextCol = guardCol + dc;

  // Check if the next position is out of bounds
  if (!isInBounds(nextRow, nextCol)) {
    break; // Guard leaves the map
  }

  // Check if there's an obstacle
  if (grid[nextRow][nextCol] === "#") {
    direction = turnRight[direction]; // Turn right
  } else {
    // Move forward
    guardRow = nextRow;
    guardCol = nextCol;
    visited.add(`${guardRow},${guardCol}`);
  }
}

// part 1 answer
console.log(visited.size);

type Position = [number, number];

// Reset
input = await Deno.readTextFile("input");
grid = input.split("\n").map((row) => row.split(""));

// Find the guard's starting position and direction
guardRow = 0, guardCol = 0, direction = "^";
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if ("^>v<".includes(grid[r][c])) {
      guardRow = r;
      guardCol = c;
      direction = grid[r][c] as Direction;
      grid[r][c] = "."; // Replace the guard's initial position with empty space
    }
  }
}

// Function to simulate the guard's patrol and detect loops
const simulatePatrolAndFindLoops = (
  grid: string[][],
  obstruction: Position | null,
): boolean => {
  let [row, col] = [guardRow, guardCol];
  let dir = direction;
  const visitedStates = new Set<string>();

  while (true) {
    // Encode the current state
    const state = `${row},${col},${dir}`;
    if (visitedStates.has(state)) {
      return true; // Loop detected
    }
    visitedStates.add(state);

    const [dr, dc] = directions[dir];
    const nextRow = row + dr;
    const nextCol = col + dc;

    if (!isInBounds(nextRow, nextCol)) {
      return false; // Guard leaves the map
    }

    // Apply the obstruction
    if (
      obstruction && nextRow === obstruction[0] && nextCol === obstruction[1]
    ) {
      dir = turnRight[dir]; // Obstruction causes a turn
    } else if (grid[nextRow][nextCol] === "#") {
      dir = turnRight[dir]; // Obstacle causes a turn
    } else {
      // Move forward
      row = nextRow;
      col = nextCol;
    }
  }
};

// Identify all possible obstruction points
const possibleObstructions: Position[] = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === "." && !(r === guardRow && c === guardCol)) {
      possibleObstructions.push([r, c]);
    }
  }
}

// Count valid obstructions that create a loop
let loopObstructions = 0;
for (const obstruction of possibleObstructions) {
  if (simulatePatrolAndFindLoops(grid, obstruction)) {
    loopObstructions++;
  }
}

// part 2 answer
console.log(loopObstructions);
