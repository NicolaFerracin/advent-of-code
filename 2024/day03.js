const { getRawInput } = require("./utils");

const star1 = () => {
  const input = getRawInput("day03");
  return [...input.matchAll(/mul\((\d+),(\d+)\)/g)].reduce(
    (acc, match) => acc + Number(match[1]) * Number(match[2]),
    0
  );
};

const star2 = () => {
  const input = getRawInput("day03");

  let mul = true;
  return [
    ...input.matchAll(/mul\((\d+),(\d+)\)|(do\(\))|(don\'t\(\))/g),
  ].reduce((acc, match) => {
    if (match[0] === "do()") mul = true;
    else if (match[0] === `don't()`) mul = false;
    else if (mul) acc += Number(match[1]) * Number(match[2]);
    return acc;
  }, 0);
};

console.log(star1());
console.log(star2());
