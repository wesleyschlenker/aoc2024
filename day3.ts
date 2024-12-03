let input = await Deno.readTextFile("input");

// find all the mul instructions in the input, matching numbers with 1-3 digits
const mulInstructions = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

// for each element in the array, multiply the two numbers together and push the result to a new
// array
const multiples: number[] = [];
mulInstructions?.forEach((instruction) => {
  const match = instruction.match(/\d{1,3}/g);
  if (match) {
    const [a, b] = match.map(Number);
    multiples.push(a * b);
  }
});

// sum all the elements in the array
const sum = multiples.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

// Part 1 answer
console.log(sum);

// There are two new instructions you'll need to handle:

// The do() instruction enables future mul instructions.
// The don't() instruction disables future mul instructions.
// Only the most recent do() or don't() instruction applies. At the beginning of the program, mul
// instructions are enabled.

// first lets add "do()" to the start of the input
input = "do()" + input;

// split the input into an array of mul instructions and do/don't instructions
const unfilteredMulInstructionsArray = input.split(/(do\(\)|don't\(\))/g).filter(Boolean);

// if element is equal to "do()", push element+1 to a new array
const filteredMulInstructionsArray: string[] = [];
unfilteredMulInstructionsArray.forEach((instruction, index, instructions) => {
  if (instruction === "do()") {
    filteredMulInstructionsArray.push(instructions[index + 1]);
  }
});

// combine all elements into a single string
const filteredMulInstructions = filteredMulInstructionsArray.join("");

// reapply the same logic as before
const newMulInstructions = filteredMulInstructions.match(/mul\(\d{1,3},\d{1,3}\)/g);
const newMultiples: number[] = [];
newMulInstructions?.forEach((instruction) => {
  const match = instruction.match(/\d{1,3}/g);
  if (match) {
    const [a, b] = match.map(Number);
    newMultiples.push(a * b);
  }
});
const newSum = newMultiples.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

// Part 2 answer
console.log(newSum);