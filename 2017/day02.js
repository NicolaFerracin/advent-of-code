const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day02")
    .map((x) =>
      x
        .replace(/\s+/g, " ")
        .split(" ")
        .map((_) => +_)
    )
    .reduce((acc, line) => {
      const max = Math.max(...line);
      const min = Math.min(...line);
      const diff = max - min;

      return (acc += diff);
    }, 0);
};

const starTwo = () => {
  return getStringArrayInput("day02")
    .map((x) =>
      x
        .replace(/\s+/g, " ")
        .split(" ")
        .map((_) => +_)
        .sort((a, b) => b - a)
    )
    .reduce((acc, line) => {
      for (let x = 0; x < line.length - 1; x++) {
        for (let y = x + 1; y < line.length; y++) {
          if (line[x] % line[y] === 0) return (acc += line[x] / line[y]);
        }
      }
      return acc;
    }, 0);
};

console.log(starOne());
console.log(starTwo());
