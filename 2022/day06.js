const { getRawInput } = require("./utils");

const exec = (howMany) => {
  const input = getRawInput("day06");
  for (let i = 0; i < input.length - howMany; i++) {
    const unique = new Set();
    for (let j = i; j < i + howMany; j++) unique.add(input[j]);
    if (unique.size === howMany) return i + howMany;
  }
};

const starOne = () => {
  return exec(4);
};

const starTwo = () => {
  return exec(14);
};

console.log(starOne());
console.log(starTwo());
