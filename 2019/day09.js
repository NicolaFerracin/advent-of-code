const { getRawInput, Day9Computer } = require("./utils");

const getInput = () => getRawInput("day09").split(",").map(BigInt);

const star1 = () => {
  return new Day9Computer(getInput(), [1]).run().map(Number).join(",");
};

const star2 = () => {
  return new Day9Computer(getInput(), [2]).run().map(Number).join(",");
};

console.log(star1());
console.log(star2());
