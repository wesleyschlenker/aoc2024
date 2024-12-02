// input consists of many reports, one report per line. Each report is a list of
// numbers called levels that are separated by spaces.
const input = await Deno.readTextFile("input");

// The goal is to count how many reports are safe. A report is safe if both of the following are
// true:
// - The levels are either all increasing or all decreasing.
// - Any two adjacent levels differ by at least one and at most three.

// To start, we'll parse the input into an array of reports. Each report is an array of levels. We
// coerce each level to a number.
const reports = input.split("\n").map((line) => line.split(" ").map(Number));

// Next, we'll define a function that checks if a report is safe.
function isSafe(report: number[]): boolean {
  // Check if the report is sorted in ascending or descending order
  let isIncreasing = true;
  let isDecreasing = true;

  report.slice(1).forEach((level, i) => {
  if (level < report[i]) {
    isIncreasing = false;
  }
  if (level > report[i]) {
    isDecreasing = false;
  }
});

  // If neither increasing nor decreasing, the report is not safe
  if (!isIncreasing && !isDecreasing) {
    return false;
  }

  // Next we'll check if all adjacent levels differ by at least one and at most three.
  const diffWithinRange = report.every((level, index, levels) => {
    if (index === 0) return true; // First level has no previous level to compare
    const difference = Math.abs(level - levels[index - 1]);
    return difference >= 1 && difference <= 3;
  });

  // if diffWithinRange is false, the report is not safe.
  if (!diffWithinRange) return false;

  // If the report passes both checks, it is safe.
  return true;
}

// Finally, we'll count how many reports are safe.
const safeReports = reports.filter(isSafe).length;

// Part 1 answer
console.log(safeReports);

// Now, the same rules apply as before, except if removing a single level from an unsafe report
// would make it safe, the report instead counts as safe.

// To solve this, we'll define a function that checks each level of a report to see if removing it
// would make the report safe.

function isSafeWithRemoval(report: number[]): boolean {
  return report.some((_level, i, levels) => {
    const reportWithRemoval = [...levels.slice(0, i), ...levels.slice(i + 1)];
    return isSafe(reportWithRemoval);
  });
}

// We'll count how many reports are safe with the new rules.
const safeReportsWithRemoval = reports.filter(isSafeWithRemoval).length;

// Part 2 answer
console.log(safeReportsWithRemoval);
