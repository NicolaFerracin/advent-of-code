const { getRawInput, IntcodeComputer } = require("./utils");

const getInput = () => getRawInput("day09").split(",").map(BigInt);

const star1 = () => {
  return new IntcodeComputer(getInput(), [1]).run().map(Number).join(",");
};

const star2 = () => {
  return new IntcodeComputer(getInput(), [2]).run().map(Number).join(",");
};

console.log(star1());
console.log(star2());
