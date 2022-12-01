const { getStringArrayInput } = require("./utils");

const exec = (howMany) => {
  return getStringArrayInput("day01")
    .reduce(
      (elves, curr) => {
        if (!curr) elves.unshift(0);
        else elves[0] += +curr;
        return elves;
      },
      [0]
    )
    .sort((a, b) => b - a)
    .slice(0, howMany)
    .reduce((sum, elf) => (sum += elf), 0);
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(3);
};

console.log(starOne());
console.log(starTwo());
