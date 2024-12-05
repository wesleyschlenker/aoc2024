const input = await Deno.readTextFile("input");
// split input at double newlines into two groups
const [rawRules, rawUpdates] = input.split("\n\n");
// further split rules and updates at newlines
const pageRules = rawRules.split("\n").map((rule) => {
  const [left, right] = rule.split("|").map(Number);
  return { left, right };
});
const pageUpdates = rawUpdates.split("\n").map((update) => {
  return update.split(",").map(Number);
});

// For each update, check each rule, and if the update contains both numbers in a rule, find the
// indices of both numbers in that rule. If the leftNumber has a lower index than the rightNumber,
// then the update is good, and we can continue to check the next rule against the update. If all
// rules are exhausted and the update is good, add the middle number to the sum
const badUpdates = [];
let part1Sum = 0;
for (const update of pageUpdates) {
  let goodUpdate = true;
  for (const rule of pageRules) {
    if (update.includes(rule.left) && update.includes(rule.right)) {
      const leftIndex = update.indexOf(rule.left);
      const rightIndex = update.indexOf(rule.right);
      if (leftIndex < rightIndex) {
        continue;
      } else {
        badUpdates.push(update); // for part 2
        goodUpdate = false;
        break;
      }
    }
  }
  if (goodUpdate) {
    const middleIndex = Math.floor(update.length / 2);
    part1Sum += update[middleIndex];
  }
}

// part 1 answer
console.log(part1Sum);

// for part 2 we need to fix the broken rules, and then recalculate the sum

// For each update, check each rule, and if the update contains both numbers in a rule, find the
// indices of both numbers in that rule. If the leftNumber has a lower index than the rightNumber,
// swap them in the update, and then continue to check the next rule against the update. Once
// checking each rule is finished, start again from the first rule. Continue like this until we
// perform no swaps. If no swaps are performed for an update, then the update is good, and we can
// add the middle number to the sum.

let part2Sum = 0;
let swapped = true;

for (const update of badUpdates) {
  swapped = true;
  while (swapped) {
    swapped = false;
    for (const rule of pageRules) {
      if (update.includes(rule.left) && update.includes(rule.right)) {
        const leftIndex = update.indexOf(rule.left);
        const rightIndex = update.indexOf(rule.right);
        if (leftIndex > rightIndex) {
          [update[leftIndex], update[rightIndex]] = [
            update[rightIndex],
            update[leftIndex],
          ];
          swapped = true;
        }
      }
    }
  }
  const middleIndex = Math.floor(update.length / 2);
  part2Sum += update[middleIndex];
}

console.log(part2Sum);
