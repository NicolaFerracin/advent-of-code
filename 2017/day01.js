const { getRawInput } = require("./utils");

const starOne = () => {
  const line = getRawInput("day01");
  let total = 0;
  for (let i = 0; i < line.length; i++) {
    const curr = +line[i];
    const next = +line[i === line.length - 1 ? 0 : i + 1];
    if (curr === next) total += curr;
  }
  return total;
};

const starTwo = () => {
  const line = getRawInput("day01");
  const half = line.length / 2;
  let total = 0;
  for (let i = 0; i < line.length; i++) {
    const curr = +line[i];
    const next = +line[(i + half) % line.length];
    if (curr === next) total += curr;
  }
  return total;
};

console.log(starOne());
console.log(starTwo());
