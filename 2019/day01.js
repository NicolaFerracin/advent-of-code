const { getNumberArrayInput } = require("./utils");

const input = getNumberArrayInput("day01");

const star1 = () => {
  return input.reduce((tot, curr) => tot + Math.floor(curr / 3) - 2, 0);
};

const star2 = () => {
  let tot = 0;
  while (input.length) {
    const fuel = Math.floor(input.shift() / 3) - 2;
    if (fuel <= 0) continue;
    tot += fuel;
    input.push(fuel);
  }
  return tot;
};

console.log(star1());
console.log(star2());
