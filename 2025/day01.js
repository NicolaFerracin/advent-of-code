const { readInput, splitInputByLine, wrapValue } = require("./utils");

const input = splitInputByLine(readInput("day01"));

const MAX_DIAL = 100;

const star1 = () => {
  let dial = 50;
  let pass = 0;
  for (const move of input) {
    const [, dir, steps] = /(L|R)(\d+)/g.exec(move);
    const mul = dir === "L" ? -1 : 1;
    dial = wrapValue(dial + steps * mul, MAX_DIAL);
    if (dial === 0) pass++;
  }

  return pass;
};

const star2 = () => {
  let dial = 50;
  let pass = 0;
  for (const move of input) {
    const [, dir, steps] = /(L|R)(\d+)/g.exec(move);
    const mul = dir === "L" ? -1 : 1;
    for (let i = 0; i < +steps; i++) {
      dial = wrapValue(dial + 1 * mul, MAX_DIAL);
      if (dial === 0) pass++;
    }
  }

  return pass;
};

console.log(star1());
console.log(star2());
