const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day01").reduce(
    (total, curr) => (total += +curr),
    0
  );
};

const starTwo = () => {
  const seen = new Set();
  const list = getStringArrayInput("day01").map((_) => +_);
  let frequency = 0;
  while (true) {
    for (const item of list) {
      if (seen.has(frequency)) return frequency;
      seen.add(frequency);
      frequency += item;
    }
  }
};

console.log(starOne());
console.log(starTwo());
