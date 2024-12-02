// import file "input" as a string
const input = await Deno.readTextFile("input");

// split the input into left and right arrays
const leftArray: number[] = [];
const rightArray: number[] = [];
input.split("\n").forEach((line) => {
  const [leftNumber, rightNumber] = line.split("   ");
  leftArray.push(parseInt(leftNumber));
  rightArray.push(parseInt(rightNumber));
});

// sort the arrays from smallest to largest
leftArray.sort((a, b) => a - b);
rightArray.sort((a, b) => a - b);

// find the absolute value of the difference between the numbers at each index, and sum them
let sum = 0;
leftArray.forEach((num, index) => {
  sum += Math.abs(num - rightArray[index]);
});

// part 1 answer
console.log(sum);

// calculate similarity score by adding each number in the left list after multiplying it
// by the number of times that number appears in the right list.
let score = 0;
for (let i = 0; i < leftArray.length; i++) {
  score += (leftArray[i] * rightArray.filter((num) => num === leftArray[i]).length);
}

// part 2 answer
console.log(score);